import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventDetail from './components/EventDetail';

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 border-b border-gray-200 pb-4 mb-8">
        <Link to="/" className="text-lg font-medium text-blue-600 hover:underline">
          Home (All Events)
        </Link>
        <Link to="/create" className="text-lg font-medium text-blue-600 hover:underline">
          Create Event
        </Link>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create" element={<EventForm />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;