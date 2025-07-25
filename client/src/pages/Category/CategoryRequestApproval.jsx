import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getEnv } from "@/helpers/getEnv";

const CategoryRequestApproval = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${getEnv('VITE_API_BASE_URL')}/category-requests/pending`, {
                withCredentials: true,
            });

            // Use response.data.requests or response.data.data depending on your controller
            const fetchedRequests = response.data.requests || response.data.data || [];
            setRequests(fetchedRequests);
        } catch (error) {
            console.error("Error fetching category requests", error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.patch(`${getEnv('VITE_API_BASE_URL')}/category-requests/approve/${id}`, {}, {
                withCredentials: true,
            });
            toast.success("Category request approved!");
            fetchRequests(); // Refresh the list
        } catch (error) {
            toast.error("Failed to approve request");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Pending Category Requests</h2>

            {requests.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div key={req._id} className="border p-4 rounded flex justify-between items-center">
                            <div>
                                <p><strong>Category:</strong> {req.name}</p>
                                <p>
                                    <strong>Requested by:</strong>{" "}
                                    {req.requestedBy?.username || req.requestedBy?.email || "Unknown"}
                                </p>
                            </div>
                            <button
                                onClick={() => handleApprove(req._id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryRequestApproval;
