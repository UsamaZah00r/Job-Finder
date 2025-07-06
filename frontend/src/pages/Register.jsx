import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      console.log("Register successful", response.data);
      navigate("/login");
    } catch (error) {
      console.log("There is an error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-blue-500 mb-6 text-center">
        Welcome to Job Finder!
      </h1>

      {loading ? (
        <div className="text-lg text-blue-600 font-semibold">Creating your account...</div>
      ) : (
        <>
          {previewImage && (
            <div className="w-24 md:w-32 mb-6">
              <img className="rounded-full w-full" src={previewImage} alt="user" />
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
          >
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Username</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium mb-1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="role" className="block font-medium mb-1">Role</label>
              <select
                onChange={(e) => setRole(e.target.value)}
                name="role"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="seeker">Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            <div>
              <label htmlFor="profileImage" className="block font-medium mb-1">Profile Image</label>
              <input
                onChange={(e) => {
                  setProfileImage(e.target.files[0]);
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }}
                type="file"
                name="profileImage"
                accept="image/*"
                className="w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Register;
