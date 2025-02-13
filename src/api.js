import axios from 'axios';

const apiBaseUrl = "http://localhost:8080";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const getMemos = async (token) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/memos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch memos");
  }
};

export const getUser = async (token, username) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/user/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};

export const createMemo = async (token, content) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/memo`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create memo");
  }
};
