import express from "express"; // ES Modules
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use("/api/v1", userRoutes);

export default app;