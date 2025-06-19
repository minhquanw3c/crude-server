import express from "express";
import dotenv from "dotenv";
import multer from "multer";

import userRoutes from "./routes/user.route";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.listen(port, () => {
	if (process.env.ENV !== "production") {
		console.log(`🚀 Server running at http://localhost:${port}`);
	}
});
