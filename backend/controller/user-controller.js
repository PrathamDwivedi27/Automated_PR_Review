import { CLIENT_ID,CLIENT_SECRET } from '../config/server-config.js';
const fetch=(...args)=>import('node-fetch').then(({default: fetch})=>fetch(...args));




//code being passed from frontend and access token be provided from backend
export const getAccessToken=async (req,res)=>{
    try {
        console.log(req.query.code);
        console.log(CLIENT_ID);
        console.log(CLIENT_SECRET);
        const params="?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&code="+req.query.code;
        const response=await fetch("https://github.com/login/oauth/access_token"+params,{
            method:"POST",
            headers:{
                "Accept":"application/json"
            }
        });
        const data = await response.json();
        console.log("GitHub API Response:", data);

        if (data.error) {
            return res.status(400).json({
                message: "GitHub API Error",
                error: data.error_description || data.error,
                data: {}
            });
        }

        if (!data.access_token) {
            return res.status(400).json({
                message: "Access token not found in the response",
                data: {}
            });
        }

        return res.status(200).json({
            message:"Access Token Generated",
            data:data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Not able to get the access token",
            err:error.message,
            data:{}
        })
    }
}

