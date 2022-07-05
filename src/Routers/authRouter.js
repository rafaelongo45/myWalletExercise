import { Router } from "express";

import { signin, signup } from "../Controllers/authController.js";
import { validateSignin, validateSignup } from "../Middlewares/validateAuth.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSignup, signup);
authRouter.post("/sign-in", validateSignin, signin);

export default authRouter;