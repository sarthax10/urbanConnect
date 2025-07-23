// src/components/CategoryServiceProfessionalPicker.jsx
import { useEffect, useState } from 'react';

import axios from 'axios';

export default function CategoryServiceProfessionalPicker() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [professionals, setProfessionals] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/services/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`${API_BASE_URL}/services/category/${selectedCategory}`)
        .then(res => setServices(res.data))
        .catch(err => console.error("Failed to fetch services", err));
    } else {
      setServices([]);
    }
    setSelectedServiceId('');
    setProfessionals([]);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedServiceId) {
      axios.get(`${API_BASE_URL}/professionals/service/${selectedServiceId}`)
        .then(res => setProfessionals(res.data))
        .catch(err => console.error("Failed to fetch professionals", err));
    } else {
      setProfessionals([]);
    }
  }, [selectedServiceId]);

  return (
    <div className="space-y-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Category</label>
          <select
            className="border p-2 rounded w-full"
            onChange={e => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">-- Choose Category --</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Service</label>
          <select
            className="border p-2 rounded w-full"
            onChange={e => setSelectedServiceId(e.target.value)}
            value={selectedServiceId}
            disabled={!services.length}
          >
            <option value="">-- Choose Service --</option>
            {services.map(service => (
              <option key={service.serviceId} value={service.serviceId}>
                {service.name} ({service.durationMinutes} mins)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Available Professionals</h3>
        {professionals.length === 0 ? (
          <p className="text-gray-500">No professionals found.</p>
        ) : (
          <ul className="divide-y border rounded">
            {professionals.map(pro => (
              <li key={pro.professionalId} className="p-4">
                <p className="font-bold">{pro.name} <span className="text-sm text-gray-600">({pro.email})</span></p>
                <p className="text-sm italic text-gray-600">{pro.profileBio}</p>
                <p><strong>Rating:</strong> {pro.rating ?? "N/A"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
