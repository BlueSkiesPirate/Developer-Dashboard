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
  console.log(res.data);
  return res.data;
};
