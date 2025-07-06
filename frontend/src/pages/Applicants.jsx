import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Applicants() {
  const { id } = useParams(); // Job ID
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/jobs/${id}/applicants`,
          {},
          { withCredentials: true }
        );
        setApplicants(res.data.applicants || []);
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Applicants</h2>

      {loading ? (
        <p className="text-blue-600 font-medium">Loading...</p>
      ) : applicants.length === 0 ? (
        <p className="text-gray-500">No applicants yet.</p>
      ) : (
        <ul className="space-y-4">
          {applicants.map((applicant) => (
            <li key={applicant._id} className="border p-4 rounded">
              <p className="font-medium">Name: {applicant.seekerId?.name || 'N/A'}</p>
              <p>Email: {applicant.seekerId?.email || 'N/A'}</p>
              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-1 inline-block"
              >
                View Resume
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Applicants;
