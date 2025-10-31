import { getEventById , getEvents, createEvent} from "../controllers/eventController.js";
import express from "express";
const router = express.Router();

// Event routes
router.get("/events", getEvents);
router.get("/events/:id", getEventById);
router.post("/events", createEvent);

export default router;