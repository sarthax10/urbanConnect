import { useState } from 'react';

export default function ServiceForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    durationMinutes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      durationMinutes: parseInt(formData.durationMinutes)
    });
    setFormData({ name: '', category: '', description: '', durationMinutes: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow mt-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-800">Add New Service</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Service Name"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Service Description"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="durationMinutes"
        type="number"
        value={formData.durationMinutes}
        onChange={handleChange}
        placeholder="Duration (minutes)"
        className="border p-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Service</button>
    </form>
  );
}
