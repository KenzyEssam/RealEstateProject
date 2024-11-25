import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faPercent, faBarcode, faTag, faRuler,
  faMoneyBillWave, faBuilding, faHome, faClipboardList,
  faUser, faEye, faCheckCircle, faTimes, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Circles } from 'react-loader-spinner'; // Import spinner component
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
import './UnitCoding.css';

function UnitCoding() {
  const [searchParams] = useSearchParams();
  const initialFormType = searchParams.get('formType') || 'investment'; // Get formType from URL or default to 'investment'
  const [formType, setFormType] = useState(initialFormType);
  const [formData, setFormData] = useState({
    unitCode: '',
    unitDescription: '',
    lowestCategory: '',
    unitArea: '',
    pricePerMeter: '',
    totalUnitValue: '',
    maintenancePercentage: '',
    maintenanceValue: '',
    unitAddress: '', // Added for rental unit
    rentalValue: '', // Added for rental unit
    unitContents: '', // Added for rental unit
    renterName: '', // Added for rental unit
    renterCode: '', // Added for rental unit
    unitStatus: '' // Added for rental unit
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  useEffect(() => {
    setFormType(initialFormType);
  }, [initialFormType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      unitCode, unitDescription, lowestCategory,
      unitArea, pricePerMeter, totalUnitValue,
      maintenancePercentage, maintenanceValue,
      unitAddress, rentalValue, unitContents,
      renterName, renterCode, unitStatus
    } = formData;

    // Validation
    if (formType === 'investment') {
      if (!unitCode || !unitDescription || !lowestCategory ||
          !unitArea || !pricePerMeter || !totalUnitValue ||
          !maintenancePercentage || !maintenanceValue) {
        setModalMessage("برجاء إدخال جميع البيانات");
        setModalVisible(true);
        return;
      }
    } if (formType === 'rental') {
      if (!unitCode || !unitDescription || !unitAddress ||
          !lowestCategory || !rentalValue || !unitContents ||
          !renterName || !renterCode || !unitStatus) {
        setModalMessage("برجاء إدخال جميع البيانات");
        setModalVisible(true);
        return;
      }
    }

    setIsLoading(true); // Start loading spinner
    try {
      const apiUrl = formType === 'investment' 
        ? 'https://localhost:7033/api/Units/Create'
        : 'https://localhost:7033/api/Units/CreateRental';
      
      const response = await axios.post(
        apiUrl,
        formType === 'investment' 
          ? {
              UnitCode: unitCode,
              UnitDescription: unitDescription,
              LowestCategory: lowestCategory,
              UnitArea: unitArea,
              PricePerMeter: pricePerMeter,
              TotalUnitValue: totalUnitValue,
              MaintenancePercentage: maintenancePercentage,
              MaintenanceValue: maintenanceValue
            }
          : {
              UnitCode: unitCode,
              UnitDescription: unitDescription,
              UnitAddress: unitAddress,
              LowestCategory: lowestCategory,
              RentalValue: rentalValue,
              UnitContents: unitContents,
              RenterName: renterName,
              RenterCode: renterCode,
              UnitStatus: unitStatus
            }
      );
      if (response.status >= 200 && response.status < 300) {
        setModalMessage("تم حفظ الوحدة بنجاح");
        setModalVisible(true);
      } else {
        setModalMessage("لم يتم حفظ الوحدة");
        setModalVisible(true);
      }
      console.log("Response:", response.data);
    } catch (error) {
      setModalMessage("لم يتم حفظ الوحدة");
      setModalVisible(true);
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderForm = () => {
    if (formType === 'investment') {
      return (
        <div className="unit-coding">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                كود الوحدة <FontAwesomeIcon icon={faBarcode} className="icon-color" />
              </label>
              <input type="text" name="unitCode" value={formData.unitCode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                وصف الوحدة <FontAwesomeIcon icon={faBuilding} className="icon-color" />
              </label>
              <input type="text" name="unitDescription" value={formData.unitDescription} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                نوع التصنيف الأدنى <FontAwesomeIcon icon={faClipboardList} className="icon-color" />
              </label>
              <input type="text" name="lowestCategory" value={formData.lowestCategory} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                مساحة الوحدة <FontAwesomeIcon icon={faRuler} className="icon-color" />
              </label>
              <input type="text" name="unitArea" value={formData.unitArea} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                السعر المرجعي للمتر <FontAwesomeIcon icon={faMoneyBillWave} className="icon-color" />
              </label>
              <input type="text" name="pricePerMeter" value={formData.pricePerMeter} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                إجمالي قيمة الوحدة <FontAwesomeIcon icon={faMoneyBillWave} className="icon-color" />
              </label>
              <input type="text" name="totalUnitValue" value={formData.totalUnitValue} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                نسبة الصيانة <FontAwesomeIcon icon={faPercent} className="icon-color" />
              </label>
              <input type="text" name="maintenancePercentage" value={formData.maintenancePercentage} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                قيمة الصيانة <FontAwesomeIcon icon={faMoneyBillWave} className="icon-color" />
              </label>
              <input type="text" name="maintenanceValue" value={formData.maintenanceValue} onChange={handleChange} />
            </div>
            <div className="submit-bttn">
              <button type="submit" disabled={isLoading}>حفظ</button>
            </div>
          </form>
        </div>
      );
    } if (formType === 'rental') {
      return (
        <div className="unit-coding">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                كود الوحدة<FontAwesomeIcon icon={faBarcode} className="icon-color" />
              </label>
              <input type="text" name="unitCode" value={formData.unitCode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                وصف الوحدة<FontAwesomeIcon icon={faBuilding} className="icon-color" />
              </label>
              <input type="text" name="unitDescription" value={formData.unitDescription} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                عنوان الوحدة<FontAwesomeIcon icon={faMapMarkerAlt} className="icon-color" />
              </label>
              <input type="text" name="unitAddress" value={formData.unitAddress} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                نوع التصنيف الأدنى<FontAwesomeIcon icon={faClipboardList} className="icon-color" />
              </label>
              <input type="text" name="lowestCategory" value={formData.lowestCategory} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                القيمة الإيجارية<FontAwesomeIcon icon={faMoneyBillWave} className="icon-color" />
              </label>
              <input type="text" name="rentalValue" value={formData.rentalValue} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                محتويات الوحدة<FontAwesomeIcon icon={faClipboardList} className="icon-color" />
              </label>
              <input type="text" name="unitContents" value={formData.unitContents} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                اسم المؤجر<FontAwesomeIcon icon={faUser} className="icon-color" />
              </label>
              <input type="text" name="renterName" value={formData.renterName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>
                كود المؤجر<FontAwesomeIcon icon={faBarcode} className="icon-color" />
              </label>
              <input type="text" name="renterCode" value={formData.renterCode} onChange={handleChange} />
            </div>
            <div className="form-group-status">
              <label className="status-label">
                حالة الوحدة<FontAwesomeIcon icon={faEye} className="icon-color" />
              </label>
              <select name="unitStatus" value={formData.unitStatus} onChange={handleChange}>
                <option value="">اختر حالة الوحده </option>
                <option value="مؤجره">مؤجره</option>
                <option value="متاحه">متاحه</option>
              </select>
            </div>
            <div className="submit-bttn">
              <button type="submit" disabled={isLoading}>حفظ</button>
            </div>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="unit-coding fade-in">
      <div className="button-group">
        <button onClick={() => setFormType('investment')}>استثمار عقاري</button>
        <button onClick={() => setFormType('rental')}>وحدات إيجارية</button>
      </div>
      {renderForm()}

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
            {modalMessage === "تم حفظ الوحدة بنجاح" ? (
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

export default UnitCoding;
