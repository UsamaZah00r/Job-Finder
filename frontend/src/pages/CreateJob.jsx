import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateJob() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('onSite');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        title,
        description,
        location,
        jobType,
        companyName,
        category,
      };

      await axios.post('http://localhost:8000/api/v1/jobs', jobData, {
        withCredentials: true,
      });

      toast("Job Created!")
      navigate('/');
    } catch (error) {
      console.error('Job creation failed:', error.response?.data || error.message);
      toast("Something is wrong!")
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'employer') {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600 font-semibold">
        Only employers can create jobs.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Create a New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="onSite">On Site</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            {loading ? 'Creating...' : 'Create Job'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
