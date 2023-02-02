import { BaseAlertProps } from "@/common/components/BaseAlert/BaseAlert";

export interface NewsItem {
  id: string;
  date: number;
  title: string;
  message: string;
  status: BaseAlertProps["status"];
}
