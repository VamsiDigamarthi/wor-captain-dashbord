import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5051",
});

export const imageUrl = "http://localhost:5051";
export const socketUrl = "http://localhost:5051";
