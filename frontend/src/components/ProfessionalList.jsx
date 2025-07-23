import React from 'react';

export default function ProfessionalList({ professionals }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Professionals</h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Bio</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Services Offered</th>
            </tr>
          </thead>
          <tbody>
            {professionals.map((pro) => (
              <tr
                key={pro.professionalId}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900">{pro.name}</td>
                <td className="px-6 py-4">{pro.email}</td>
                <td className="px-6 py-4 text-sm italic">{pro.profileBio}</td>
                <td className="px-6 py-4">{pro.rating}</td>
                <td className="px-6 py-4">
                  <ul className="list-disc list-inside space-y-1">
                    {pro.services.map((s) => (
                      <li key={s.serviceId}>
                        {s.name} <span className="text-xs text-gray-500">({s.category}, {s.durationMinutes} mins)</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
