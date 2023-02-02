import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { dateService } from "@/services/date/dateService";
import { newsService } from "@/services/news/newsService";
import { toastService } from "@/services/toast/toastService";
import { useQuery } from "react-query";

const getNews = async () => {
  try {
    const response = await newsService.getNews();

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useNews = () => {
  return useQuery(QueryKeysEnum.NOTIFICATIONS, getNews, {
    select: (data) =>
      data.sort((a, b) =>
        dateService.getDate(a.date).isAfter(dateService.getDate(b.date))
          ? -1
          : 1
      ),
    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
