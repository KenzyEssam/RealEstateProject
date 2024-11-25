import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faTag, faChartLine, faCheckCircle, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import './CategoryCoding.css';

function CategoryCoding() {
  const [formData, setFormData] = useState({
    categoryCode: '',
    categoryName: '',
    investmentType: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { categoryCode, categoryName, investmentType } = formData;
    if (!categoryCode || !categoryName || !investmentType) {
      setModalMessage('برجاء إدخال جميع البيانات');
      setModalVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://localhost:7033/api/Category/Create',
        {
          categoryCode,
          categoryName,
          investmentType,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setModalMessage('تم حفظ التصنيف بنجاح');
      } else {
        setModalMessage('لم يتم حفظ التصنيف');
      }
      setModalVisible(true);
      console.log('Response:', response.data);
    } catch (error) {
      setModalMessage('لم يتم حفظ التصنيف');
      setModalVisible(true);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="category-coding fade-in">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            كود الصنف<FontAwesomeIcon icon={faBarcode} className="icon-color" />
          </label>
          <input
            type="text"
            name="categoryCode"
            value={formData.categoryCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            اسم الصنف<FontAwesomeIcon icon={faTag} className="icon-color" />
          </label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group-investment">
          <label className="investment-label">
            نوع الاستثمار{" "}
            <FontAwesomeIcon icon={faChartLine} className="icon-color" />
          </label>
          <select
            name="investmentType"
            value={formData.investmentType}
            onChange={handleChange}
          >
            <option value="">اختر نوع الاستثمار</option>
            <option value="استثمار عقاري">عقاري</option>
            <option value="إيجاري">إيجاري</option>
          </select>
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
            {modalMessage === "تم حفظ التصنيف بنجاح" ? (
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

export default CategoryCoding;
