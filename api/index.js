// Vercel serverless function - delegate to built Express server
import { createServer } from 'http';
import { httpServer } from '../dist/index.cjs';

export default httpServer;
