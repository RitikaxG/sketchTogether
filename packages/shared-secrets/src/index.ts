import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config({path: path.resolve(__dirname,"../../../.env")});

export const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY
export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY