import axios from "axios";
const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://api.punkapi.com/v2/beers";
export default axios.create({
  baseURL,
});
