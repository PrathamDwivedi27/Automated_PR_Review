import express from "express";
import { getAccessToken } from "../../controller/user-controller.js";



const router=express.Router();

router.get('/getAccessToken',getAccessToken);
// router.get('/getUserDetails',getUserDetails);

export default router;