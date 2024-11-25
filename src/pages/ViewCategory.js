import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./ViewCategory.css";
import { Link } from "react-router-dom";

function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("code");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://localhost:7033/api/Category/GetAll"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === "") {
      // Fetch all categories if search query is empty
      fetchCategories();
    } else {
      // Perform search if there is a search query
      handleSearch();
    }
  }, [searchQuery, searchField]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return; // If the search query is empty, do not perform the search
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7033/api/Category/Search",
        {
          query: searchQuery,
          searchBy: searchField,
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error searching categories:", error);
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
    <div className="view-categories">
      <div className="search-bar">
        <select value={searchField} onChange={handleSearchFieldChange}>
          <option value="code">كود الصنف</option>
          <option value="name">الاسم</option>
          <option value="investmenttype">نوع الاستثمار</option>
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
          <table className="categories-table">
            <thead>
              <tr>
                <th>كود الصنف</th>
                <th>اسم الصنف</th>
                <th>نوع الاستثمار</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.categoryCode}</td>
                  <td>{category.categoryName}</td>
                  <td>{category.investmentType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="coding-page-bttn">
        <Link to="/category-coding">
          <button type="button">تكويد صنف</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewCategory;
