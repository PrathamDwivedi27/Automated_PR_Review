import dotenv from 'dotenv';
dotenv.config();


export const PORT=process.env.PORT;
export const CLIENT_ID=process.env.CLIENT_ID;
export const CLIENT_SECRET=process.env.CLIENT_SECRET;
export const GEMINI_API_KEY=process.env.GEMINI_API_KEY;
export const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;