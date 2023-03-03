import { axiosInstance } from "../base/baseService";
import { ContactDetails, ContactResponse } from "./types";

class ContactService {
  contact(data: ContactDetails) {
    return axiosInstance.post<ContactResponse>("/contact", data);
  }
}

export const contactService = new ContactService();
