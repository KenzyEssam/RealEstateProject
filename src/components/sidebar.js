import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faCalendarCheck, faUserTie, faHome, faUsers, faLayerGroup, faBuilding } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faHome} /> الصفحه الرئيسيه
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-customer"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faUsers} /> عرض العملاء
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-category"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faLayerGroup} /> عرض التصنيفات
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-units"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faBuilding} /> عرض الوحدات
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-delegates"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faUserTie} /> عرض المندوبين
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-booking-permission"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> عرض الحجوزات
          </NavLink>
        </li>
        <li >
          <NavLink
            to="/view-contarct"
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            <FontAwesomeIcon icon={faFileContract} /> عرض العقود
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
