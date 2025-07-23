import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-8 px-4 md:px-12">
      <div className="w-full max-w-4xl border border-white p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-6 border-b border-white pb-4">
          Contact Us
        </h1>

        <p className="mb-10 text-white text-opacity-80">
          We’d love to hear from you! Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-2 text-white">First Name</label>
            <input
              type="text"
              id="firstName"
              className="bg-black border border-white text-white px-4 py-2 focus:outline-none focus:border-white"
              placeholder="John"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-2 text-white">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="bg-black border border-white text-white px-4 py-2 focus:outline-none focus:border-white"
              placeholder="Doe"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="email" className="mb-2 text-white">Email Address</label>
            <input
              type="email"
              id="email"
              className="bg-black border border-white text-white px-4 py-2 focus:outline-none focus:border-white"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="subject" className="mb-2 text-white">Subject</label>
            <input
              type="text"
              id="subject"
              className="bg-black border border-white text-white px-4 py-2 focus:outline-none focus:border-white"
              placeholder="Subject of your message"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="message" className="mb-2 text-white">Message</label>
            <textarea
              id="message"
              rows="6"
              className="bg-black border border-white text-white px-4 py-2 resize-none focus:outline-none focus:border-white"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full border border-white text-white py-3 px-6 hover:bg-white hover:text-black transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        

        <div className="mt-12 py-4 border-t border-white text-center text-sm text-white text-opacity-60">
          &copy; {new Date().getFullYear()} UrbanConnect. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Contact;
