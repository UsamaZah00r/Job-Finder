import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployerJobs() {
  const { user, loading } = useUser();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/employer', {
          withCredentials: true,
        });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching employer jobs:", error);
        setJobs([]);
      }
    };

    if (!loading && user?.role === 'employer') {
      fetchEmployerJobs();
    }
  }, [user, loading]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/jobs/${id}`, {
        withCredentials: true,
      });
      toast.success("Job deleted successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Failed to delete job");
      console.error("Failed to delete job:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== 'employer') {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-600 text-xl font-semibold">Access denied. Employers only.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Posted Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="p-6 bg-white shadow-md rounded-lg border">
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600">{job.companyName}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-sm text-gray-500 mb-2">{job.jobType}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/jobs/edit/${job._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/jobs/applicants/${job._id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerJobs;
