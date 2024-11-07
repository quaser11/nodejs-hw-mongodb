import {Router} from "express";
import {createUserController, loginUserController, logoutController, refreshController} from "../controllers/auth.js";
import {validateBody} from "../middlewares/validateBody.js";
import {loginSchema, registerSchema} from "../schemas/authValidationSchemas.js";

const router = Router();

router.post('/register', validateBody(registerSchema), createUserController)
router.post('/login', validateBody(loginSchema), loginUserController)
router.post('/refresh', refreshController)
router.post('/logout', logoutController)
export default router;