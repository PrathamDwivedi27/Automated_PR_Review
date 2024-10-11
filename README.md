# Automated GitHub PR Review System

An automated GitHub Pull Request (PR) review system that reviews PRs using AI and posts feedback as comments. The system integrates with GitHub OAuth for authentication, receives PR events through webhooks, and automatically analyzes the submitted code to provide insights.

## Features

- **GitHub OAuth Authentication:** Users can connect to GitHub via OAuth to authorize the system.
- **Webhook for PR Events:** Automatically listens for PR events from the repository.
- **AI-Driven PR Review:** Uses an AI service to analyze code and provide comments on PRs.
- **Real-time Feedback:** Posts feedback on the PRs as comments.

## Prerequisites

Before setting up the project, ensure you have the following:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) for storing access tokens
- [GitHub OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) set up for your GitHub account

### GitHub OAuth App Settings:

1. Go to GitHub > Settings > Developer Settings > OAuth Apps.
2. Create a new OAuth app with the following:
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization Callback URL:** `http://localhost:3000`

3. Copy the `Client ID` and `Client Secret` for use in the backend.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/automated-pr-review.git
    cd automated-pr-review
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root directory and adding the following variables:

    ```plaintext
    GITHUB_CLIENT_ID=<your_github_client_id>
    GITHUB_CLIENT_SECRET=<your_github_client_secret>
    GITHUB_REDIRECT_URI=http://localhost:3000
    BACKEND_BASE_URL=http://localhost:3005/api/v1
    ```

4. Start the backend server for OAuth and webhook handling:

    ```bash
    cd backend
    npm install
    npm start
    ```

5. Start the frontend:

    ```bash
    cd frontend
    npm install
    npm start
    ```

The frontend will be running on `http://localhost:3000` and the backend on `http://localhost:3005`.

## Usage

### 1. GitHub OAuth Login
- Navigate to `http://localhost:3000` and click the "Connect with GitHub" button.
- This will redirect you to GitHub for authorization. Once authorized, the system will store the access token locally.

### 2. Submitting Repository Info
- After logging in, submit the **Owner/Username** and **Repository Name** for which you want to automate PR reviews.
- This will set up a webhook on the specified repository to listen for PR events.

### 3. Webhook & PR Review
- When a pull request is opened or updated, the system will automatically trigger the webhook and review the PR.
- AI will analyze the code and post comments on the pull request.

