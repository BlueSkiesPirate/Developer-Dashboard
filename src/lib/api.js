import axios from "axios";

const api = axios.create({
  baseURL: "/api", // points to the NExt.js API folder
  headers: {
    "Content-Type": "application/json",
  },
});

export const createSnippet = async (data) => {
  return await api.post("/snippets", data);
};

export const getSnippets = async () => {
  const res = await api.get("/snippets");
  return res.data;
};

export const getSnippet = async (id) => {
  try {
    const res = await api.get(`/snippets/${id}`);
    return res.data;
  } catch (err) {
    console.log(
      "Error fetching snippet:",
      err.response ? err.response.data : err.message
    );
    throw new Error("Failed to fetch snippet");
  }
};
