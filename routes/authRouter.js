import { Router } from "express";
const router = Router();
import {
  login,
  logout,
  register,
  emailSend,
  changePassword,
} from "../controllers/authController.js";
import { sendEmail } from "../controllers/EmailController.js";
//import EmailController from "../controllers/EmailController.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

import rateLimiter from "express-rate-limit";
//import { route } from "express/lib/router/index.js";
//import sendEmail from "../controllers/EmailController.js";
//import EmailSender from "../client/src/pages/EmailSender.jsx";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

router.post("/emailSend", emailSend);
router.post("/changePassword", changePassword);


export default router;
