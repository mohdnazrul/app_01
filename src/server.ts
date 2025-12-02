import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json()); // for JSON body

app.use("/api", router);

app.listen(ENV.PORT, () => {
    console.log(`API running on http://localhost:${ENV.PORT}`);
});
