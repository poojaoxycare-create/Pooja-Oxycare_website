import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between bg-white px-6 py-4 border-b">
          <div>
            <h1 className="text-2xl font-semibold">Admin Panel</h1>
            <p className="text-sm text-gray-500">Control and manage the application</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">Admin User</div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">U</div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
