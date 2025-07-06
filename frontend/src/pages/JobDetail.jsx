import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/jobs/${id}`, {
          withCredentials: true,
        });
        setJob(res.data.jobDetail);
      } catch (err) {
        console.error('Failed to fetch job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-600 text-xl font-semibold">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:underline"
      >
        ← Back to Jobs
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 border">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
        <p className="text-gray-600 text-lg">{job.companyName}</p>
        <p className="text-sm text-gray-500 mb-4">{job.location}</p>

        <div className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded-full text-sm mb-4">
          {job.jobType}
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {job.description}
        </p>

        <p className="mt-4 text-sm text-gray-500">Category: {job.category}</p>
        <p className="text-sm text-gray-500">
          Posted on: {new Date(job.createdAt).toLocaleDateString()}
        </p>

        {/* Apply Button */}
        <button
          onClick={() => navigate(`/jobs/apply/${job._id}`)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
