import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./ViewContract.css"; // Ensure you create this CSS file for styling
import { Link } from 'react-router-dom';

function ViewContract() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("unit");
  const [searchDate, setSearchDate] = useState(""); // Initialize with an empty string

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7033/api/Contract/GetAll"
        );
        setContracts(response.data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch all contracts if no search criteria
    if (searchQuery === "" && searchDate === "") {
      fetchContracts();
    } else {
      handleSearch();
    }
  }, [searchQuery, searchField, searchDate]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "" && searchField !== "date" && searchDate === "") {
      return; // Do not perform search if both search query and search date are empty
    }

    setLoading(true);
    try {
      const query = searchField === "date" ? `${searchDate} 00:00:00.0000000` : searchQuery;
      const response = await axios.post(
        "https://localhost:7033/api/Contract/Search",
        {
          query: query,
          searchBy: searchField,
        }
      );
      setContracts(response.data);
    } catch (error) {
      console.error("Error searching contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
    // Clear search inputs when search field changes
    setSearchQuery("");
    setSearchDate("");
  };

  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("EG"); // Adjust locale as needed
  };

  return (
    <div className="view-contracts">
      <div className="search-bar">
        <select value={searchField} onChange={handleSearchFieldChange}>
          <option value="unit">الوحدة</option>
          <option value="client">العميل</option>
          <option value="date">تاريخ العقد</option>
          <option value="rentalValue">القيمة الإيجارية</option>
          <option value="deposit">قيمة المقدم</option>
          <option value="insuranceValue">مبلغ التأمين</option>
        </select>
        {searchField === "date" ? (
          <input
            type="date"
            value={searchDate}
            onChange={handleDateChange}
          />
        ) : (
          <input
            type="text"
            placeholder="بحث..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        )}
        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearch} />
      </div>
      {loading ? (
        <div className="spinner">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="table-container">
          <table className="contracts-table">
            <thead>
              <tr>
                <th>الوحدة</th>
                <th>العميل</th>
                <th>تاريخ العقد</th>
                <th>القيمة الإيجارية</th>
                <th>قيمة المقدم</th>
                <th>مبلغ التأمين</th>
                <th>تاريخ بداية الإيجار</th>
                <th>تاريخ نهاية الإيجار</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id}>
                  <td>{contract.unit}</td>
                  <td>{contract.client}</td>
                  <td>{formatDate(contract.date)}</td>
                  <td>{contract.rentalValue}</td>
                  <td>{contract.deposit}</td>
                  <td>{contract.insuranceValue}</td>
                  <td>{formatDate(contract.rentalStartDate)}</td>
                  <td>{formatDate(contract.rentalEndDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="coding-page-bttn">
        <Link to="/contract-coding">
          <button type="button">تكويد عقد</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewContract;
