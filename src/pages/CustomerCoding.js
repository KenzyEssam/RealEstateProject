import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faFile,
  faCheckCircle,
  faTimes,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Circles } from "react-loader-spinner"; // Import spinner component
import "./CustomerCoding.css";

function CustomerCoding() {
  const [formData, setFormData] = useState({
    Code: "",
    Name: "",
    PhoneNumber1: "",
    PhoneNumber2: "",
    PhoneNumber3: "",
    Email: "",
    RelativesPhoneNumber: "",
    Address1: "",
    RelatedDelegates: "",
    RelatedUnit: "",
    Attachments: [],
  });

  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Attachments: e.target.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const {
      Code,
      Name,
      PhoneNumber1,
      PhoneNumber2,
      PhoneNumber3,
      Email,
      RelativesPhoneNumber,
      Address1,
      RelatedDelegates,
      RelatedUnit,
    } = formData;
    if (
      !Code ||
      !Name ||
      !PhoneNumber1 ||
      !Email ||
      !RelativesPhoneNumber ||
      !Address1 ||
      !RelatedDelegates ||
      !RelatedUnit
    ) {
      setModalMessage("برجاء إدخال جميع البيانات");
      setModalVisible(true);
      return;
    }

    setIsLoading(true); // Start loading spinner
    const data = new FormData();
    for (const key in formData) {
      if (key === "Attachments") {
        for (let i = 0; i < formData.Attachments.length; i++) {
          data.append("Attachments", formData.Attachments[i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "https://localhost:7033/api/Customers/Create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setModalMessage("تم حفظ العميل بنجاح");
    } catch (error) {
      setModalMessage("لم يتم حفظ العميل");
      console.error("Error creating customer:", error.response.data);
    } finally {
      setIsLoading(false); // Stop loading spinner
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="customer-coding fade-in">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            كود العميل <FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <input
            type="text"
            name="Code"
            value={formData.Code}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            اسم العميل <FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            موبيل 1 <FontAwesomeIcon icon={faPhone} className="icon-color" />
          </label>
          <input
            type="text"
            name="PhoneNumber1"
            value={formData.PhoneNumber1}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            موبيل 2 <FontAwesomeIcon icon={faPhone} className="icon-color" />
          </label>
          <input
            type="text"
            name="PhoneNumber2"
            value={formData.PhoneNumber2}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            موبيل 3 <FontAwesomeIcon icon={faPhone} className="icon-color" />
          </label>
          <input
            type="text"
            name="PhoneNumber3"
            value={formData.PhoneNumber3}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            إيميل <FontAwesomeIcon icon={faEnvelope} className="icon-color" />
          </label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            أشخاص مقربين (أرقام موبيل){" "}
            <FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <textarea
            name="RelativesPhoneNumber"
            value={formData.RelativesPhoneNumber}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>
            عنوان 1{" "}
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-color" />
          </label>
          <textarea
            name="Address1"
            value={formData.Address1}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>
            المندوبين المرتبطين{" "}
            <FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <textarea
            name="RelatedDelegates"
            value={formData.RelatedDelegates}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>
            الوحدة العقارية الخاصة بالعميل{" "}
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-color" />
          </label>
          <input
            type="text"
            name="RelatedUnit"
            value={formData.RelatedUnit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            رفع المرفقات{" "}
            <FontAwesomeIcon icon={faFile} className="icon-color" />
          </label>
          <input
            type="file"
            name="Attachments"
            onChange={handleFileChange}
            multiple
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
            {modalMessage === "تم حفظ العميل بنجاح" ? (
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

export default CustomerCoding;
