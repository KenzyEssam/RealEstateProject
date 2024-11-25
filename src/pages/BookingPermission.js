import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCalendar, faUser, faUserTie, faMoneyBill, faHome, faClock, faCheckCircle, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Circles } from "react-loader-spinner"; // Import spinner component
import './BookingPermission.css';

function BookingPermission() {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    ClientCode: "",
    ClientName: "",
    Date: today,
    Delegate: "",
    PaymentPlan: "monthly",
    Unit: "",
    UnitValue: "",
    BookingType: "active",
    ValidityPeriod: ""
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
      ClientCode,
      ClientName,
      Date,
      Delegate,
      PaymentPlan,
      Unit,
      UnitValue,
      BookingType,
      ValidityPeriod
    } = formData;

    if (
      !ClientCode ||
      !ClientName ||
      !Date ||
      !Delegate ||
      !PaymentPlan ||
      !Unit ||
      !UnitValue ||
      !BookingType ||
      !ValidityPeriod
    ) {
      setModalMessage("برجاء إدخال جميع البيانات");
      setModalVisible(true);
      return;
    }

    setIsLoading(true); // Start loading spinner
    try {
      const response = await axios.post(
        "https://localhost:7033/api/BookingPermission/Create",
        formData
      );
      if (response.status >= 200 && response.status < 300) {
        setModalMessage("تم حفظ إذن الحجز بنجاح");
        setModalVisible(true);
      } else {
        setModalMessage("لم يتم حفظ إذن الحجز");
        setModalVisible(true);
      }
      console.log("Response:", response.data);
    } catch (error) {
      setModalMessage("لم يتم حفظ إذن الحجز");
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
    <div className="booking-permission">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            كود العميل<FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <input type="text" name="ClientCode" value={formData.ClientCode} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            اسم العميل <FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <input type="text" name="ClientName" value={formData.ClientName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            تاريخ <FontAwesomeIcon icon={faCalendar} className="icon-color" />
          </label>
          <input type="date" name="Date" value={formData.Date} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            المندوب <FontAwesomeIcon icon={faUserTie} className="icon-color" />
          </label>
          <input type="text" name="Delegate" value={formData.Delegate} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>
            خطة الدفع <FontAwesomeIcon icon={faMoneyBill} className="icon-color" />
          </label>
          <select name="PaymentPlan" value={formData.PaymentPlan} onChange={handleChange}>
            <option value="monthly">شهري</option>
            <option value="quarterly">ربع سنوي</option>
            <option value="semiannual">نصف سنوي</option>
            <option value="annual">سنوي</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>
            الوحدة <FontAwesomeIcon icon={faHome} className="icon-color" />
          </label>
          <input type="text" name="Unit" value={formData.Unit} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>
            قيمة الوحدة <FontAwesomeIcon icon={faMoneyBill} className="icon-color" />
          </label>
          <input type="text" name="UnitValue" value={formData.UnitValue} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>
            نوع إذن الحجز <FontAwesomeIcon icon={faTag} className="icon-color" />
          </label>
          <select name="BookingType" value={formData.BookingType} onChange={handleChange}>
            <option value="active">ساري</option>
            <option value="closed">مغلق</option>
          </select>
        </div>
        
        <div className="form-group-validityPeriod">
          <label className="validity-period-label">
            مدة سريان إذن الحجز <FontAwesomeIcon icon={faClock} className="icon-color" />
          </label>
          <input type="text" name="ValidityPeriod" value={formData.ValidityPeriod} onChange={handleChange} />
        </div>
        
        <div className="submit-bttn">
          <button type="submit" disabled={isLoading}>حفظ</button>
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
            {modalMessage === "تم حفظ إذن الحجز بنجاح" ? (
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

export default BookingPermission;
