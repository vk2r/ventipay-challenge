import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import parser from 'body-parser';

dotenv.config({ debug: true });

// Constants
const port = process.env.PORT || 5173;

// Routes
import user from './api/routes/user.js';
import render from './api/routes/render.js';

// Create http server
const app = express();
app.use(cors());
app.disable('x-powered-by');
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// Web Routes
app.use('/api', user);
app.use('/', render);

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
