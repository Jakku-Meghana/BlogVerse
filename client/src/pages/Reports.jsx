import React, { useEffect, useState } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/report/reports`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch reports');
      const data = await res.json();
      console.log('Fetched reports:', data); 
      setReports(data); // 🟢 Ensure we set an array
    // if (Array.isArray(data)) {
    //   setReports(data); // ✅ now safe
    // }
    // else {
    //   console.error('Expected reports array, got:', data);
    //   setReports([]);
    // }
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reportid, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/report/reports/${reportid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Status updated');
        fetchReports(); // reload
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Failed to update report status:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);
  // console.log(reports.user);
  console.log("user:", reports.user?.username);
console.log("blog:", reports.blog?.title);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reported Blogs</h2>

      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border p-2">Blog Title</th>
              <th className="border p-2">Reported By</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td className="border p-2">{report.blogId?.title}</td>
                <td className="border p-2">{report.user?.name}</td>
                <td className="border p-2">{report.reason}</td>
                <td className="border p-2">{report.status}</td>
                <td className="border p-2">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleStatusChange(report._id, 'reviewed')}
                  >
                    Review
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleStatusChange(report._id, 'dismissed')}
                  >
                    Dismiss
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;