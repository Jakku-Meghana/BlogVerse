import React, { useState } from 'react';
import axios from 'axios';

const CategoryRequestForm = ({ onClose, onRequestSuccess }) => {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setMessage('Category name cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('/api/category-requests', {
        name: categoryName,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage('Category request submitted successfully!');
        setCategoryName('');
        if (onRequestSuccess) onRequestSuccess();
      } else {
        setMessage('Something went wrong. Try again.');
      }
    } catch (error) {
      setMessage('Error submitting request. Please try later.');
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-md mt-4 border">
      <h3 className="text-lg font-semibold mb-2">Request a New Category</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border rounded w-full p-2 mb-2"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Submit Request
          </button>
          <button
            type="button"
            className="text-gray-500 underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        {message && (
          <p className="text-sm text-green-600 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CategoryRequestForm;
