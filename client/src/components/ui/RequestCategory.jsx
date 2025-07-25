import React, { useState } from 'react';
import axios from 'axios';

const RequestCategory = () => {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/category-requests', { category }, { withCredentials: true });
      setMessage(res.data.message || 'Request submitted successfully');
      setCategory('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to submit request');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Request New Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
    </div>
  );
};

export default RequestCategory;
