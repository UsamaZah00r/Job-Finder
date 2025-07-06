import React from 'react';

export default function About() {
  return (
    <div className="bg-white text-gray-800">
      {/* About Header */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About JobFinder</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Empowering job seekers and employers with a smarter, faster, and more reliable platform to connect and grow.
        </p>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Mission</h2>
            <p>
              To bridge the gap between skilled individuals and the companies that need them by providing a seamless,
              efficient, and transparent hiring experience.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Vision</h2>
            <p>
              To become the most trusted and user-friendly employment platform in Pakistan, empowering millions to
              achieve their career and hiring goals.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story / Platform Highlights */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="max-w-3xl mx-auto text-lg">
          JobFinder started with a simple idea — making job search and hiring easier and more accessible. With a small
          team and big dreams, we’ve built a platform trusted by thousands of users, streamlining the recruitment
          process for both sides.
        </p>
      </section>

      {/* Achievements / Stats */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Trusted by Thousands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-600">10K+</p>
            <p>Job Seekers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-600">1.5K+</p>
            <p>Jobs Posted</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-600">100+</p>
            <p>Employers</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold text-blue-600">24/7</p>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why We Exist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
            <p>
              We give you the tools and access you need to find the right job — fast. Whether you're a fresher or an
              experienced professional, we’re here to help you succeed.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">For Employers</h3>
            <p>
              We simplify the recruitment process, giving you access to a vast pool of qualified candidates ready to
              contribute to your team’s growth and success.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
