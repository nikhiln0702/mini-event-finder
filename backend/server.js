import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Allow app to accept JSON

// Use defined routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
