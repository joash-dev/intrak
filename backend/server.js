import express from "express";
import pool from "./db.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";


const app = express();

app.use(cors({
    origin: "http://localhost:4028",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,

}));

app.get("/db-test", async (req, res) => {
    const result = await pool.query('SELECT * FROM "Users"');
    res.json(result.rows);
})

app.use(express.json());

app.get("/", (req, res) => {
    res.send("this is the backend")
});

app.use("/auth",authRoutes);

app.listen(5000,() => {
    console.log("Server has started on port 5000");
});