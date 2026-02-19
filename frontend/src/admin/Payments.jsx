import React from 'react'

const Payments = () => {
  const rows = [
    { id: 'PAY-001', customer: 'John Doe', orderId: 'ORD-001', method: 'Credit Card', amount: '$450', status: 'Completed', date: '2024-12-18' },
    { id: 'PAY-002', customer: 'Jane Smith', orderId: 'ORD-002', method: 'Bank Transfer', amount: '$1250', status: 'Pending', date: '2024-12-17' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Payments</h2>
        <p className="text-sm text-gray-500">Track payment transactions and revenue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold">$2,820</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-2xl font-bold">3</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold">1</div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="mb-4">
          <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">All</button>
          <button className="px-3 py-1 bg-gray-100 rounded mr-2">Completed</button>
          <button className="px-3 py-1 bg-gray-100 rounded mr-2">Pending</button>
          <button className="px-3 py-1 bg-gray-100 rounded">Failed</button>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3">Payment ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Method</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.customer}</td>
                <td className="p-3">{r.orderId}</td>
                <td className="p-3">{r.method}</td>
                <td className="p-3">{r.amount}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Payments
