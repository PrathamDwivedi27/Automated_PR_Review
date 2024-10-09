// utils/githubUtils.js
import fetch from "node-fetch";

// Helper function to fetch diff content
export const fetchDiff = async (diffUrl) => {
  const response = await fetch(diffUrl);
  if (!response.ok) throw new Error('Failed to fetch diff');
  return response.text();
};

// Helper function to fetch patch content
export const fetchPatch = async (patchUrl) => {
  const response = await fetch(patchUrl);
  if (!response.ok) throw new Error('Failed to fetch patch');
  return response.text();
};
