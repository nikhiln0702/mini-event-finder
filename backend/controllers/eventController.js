let events = [
  // Some mock data to start with
  {
    id: 1,
    title: "React Meetup",
    description: "Discussing new features in React 19.",
    location: "Online",
    date: "2025-11-15T18:00:00Z",
    maxParticipants: 50,
    currentParticipants: 12
  },
  {
    id: 2,
    title: "Node.js Performance Workshop",
    description: "Tips on optimizing Node.js applications.",
    location: "New York",
    date: "2025-11-20T10:00:00Z",
    maxParticipants: 30,
    currentParticipants: 25
  }
];
let nextEventId = 3; // To auto-increment IDs

// 1. GET /api/events - List all events (with optional location filter)
export const getEvents = (req, res) => {
  const { location } = req.query; // Check for a location query param

  if (location) {
    const filteredEvents = events.filter(
      event => event.location.toLowerCase().includes(location.toLowerCase())
    );
    res.json(filteredEvents);
  } else {
    // No location query, return all events
    res.json(events);
  }
};

// 2. GET /api/events/:id - Get single event details
export const getEventById = (req, res)=> {
    const eventId = parseInt(req.params.id);
    const event = events.find(event => event.id === eventId);

    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
};

// 3. POST /api/events - Create a new event
export const createEvent = (req, res) => {
    const { title, description, location, date, maxParticipants } = req.body;
    const newEvent = {
    id: nextEventId++,
    title,
    description: description || "", // Optional field
    location,
    date,
    maxParticipants: parseInt(maxParticipants, 10),
    currentParticipants: 0 // New events start with 0 participants
  };

  events.push(newEvent);
  
  // Return the created event with a 201 status code
  res.status(201).json(newEvent);
};


