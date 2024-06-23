import express from "express";
import { Request, Response } from "express-serve-static-core";

// Import routes
import errorHandler from "./middlewares/error.middleware";
import notFound from "./middlewares/not-found.middlware";
import users from "./routes/users.route";

const app = express();

const port = 8000;

// Middlewares
app.use(express.json()); // Able to send JSON data
app.use(express.urlencoded({ extended: true })); // Able to send form data

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is running",
  });
});

// Routes
app.use("/api/users", users);

// Catch all error
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
