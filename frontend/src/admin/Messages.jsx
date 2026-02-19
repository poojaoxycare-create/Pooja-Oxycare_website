import React from 'react'

const Messages = () => {
  const items = [
    { id: 1, name: 'John Doe', subject: 'Product Inquiry', date: '2024-12-18', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', subject: 'Delivery Question', date: '2024-12-17', email: 'jane@example.com' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Messages</h2>
        <p className="text-sm text-gray-500">View and respond to customer inquiries</p>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="mb-4">
          <input placeholder="Search messages..." className="w-full border rounded px-3 py-2" />
        </div>

        <div className="space-y-3">
          {items.map((m) => (
            <div key={m.id} className="p-4 border rounded">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-500">Subject: {m.subject}</div>
                  <div className="text-xs text-gray-400">{m.date} • {m.email}</div>
                </div>

                <div className="text-gray-400">▾</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Messages
