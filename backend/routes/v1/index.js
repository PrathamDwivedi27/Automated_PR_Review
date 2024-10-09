import express from "express";
import { getAccessToken } from "../../controller/user-controller.js";
import { createWebhook } from "../../controller/github-controller.js";
import { handleWebhook } from "../../controller/github-controller.js";



const router=express.Router();

router.get('/getAccessToken',getAccessToken);
// router.get('/getUserDetails',getUserDetails);

router.post('/createWebhook', createWebhook);
router.post('/getdata', handleWebhook);

export default router;