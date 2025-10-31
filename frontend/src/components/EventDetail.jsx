import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from './api';
// No CSS import needed!

function EventDetail() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // ... (useEffect logic remains the same) ...
  useEffect(() => {
    setLoading(true);
    setError(null);
    getEventById(id)
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error("Error fetching event:", error);
        setError('Event not found or an error occurred.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-lg text-center p-10">Loading event details...</p>;
  if (error) return <p className="text-lg text-center p-10 text-red-600">{error}</p>;
  if (!event) return <p className="text-lg text-center p-10">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to all events
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      
      <div className="space-y-3">
        <p className="text-lg text-gray-700">
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Location:</strong> {event.location}
        </p>
        <div>
          <p className="text-lg text-gray-700"><strong>Description:</strong></p>
          <p className="text-gray-800 text-base leading-relaxed">
            {event.description || <i className="text-gray-500">No description provided.</i>}
          </p>
        </div>
        <p className="text-xl font-medium bg-gray-100 p-4 rounded-md my-4">
          <strong>Participants:</strong> {event.currentParticipants} / {event.maxParticipants}
        </p>
      </div>
      
      <button className="mt-6 text-lg px-6 py-2">
        Join Event (Mock)
      </button>
    </div>
  );
}

export default EventDetail;