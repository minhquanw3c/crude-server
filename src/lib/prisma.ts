import path from "path";
import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma";

const dbPath = path.resolve(__dirname, "../../prisma/dev.db");

const adapter = new PrismaBetterSQLite3({
	url: dbPath,
});

const prisma = new PrismaClient({ adapter, errorFormat: "pretty" });

export default prisma;
