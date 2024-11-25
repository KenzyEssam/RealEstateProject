import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerCoding from './pages/CustomerCoding';
import CategoryCoding from './pages/CategoryCoding';
import UnitCoding from './pages/UnitCoding';
import BookingPermission from './pages/BookingPermission';
import Contract from './pages/Contract';
import DelegateCoding from './pages/DelegateCoding';
import ViewDelegates from './pages/ViewDelegate';
import Sidebar  from './components/sidebar';
import ViewCustomer from './pages/ViewCustomer';
import ViewBookingPermission  from './pages/ViewBookingPermission';
import ViewContract from './pages/ViewContract';
import ViewCategory from './pages/ViewCategory';
import ViewUnits  from './pages/ViewUnits';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="content">
        <Routes>
          <Route path="/" element={<CustomerCoding />} />
          <Route path="/customer-coding" element={<CustomerCoding />} />
          <Route path="/category-coding" element={<CategoryCoding />} />
          <Route path="/unit-coding" element={<UnitCoding />} />
          <Route path="/delegate-coding" element={<DelegateCoding />} />
          <Route path="/booking-permission" element={<BookingPermission />} />
          <Route path="/view-booking-permission" element={<ViewBookingPermission />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/view-delegates" element={<ViewDelegates />} />
          <Route path="/view-customer" element={<ViewCustomer />} />
          <Route path="/view-contarct" element={<ViewContract />} />
          <Route path="/view-category" element={<ViewCategory />} />
          <Route path="/view-units" element={<ViewUnits />} />
          <Route path="/contract-coding" element={<Contract />} />

        </Routes>
        </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
