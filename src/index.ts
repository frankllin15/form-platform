import express from "express";
import AppRouter from "./routes";
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", AppRouter);

app.listen(port, async () => {
  console.log(`Server rsunning on port ${port}`);
});
