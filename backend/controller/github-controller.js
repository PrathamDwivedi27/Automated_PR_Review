import fetch from "node-fetch";

// Function to create GitHub webhook
export const createWebhook = async (req, res) => {
  try {
    // Destructure owner, repo, and access token from the request body
    const { owner, repo, accessToken } = req.body;

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/hooks`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${accessToken}`, // Use OAuth access token here
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
    // console.log("Webhook received:", req.body);

    // Check the event type
    const eventType = req.headers["x-github-event"];
    if (eventType === "pull_request") {
      const pullRequestData = req.body;
      console.log("Pull Request Data:", pullRequestData);

      return res.status(200).json({
        message: "Get the pr data",
        data: pullRequestData,
        err: {},
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Not able to get the pr data",
      err: error.message,
      data: {},
    });
  }
};
