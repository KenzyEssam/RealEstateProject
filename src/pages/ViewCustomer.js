import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./ViewCustomer.css";
import { Link } from "react-router-dom";

function ViewCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("code");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://localhost:7033/api/Customers/GetAll"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch customers on component mount or when search query is empty
    if (searchQuery === "") {
      fetchCustomers();
    } else {
      handleSearch();
    }
  }, [searchQuery, searchField]); // Dependencies array includes searchField to re-fetch if search criteria changes

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      // If search query is empty, reset to fetch all customers
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7033/api/Customers/Search",
        {
          query: searchQuery,
          searchBy: searchField,
        }
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Error searching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <div className="view-customers">
      <div className="search-bar">
        <select value={searchField} onChange={handleSearchFieldChange}>
          <option value="code">كود العميل</option>
          <option value="name">اسم العميل</option>
          <option value="address">العنوان</option>
          <option value="phone">رقم الموبيل</option>
          <option value="relatedUnit">الوحدة العقارية</option>
          <option value="relatedDelegates">المندوبين المرتبطين</option>
          <option value="email">البريد الإلكتروني</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      {loading ? (
        <div className="spinner">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>كود العميل</th>
                <th>اسم العميل</th>
                <th>رقم الموبيل 1</th>
                <th>رقم الموبيل 2</th>
                <th>رقم الموبيل 3</th>
                <th>البريد الإلكتروني</th>
                <th>العنوان</th>
                <th>الوحدة العقارية</th>
                <th>المندوبين المرتبطين</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.code}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phoneNumber1}</td>
                  <td>{customer.phoneNumber2}</td>
                  <td>{customer.phoneNumber3}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address1}</td>
                  <td>{customer.relatedUnit}</td>
                  <td>{customer.relatedDelegates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="coding-page-bttn">
        <Link to="/customer-coding">
          <button type="button">تكويد عميل</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewCustomer;
