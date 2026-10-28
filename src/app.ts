import Express from "express";
import { errorHandler } from "./middlewares/errorHandling.js";
import router from "./routes/index.js";

const app = Express();

app.use(Express.json());
app.use("/api/v1/", router);

app.use(errorHandler); // MUST BE AFTER ROUTERS

export default app