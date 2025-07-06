import React from 'react';

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to JobFinder</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Your one-stop platform to explore opportunities, connect with top talent, and shape the future of your career or business.
          Whether you're a job seeker aiming to land your dream job or a company hunting for top-notch professionals — we’ve got you covered.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-50 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">1. Create Your Account</h3>
            <p>Register as a job seeker or employer with just a few clicks and start building your profile.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">2. Explore Opportunities</h3>
            <p>Browse thousands of job listings or discover skilled professionals across various industries.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">3. Connect & Grow</h3>
            <p>Apply for jobs or connect with candidates, track progress, and grow with our intuitive tools.</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Job Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          {['IT & Software', 'Marketing', 'Finance', 'Customer Support'].map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <p className="font-semibold text-lg">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why JobFinder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Smart Matching System</h3>
            <p>We use intelligent algorithms to connect the right people with the right jobs efficiently and accurately.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Trusted by Employers</h3>
            <p>Hundreds of verified companies trust us to find talent, making your job search more reliable and secure.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">User-Friendly Experience</h3>
            <p>From intuitive search filters to smooth application tracking, everything is built for ease and speed.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Support That Cares</h3>
            <p>Our dedicated team is here 24/7 to help you succeed in your hiring or job-hunting journey.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
