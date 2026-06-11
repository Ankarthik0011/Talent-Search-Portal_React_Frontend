import axios from "axios";

const API_URL = "http://localhost:9090/api/candidates";

export const getAllCandidates = () => {
    return axios.get(API_URL);
};