import { axiosInstance } from "../base/baseService";
import { NewsItem } from "./types";

class NewsService {
  getNews() {
    return axiosInstance.get<NewsItem[]>("/news");
  }
}

export const newsService = new NewsService();
