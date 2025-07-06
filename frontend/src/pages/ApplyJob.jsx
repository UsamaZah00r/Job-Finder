import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ApplyJob() {
  const { id } = useParams(); // job id
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resumeUrl", resumeFile);

    try {
      setLoading(true);
      await axios.post(`http://localhost:8000/api/v1/jobs/${id}/apply`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Applied successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Apply for Job</h1>
      <form onSubmit={handleApply} className="bg-white p-6 rounded shadow space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;
