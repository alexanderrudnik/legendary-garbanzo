import { axiosInstance } from "../base/baseService";
import { ContactDetails, ContactResponse } from "./types";

class ContactService {
  contact({ message }: ContactDetails) {
    return axiosInstance.post<ContactResponse>("/contact", {
      message,
    });
  }
}

export const contactService = new ContactService();
