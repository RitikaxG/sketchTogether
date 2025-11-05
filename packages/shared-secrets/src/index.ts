import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config({path: path.resolve(__dirname,"../../../.env")});

export const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY 
export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY
export const DATABASE_URL = process.env.DATABASE_URL
export const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET
export const NEXT_CLERK_PUBLISHABLE_KEY = process.env.NEXT_CLERK_PUBLISHABLE_KEY;