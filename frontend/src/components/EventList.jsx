import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from './api';
// No CSS import needed!

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // ... (useEffect and fetchEvents functions remain the same) ...
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = (location) => {
    setLoading(true);
    setError(null);
    getAllEvents(location)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setError('Failed to fetch events. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(searchTerm);
  };
  
  const handleClear = () => {
    setSearchTerm('');
    fetchEvents(); // Fetch all events
  };


  if (loading) return <p className="text-lg text-center p-10">Loading events...</p>;
  if (error) return <p className="text-lg text-center p-10 text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-8">
        <input 
          type="text"
          placeholder="Filter by location (e.g., 'Online')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow" // Uses base style from index.css
        />
        <button type="submit">Search</button>
        <button 
          type="button" 
          onClick={handleClear} 
          className="bg-gray-500 hover:bg-gray-600"
        >
          Clear
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No events found.</p>
        ) : (
          events.map(event => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-2 text-blue-700">{event.title}</h2>
              <p className="text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {new Date(event.date).toLocaleString()}
              </p>
              <p className="text-gray-700 my-2 line-clamp-3">
                {event.description}
              </p>
              <Link to={`/events/${event.id}`}>
                <button className="mt-4">View Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventList;