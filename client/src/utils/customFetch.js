import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://mern-course-jobify-fqqf.onrender.com/api/v1",
});

export default customFetch;
