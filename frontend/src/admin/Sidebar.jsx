import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-200 hover:bg-blue-700/50'
    }`

  return (
    <aside className="w-72 bg-[#071328] text-white min-h-screen p-6 hidden md:block">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-400">Admin</h2>
        <div className="text-xs text-gray-400">Control Panel</div>
      </div>

      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <span className="text-lg">📦</span>
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <span className="text-lg">🧾</span>
          <span>Orders</span>
        </NavLink>

        <NavLink to="/admin/rented-products" className={linkClass}>
          <span className="text-lg">🎁</span>
          <span>Rented Products</span>
        </NavLink>

        {/* Users link removed per request */}

        <NavLink to="/admin/payments" className={linkClass}>
          <span className="text-lg">💳</span>
          <span>Payments</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
