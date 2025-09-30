"use client";

import { useState } from "react"; // Assuming this is the function to fetch users

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "https://money-pooling.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        setMessage("User created successfully!");
        setName("");
        setEmail("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to create user"}`);
      }
    } catch (error) {
      let errorMsg = "Unknown error";
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      setMessage(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create User
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Create User
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center text-sm font-medium ${
            message.startsWith("User created")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CreateUser;
