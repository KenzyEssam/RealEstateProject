import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPercent,
  faUser,
  faPhone,
  faCheckCircle,
  faTimes,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Circles } from "react-loader-spinner"; // Import spinner component
import "./DelegateCoding.css";
import { Link } from 'react-router-dom'

function DelegateCoding() {
  const [formData, setFormData] = useState({
    delegateCode: "",
    delegateName: "",
    delegateAddress: "",
    delegatePhoneNumber: "",
    commisionPercent: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const {
      delegateCode,
      delegateName,
      delegateAddress,
      delegatePhoneNumber,
      commisionPercent,
    } = formData;
    if (
      !delegateCode ||
      !delegateName ||
      !delegateAddress ||
      !delegatePhoneNumber ||
      !commisionPercent
    ) {
      setModalMessage("برجاء إدخال جميع البيانات");
      setModalVisible(true);
      return;
    }

    setIsLoading(true); // Start loading spinner
    try {
      const response = await axios.post(
        "https://localhost:7033/api/Delegates/Create",
        {
          code: formData.delegateCode,
          name: formData.delegateName,
          address: formData.delegateAddress,
          phoneNumber: formData.delegatePhoneNumber,
          commissionPercent: formData.commisionPercent,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setModalMessage("تم حفظ المندوب بنجاح");
        setModalVisible(true);
      } else {
        setModalMessage("لم يتم حفظ المندوب");
        setModalVisible(true);
      }
      console.log("Response:", response.data);
    } catch (error) {
      setModalMessage("لم يتم حفظ المندوب");
      setModalVisible(true);
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="delegate-coding">
      {/*       <h2>تكويد المندوبين</h2>
       */}{" "}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            كود المندوب
            <FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <input
            type="text"
            name="delegateCode"
            value={formData.delegateCode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            اسم المندوب
            <FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <input
            type="text"
            name="delegateName"
            value={formData.delegateName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            عنوان{" "}
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-color" />
          </label>
          <input
            type="text"
            name="delegateAddress"
            value={formData.delegateAddress}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            رقم الموبيل{" "}
            <FontAwesomeIcon icon={faPhone} className="icon-color" />
          </label>
          <input
            name="delegatePhoneNumber"
            value={formData.delegatePhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group-comission-percent">
          <label className="comission-percent-label">
            نسبة العموله
            <FontAwesomeIcon icon={faPercent} className="icon-color" />
          </label>
          <input
            type="text"
            name="commisionPercent"
            value={formData.commisionPercent}
            onChange={handleChange}
          />
        </div>
        <div className="submit-bttn">
          <button type="submit" disabled={isLoading}>
            حفظ
          </button>
        </div>
      </form>


      
      {isLoading && (
        <div className="spinner-overlay">
          <Circles
            height="80"
            width="80"
            color="#033f7f"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      )}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            -
            {modalMessage === "تم حفظ المندوب بنجاح" ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="modal-success-icon"
              />
            ) : (
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="modal-error-icon"
              />
            )}
            <p>{modalMessage}</p>
            <span className="close" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DelegateCoding;
