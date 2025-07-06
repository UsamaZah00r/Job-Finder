import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function ShowJobs() {
  const { user, loading } = useUser();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/jobs', {
          withCredentials: true,
        });
        const jobsArray = res.data?.jobs || [];
        setJobs(jobsArray);
        setFilteredJobs(jobsArray);
      } catch (err) {
        console.error('Failed to load jobs:', err);
        setJobs([]);
        setFilteredJobs([]);
      }
    };

    if (user?.role === 'seeker') {
      fetchJobs();
    }
  }, [user]);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      [job.title, job.companyName, job.location]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== 'seeker') {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-600 text-xl font-semibold">
          Access denied. Seekers only.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Available Jobs</h1>

      <input
        type="text"
        placeholder="Search jobs by title, company, or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-8 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="p-5 bg-white shadow-sm rounded-lg border hover:shadow-md transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-1">{job.companyName}</p>
              <p className="text-sm text-gray-500 mb-2">{job.location}</p>
              <p className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-4">
                {job.jobType}
              </p>
              <button
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="mt-auto inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowJobs;
