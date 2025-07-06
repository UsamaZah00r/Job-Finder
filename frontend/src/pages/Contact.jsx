import React, { useRef, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_6noe5if',     // replace with your service ID
        'template_sf3az0j',    // replace with your template ID
        form.current,
        '3jHozHv90zD9TKFQa'      // replace with your public key
      )
      .then(
        () => {
          setSent(true);
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
        }
      );
  };

  return (
    <div className="bg-white text-gray-800">
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Have questions, feedback, or need support? We're here to help you every step of the way.
        </p>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <ul className="space-y-4 text-gray-700 mb-8">
            <li>📧 <strong>Email:</strong> support@jobfinder.com</li>
            <li>📞 <strong>Phone:</strong> +92 317 8123297</li>
            <li>📍 <strong>Address:</strong> Sargodha, Punjab, Pakistan</li>
          </ul>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-white">
            <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"><FaFacebookF /></a>
            <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"><FaTwitter /></a>
            <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"><FaLinkedinIn /></a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="from_name"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="reply_to"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
            {sent && <p className="text-green-600 mt-2">Message sent successfully!</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
