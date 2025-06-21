import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user.route";
import tokenRoutes from "./routes/token.route";
import chainRoutes from "./routes/chain.route";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/tokens", tokenRoutes);
app.use("/chains", chainRoutes);

app.listen(port, () => {
	if (process.env.ENV !== "production") {
		console.log(`🚀 Server running at http://localhost:${port}`);
	}
});
