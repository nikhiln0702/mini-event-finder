import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from './api';

function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    maxParticipants: 50
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // ... (handleChange and handleSubmit logic remains the same) ...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const eventData = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      maxParticipants: parseInt(formData.maxParticipants, 10)
    };

    createEvent(eventData)
      .then(response => {
        navigate(`/events/${response.data.id}`);
      })
      .catch(error => {
        console.error("Error creating event:", error);
        setError(error.response?.data?.message || 'Failed to create event. Please check fields.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date and Time
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
            Max Participants
          </label>
          <input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        
        <button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}

export default EventForm;