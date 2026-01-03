import express from "express";
import cors from "cors";
import auth from "./routes/auth.routes.js";
import profile from "./routes/profile.routes.js";
import attendance from "./routes/attendance.routes.js";
import leave from "./routes/leave.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/attendance", attendance);
app.use("/api/leave", leave);

export default app;
