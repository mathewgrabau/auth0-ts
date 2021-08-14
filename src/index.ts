/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

// App logic (controller)
import { itemsRouter } from "./items/items.router";

// Other handlers 
import {errorHandler} from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

// Loading the environment variables (from .env)
dotenv.config();

/**
 * App Variables
 */
// Terminate if the proper environment variables are not there.
if (!process.env.PORT) {
    process.exit(1);
}

// Parse out the port number
const port = parseInt(process.env.PORT as string, 10);
const app = express();
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
// Parses incoming requests with JSON payloads, which then changes request.body to an Object containing the newly parsed data
app.use(express.json());

// Assign the interface here
app.use("/api/menu/items", itemsRouter);

// Add my handlers
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
