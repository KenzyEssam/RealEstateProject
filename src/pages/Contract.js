import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faHome, faMoneyBill, faFileContract, faCheckCircle, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import './Contract.css';

function Contract() {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in the format YYYY-MM-DD

  const [formData, setFormData] = useState({
    contractDate: today,
    clientSelection: '',
    unitSelection: '',
    rentalValue: '',
    advancePayment: '',
    securityDeposit: '',
    rentalStartDate: today,
    rentalEndDate: today
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

    const {
      contractDate,
      clientSelection,
      unitSelection,
      rentalValue,
      advancePayment,
      securityDeposit,
      rentalStartDate,
      rentalEndDate
    } = formData;

    if (!contractDate || !clientSelection || !unitSelection || !rentalValue || !advancePayment || !securityDeposit || !rentalStartDate || !rentalEndDate) {
      setModalMessage('برجاء إدخال جميع البيانات');
      setModalVisible(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://localhost:7033/api/Contract/Create', {
        date: contractDate,
        client: clientSelection,
        unit: unitSelection,
        rentalValue,
        deposit: advancePayment,
        insuranceValue: securityDeposit,
        rentalStartDate,
        rentalEndDate
      });

      if (response.status >= 200 && response.status < 300) {
        setModalMessage('تم حفظ العقد بنجاح');
      } else {
        setModalMessage('لم يتم حفظ العقد');
      }
      setModalVisible(true);
    } catch (error) {
      setModalMessage('لم يتم حفظ العقد');
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
    <div className="rental-contract">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            تاريخ العقد<FontAwesomeIcon icon={faCalendar} className="icon-color" />
          </label>
          <input type="date" name="contractDate" value={formData.contractDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            العميل<FontAwesomeIcon icon={faUser} className="icon-color" />
          </label>
          <input type="text" name="clientSelection" value={formData.clientSelection} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            الوحدة<FontAwesomeIcon icon={faHome} className="icon-color" />
          </label>
          <input type="text" name="unitSelection" value={formData.unitSelection} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            القيمة الإيجارية<FontAwesomeIcon icon={faMoneyBill} className="icon-color" />
          </label>
          <input type="text" name="rentalValue" value={formData.rentalValue} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            قيمة المقدم<FontAwesomeIcon icon={faMoneyBill} className="icon-color" />
          </label>
          <input type="text" name="advancePayment" value={formData.advancePayment} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            مبلغ التأمين<FontAwesomeIcon icon={faMoneyBill} className="icon-color" />
          </label>
          <input type="text" name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            تاريخ العقد إلى<FontAwesomeIcon icon={faCalendar} className="icon-color" />
          </label>
          <input type="date" name="rentalEndDate" value={formData.rentalEndDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            تاريخ العقد من<FontAwesomeIcon icon={faCalendar} className="icon-color" />
          </label>
          <input type="date" name="rentalStartDate" value={formData.rentalStartDate} onChange={handleChange} />
        </div>

        <div className="form-group-print-bttn">
          <label className="print-bttn-label">
            طباعة العقد<FontAwesomeIcon icon={faFileContract} className="icon-color" />
          </label>
          <input name="print-bttn" type="button" value="اضغط هنا لطباعة العقد" onClick={() => window.print()} />
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
            {modalMessage === 'تم حفظ العقد بنجاح' ? (
              <FontAwesomeIcon icon={faCheckCircle} className="modal-success-icon" />
            ) : (
              <FontAwesomeIcon icon={faExclamationCircle} className="modal-error-icon" />
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

export default Contract;
