import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./ViewBookingPermission.css";
import { Link } from 'react-router-dom';

function ViewBookingPermission() {
  const [bookingPermissions, setBookingPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("ClientCode");
  const [searchDate, setSearchDate] = useState(""); 

  useEffect(() => {
    const fetchBookingPermissions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://localhost:7033/api/BookingPermission/GetAll"
        );
        setBookingPermissions(response.data);
      } catch (error) {
        console.error("Error fetching booking permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === "" && searchDate === "") {
      // Fetch all booking permissions if search query and search date are empty
      fetchBookingPermissions();
    } else {
      // Perform search if there is a search query or search date
      handleSearch();
    }
  }, [searchQuery, searchField, searchDate]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "" && searchField !== "Date" && searchDate === "") {
      return; // Do not perform search if both search query and search date are empty
    }

    setLoading(true);
    try {
      const query = searchField === "Date" ? `${searchDate} 00:00:00.0000000` : searchQuery;
      const response = await axios.post(
        "https://localhost:7033/api/BookingPermission/Search",
        {
          query: query,
          searchBy: searchField,
        }
      );
      setBookingPermissions(response.data);
    } catch (error) {
      console.error("Error searching booking permissions:", error);
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
    <div className="view-booking-permission">
      <div className="search-bar">
        <select value={searchField} onChange={handleSearchFieldChange}>
          <option value="ClientCode">كود العميل</option>
          <option value="ClientName">اسم العميل</option>
          <option value="Delegate">المندوب</option>
          <option value="Unit">الوحدة</option>
          <option value="PaymentPlan">خطة الدفع</option>
          <option value="BookingType">نوع إذن الحجز</option>
          <option value="Date">تاريخ</option>
          <option value="ValidityPeriod">مدة سريان إذن الحجز</option>
        </select>
        {searchField === "Date" ? (
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
          <table className="booking-permission-table">
            <thead>
              <tr>
                <th>كود العميل</th>
                <th>اسم العميل</th>
                <th>المندوب</th>
                <th>الوحدة</th>
                <th>خطة الدفع</th>
                <th>نوع إذن الحجز</th>
                <th>مدة سريان إذن الحجز</th>
                <th>تاريخ</th>
              </tr>
            </thead>
            <tbody>
              {bookingPermissions.map((permission) => (
                <tr key={permission.id}>
                  <td>{permission.clientCode}</td>
                  <td>{permission.clientName}</td>
                  <td>{permission.delegate}</td>
                  <td>{permission.unit}</td>
                  <td>{permission.paymentPlan}</td>
                  <td>{permission.bookingType}</td>
                  <td>{permission.validityPeriod}</td>
                  <td>{formatDate(permission.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="coding-page-bttn">
        <Link to="/booking-permission">
          <button type="button">تكويد إذن الحجز</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewBookingPermission;
