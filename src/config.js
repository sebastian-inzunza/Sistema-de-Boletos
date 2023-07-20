import { config } from "dotenv";
config()

export const MONGOODB_URL = process.env.MONGOODB_URL
export const PORT = process.env.PORT || 3000