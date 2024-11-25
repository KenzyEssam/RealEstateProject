import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./ViewDelegate.css";
import { Link } from 'react-router-dom';

function ViewDelegates() {
  const [delegates, setDelegates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("code");

  useEffect(() => {
    const fetchDelegates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://localhost:7033/api/Delegates/GetAll"
        );
        setDelegates(response.data);
      } catch (error) {
        console.error("Error fetching delegates:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === "") {
      // Fetch all delegates if search query is empty
      fetchDelegates();
    } else {
      // Perform search if there is a search query
      handleSearch();
    }
  }, [searchQuery, searchField]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return; // Do not perform the search if the search query is empty
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7033/api/Delegates/Search",
        {
          query: searchQuery,
          searchBy: searchField,
        }
      );
      setDelegates(response.data);
    } catch (error) {
      console.error("Error searching delegates:", error);
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
    <div className="view-delegates">
      <div className="search-bar">
        <select value={searchField} onChange={handleSearchFieldChange}>
          <option value="code">كود المندوب</option>
          <option value="name">الاسم</option>
          <option value="address">العنوان</option>
          <option value="phoneNumber">رقم الموبيل</option>
{/*           <option value="commissionpercent">نسبة العموله</option>
 */}        </select>
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
          <table className="delegates-table">
            <thead>
              <tr>
                <th>كود المندوب</th>
                <th>اسم المندوب</th>
                <th>عنوان</th>
                <th>رقم الموبيل</th>
                <th>نسبة العموله</th>
              </tr>
            </thead>
            <tbody>
              {delegates.map((delegate) => (
                <tr key={delegate.id}>
                  <td>{delegate.code}</td>
                  <td>{delegate.name}</td>
                  <td>{delegate.address}</td>
                  <td>{delegate.phoneNumber}</td>
                  <td>{delegate.commissionPercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="coding-page-bttn">
        <Link to="/delegate-coding">
          <button type="button">تكويد مندوب</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewDelegates;
