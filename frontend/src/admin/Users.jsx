import React from 'react'

const Users = () => {
  const sample = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Users</h2>
        <p className="text-sm text-gray-500">Manage user accounts and permissions</p>
      </div>

      <div className="bg-white rounded shadow-sm p-4">
        <div className="mb-4">
          <input
            placeholder="Search users by name or email..."
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="space-y-3">
          {sample.map((u) => (
            <div key={u.id} className="p-4 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
              </div>
            </div>
          ))}

          {!sample.length && (
            <div className="p-6 text-center text-gray-500">No users found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
