import { Router } from "express";

import { validateToken } from "../Middlewares/validateToken.js";
import { createFinancialEvent, getFinancialEvent, getSumFinancialEvent } from "../Controllers/financialController.js";

const financialRouter = Router();

financialRouter.post("/financial-events", validateToken, createFinancialEvent);
financialRouter.get("/financial-events", validateToken, getFinancialEvent);
financialRouter.get("/financial-events/sum", getSumFinancialEvent, );



export default financialRouter;