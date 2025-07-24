import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-pink-600 transition ${
      isActive ? 'bg-pink-700 text-white' : 'text-gray-200'
    }`;

  return (
    <aside className="w-64 bg-pink-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <NavLink to="/admin" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/manage-products" className={navLinkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/manage-users" className={navLinkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/manage-orders" className={navLinkClass}>
          Orders
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
