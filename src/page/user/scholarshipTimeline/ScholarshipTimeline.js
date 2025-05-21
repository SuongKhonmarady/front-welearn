import { useState } from 'react';
import ScholarshipItem from "./ScholarshipItem";
import PropTypes from 'prop-types';

export default function ScholarshipTimeline({ scholarships }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCountry, setSelectedCountry] = useState('');

  // Extract unique countries from scholarships
  const uniqueCountries = [...new Set(scholarships.map(scholarship => scholarship.country))];

  const filteredScholarships = scholarships.filter(scholarship => 
    new Date(scholarship.deadline) >= new Date(selectedDate) &&
    (selectedCountry === '' || scholarship.country === selectedCountry)
  );

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Country:
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredScholarships.length ? (
          filteredScholarships.map(scholarship => (
            <ScholarshipItem data={scholarship} key={scholarship.id} />
          ))
        ) : (
          <p>No scholarships found for the selected criteria.</p>
        )}
      </ul>
    </div>
  );
}

ScholarshipTimeline.propTypes = {
  scholarships: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired, // Assuming deadline is a string; adjust if necessary
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
};