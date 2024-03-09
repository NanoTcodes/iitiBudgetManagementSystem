import express from "express";
import connectToMongo from "./db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT;
const host = process.env.HOST;

const app = express();
app.use(cors());
app.use(express.json());
connectToMongo();

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(
    `IITI Budget Website backend is listening at https://${host}:${port}`
  );
});
