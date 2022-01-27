import axios from "axios";
//newsapi.org/v2/everything?q=tesla&from=2021-12-27&sortBy=publishedAt&apiKey=21207be0a1fc47b7bef70b16d2384e4c
export const getNews = async (queryStr, dateStr) => {
  let url =
    "https://newsapi.org/v2/everything?sortBy=popularity&apiKey=21207be0a1fc47b7bef70b16d2384e4c";
  if (queryStr) {
    url += `&q=${queryStr}`;
    if (dateStr) {
      url += `&${dateStr}`;
    }
  }
  return await axios.get(url);
};
