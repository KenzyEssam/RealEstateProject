import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./ViewUnits.css";
import { useNavigate } from 'react-router-dom';

function ViewUnits() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("unitcode");
  const [viewType, setViewType] = useState("investment"); // 'investment' or 'rental'

  useEffect(() => {
    fetchUnits();
  }, [viewType]); // Re-fetch units when viewType changes

  const fetchUnits = async () => {
    setLoading(true);
    try {
      const endpoint =
        viewType === "investment"
          ? "https://localhost:7033/api/Units/GetAll"
          : "https://localhost:7033/api/Units/GetAllRentals";

      const response = await axios.get(endpoint);
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search query is empty, fetch all units again
      fetchUnits();
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        viewType === "investment"
          ? "https://localhost:7033/api/Units/Search"
          : "https://localhost:7033/api/Units/SearchRentals";

      const response = await axios.post(endpoint, {
        query: searchQuery,
        searchBy: searchField,
      });
      setUnits(response.data);
    } catch (error) {
      console.error("Error searching units:", error);
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

  // Trigger search when search query or field changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery, searchField]);


  const navigate = useNavigate();

  const handleCodingButtonClick = () => {
    const formType = viewType === "investment" ? "investment" : "rental";
    navigate(`/unit-coding?formType=${formType}`);
  };
  return (
    <div className="view-units">
      <div className="button-group">
        <button
          onClick={() => setViewType("investment")}
          className={viewType === "investment" ? "active" : ""}
        >
          وحدات استثمارية
        </button>
        <button
          onClick={() => setViewType("rental")}
          className={viewType === "rental" ? "active" : ""}
        >
          وحدات إيجارية
        </button>
      </div>

      <div className="search-container">
        <div className="search-bar">
          <select value={searchField} onChange={handleSearchFieldChange}>
            <option value="unitcode">كود الوحدة</option>
            <option value="unitdescription">وصف الوحدة</option>
            <option value="lowestcategory">أدنى فئة</option>
            {viewType === "investment" ? (
              <>
                <option value="unitarea">مساحة الوحدة</option>
                <option value="pricepermeter">السعر لكل متر</option>
                <option value="totalunitvalue">إجمالي قيمة الوحدة</option>
                <option value="maintenancepercentage">نسبة الصيانة</option>
                <option value="maintenancevalue">قيمة الصيانة</option>
              </>
            ) : (
              <>
                <option value="unitaddress">عنوان الوحدة</option>
                <option value="rentalvalue">القيمة الإيجارية</option>
                <option value="unitcontents">محتويات الوحدة</option>
                <option value="rentername">اسم المؤجر</option>
                <option value="rentercode">كود المؤجر</option>
                <option value="unitstatus">حالة الوحدة</option>
              </>
            )}
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        
          <button className="CodingButton"  onClick={handleCodingButtonClick}>
            {viewType === "investment"
              ? "تكويد وحدات اشتثماريه"
              : "تكويد وحدات ايجاريه "}
          </button>
        
      </div>

      {loading ? (
        <div className="spinner">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="table-container">
          <table className="units-table">
            <thead>
              <tr>
                <th>كود الوحدة</th>
                <th>وصف الوحدة</th>
                <th>أدنى فئة</th>
                {viewType === "investment" ? (
                  <>
                    <th>مساحة الوحدة</th>
                    <th>السعر لكل متر</th>
                    <th>إجمالي قيمة الوحدة</th>
                    <th>نسبة الصيانة</th>
                    <th>قيمة الصيانة</th>
                  </>
                ) : (
                  <>
                    <th>عنوان الوحدة</th>
                    <th>القيمة الإيجارية</th>
                    <th>محتويات الوحدة</th>
                    <th>اسم المؤجر</th>
                    <th>كود المؤجر</th>
                    <th>حالة الوحدة</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.unitCode}>
                  <td>{unit.unitCode}</td>
                  <td>{unit.unitDescription}</td>
                  <td>{unit.lowestCategory}</td>
                  {viewType === "investment" ? (
                    <>
                      <td>{unit.unitArea}</td>
                      <td>{unit.pricePerMeter}</td>
                      <td>{unit.totalUnitValue}</td>
                      <td>{unit.maintenancePercentage}</td>
                      <td>{unit.maintenanceValue}</td>
                    </>
                  ) : (
                    <>
                      <td>{unit.unitAddress}</td>
                      <td>{unit.rentalValue}</td>
                      <td>{unit.unitContents}</td>
                      <td>{unit.renterName}</td>
                      <td>{unit.renterCode}</td>
                      <td>{unit.unitStatus}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewUnits;
