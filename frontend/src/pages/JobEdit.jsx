import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'onSite',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/jobs/${id}`, {
          withCredentials: true,
        });
        const { title, description, location, jobType } = res.data.jobDetail;
        setFormData({ title, description, location, jobType });
      } catch (error) {
        toast.error('Error loading job details');
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/v1/jobs/${id}`, formData, {
        withCredentials: true,
      });
      toast.success('Job updated successfully!');
      setTimeout(() => {
        navigate('/my-jobs');
      }, 1500);
    } catch (error) {
      toast.error('Failed to update job');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Edit Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="onSite">On Site</option>
          <option value="Remote">Remote</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Job
        </button>
      </form>
    </div>
  );
}

export default EditJob;
