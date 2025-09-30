"use client";

import { useState, useEffect } from "react";

type User = {
  id: number | string;
  name: string;
  email: string;
};

function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://money-pooling.onrender.com/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        List of Users
      </h1>
      {error && (
        <p className="mb-4 text-center text-red-600 font-medium">{error}</p>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && !error && (
          <p className="text-center text-gray-500 py-6">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default ListUsers;
