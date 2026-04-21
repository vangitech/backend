import { Router } from "express";
import { registerUser, loginUser, logOut } from "../controller/userController.js";



const router = Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logOut').post(logOut);

export default router;