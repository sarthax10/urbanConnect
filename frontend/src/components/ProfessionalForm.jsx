import React, { useState } from 'react';

export default function ProfessionalForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profileBio: '',
    serviceIds: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceIds = formData.serviceIds
      .split(',')
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id));

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      profileBio: formData.profileBio,
      serviceIds
    };

    onSubmit(dataToSend);
    setFormData({ name: '', email: '', profileBio: '', serviceIds: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Add New Professional</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="profileBio"
        value={formData.profileBio}
        onChange={handleChange}
        placeholder="Profile Bio"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        name="serviceIds"
        value={formData.serviceIds}
        onChange={handleChange}
        placeholder="Service IDs (comma separated)"
        className="border p-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Create Professional
      </button>
    </form>
  );
}
