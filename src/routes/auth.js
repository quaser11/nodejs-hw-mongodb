import {Router} from "express";
import {
    createUserController,
    loginUserController,
    logoutController,
    refreshController, resetPwdController,
    sendResetTokenController
} from "../controllers/auth.js";
import {validateBody} from "../middlewares/validateBody.js";
import {loginSchema, registerSchema, resetPasswordSchema, resetPwdSchema} from "../schemas/authValidationSchemas.js";
import {authenticate} from "../middlewares/authenticate.js";

const router = Router();

router.post('/register', validateBody(registerSchema), createUserController)
router.post('/login', validateBody(loginSchema), loginUserController)
router.post('/refresh', authenticate, refreshController)
router.post('/logout', authenticate, logoutController)
router.post('/send-reset-email', authenticate, validateBody(resetPasswordSchema), sendResetTokenController)
router.post('/reset-pwd', authenticate, validateBody(resetPwdSchema), resetPwdController)
export default router;