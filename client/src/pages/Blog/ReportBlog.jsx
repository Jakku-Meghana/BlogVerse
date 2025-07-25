import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';

 // <-- Missing!

const ReportBlog = () => {
  const navigate = useNavigate();
  const { blogid } = useParams();
  console.log("Received blogId in ReportBlog:", blogid);

  const user = useSelector((state) => state.user);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      return showToast('error', 'Please provide a reason.');
    }

    setLoading(true);
    try {
      const res = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/report`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.user._id,
          blogId: blogid,
          reason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return showToast('error', data.message || 'Failed to report blog.');
      }

      showToast('success', 'Blog reported successfully.');
      navigate(-1); // go back
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Report Blog</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please tell us why you're reporting this blog.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select a reason</option>
          <option value="Spam">Spam</option>
          <option value="Inappropriate content">Inappropriate content</option>
          <option value="Copyright violation">Copyright violation</option>
          <option value="Harassment or hate speech">Harassment or hate speech</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Reporting...' : 'Submit Report'}
          </button>

          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportBlog;