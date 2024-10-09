import fetch from "node-fetch";
import { fetchDiff,fetchPatch } from "../utils/helper.js";
import { GEMINI_API_KEY } from "../config/server-config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ACCESS_TOKEN_SECRET } from "../config/server-config.js";



// Function to create GitHub webhook
export const createWebhook = async (req, res) => {
  try {
    // Destructure owner, repo, and access token from the request body
    const { owner, repo} = req.body;

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/hooks`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${ACCESS_TOKEN_SECRET}`, // Use OAuth access token here
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "web",
          active: true,
          events: ["pull_request"], // Trigger on pull requests
          config: {
            url: "https://5a7a-2401-4900-168d-6c33-5c75-45e7-9e72-518d.ngrok-free.app/api/v1/getdata", // Replace with your webhook URL
            content_type: "json",
            insecure_ssl: "0",
          },
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json({
        message: "Webhook created successfully",
        webhook: data,
      });
    } else {
      return res.status(400).json({
        message: "Failed to create webhook",
        error: data,
      });
    }
  } catch (error) {
    console.error("Error creating webhook:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const handleWebhook = async (req, res) => {
    try {
      const eventType = req.headers["x-github-event"];
      if (eventType === "pull_request") {
        const pullRequestData = req.body;
        console.log("Pull Request Data:", pullRequestData);
  
        if (["opened", "synchronize", "reopened"].includes(pullRequestData.action)) {
          const { diff_url, patch_url,number } = pullRequestData.pull_request;
          const {repository} = pullRequestData;
  
          // Fetch diff and patch data using utility functions
          const [diffText, patchText] = await Promise.all([
            fetchDiff(diff_url),
            fetchPatch(patch_url),
          ]);

        //   console.log("Diff Text:", diffText);
        //   console.log("Patch Text:", patchText);
  
          // Call the AI model to review the changes
          const aiReview = await reviewWithAI(diffText, patchText);
          console.log("AI Review:", aiReview);
  
          await postComment(repository.owner.login, repository.name, number, aiReview,ACCESS_TOKEN_SECRET);


          // Respond with the AI review
          return res.status(200).json({
            message: "Pull request reviewed successfully",
            aiReview,
          });
        }
        return res.status(200).json({ message: "Event not handled" });
      }
    } catch (error) {
      console.log("Error handling webhook:", error);
      return res.status(500).json({
        message: "Not able to get the PR data",
        error: error.message,
      });
    }
  };


export async function reviewWithAI(diffText, patchText) {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([`Review the following pull request diff and patch:\n\nDiff:\n${diffText}\n\nPatch:\n${patchText}\n\nProvide feedback, potential improvements, and issues.`]);
    
    return result.response.text();
  };



  async function postComment(owner, repo, pull_number, comment, accessToken) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${pull_number}/comments`, {
        method: "POST",
        headers: {
          Authorization: `token ${accessToken}`, // Use OAuth access token here
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: comment, // The AI review comment
        }),
      });
     
      const data = await response.json();  // Log the response from GitHub
      console.log("GitHub Response:", data);  // Log the response
      if (!response.ok) {
        console.error("Failed to post comment:", data);
        throw new Error(`Error posting comment: ${data.message}`);
      }     
  }

