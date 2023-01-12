import { contactService } from "@/services/contact/contactService";
import { ContactDetails } from "@/services/contact/types";
import { notificationService } from "@/services/notification/notificationService";
import { useMutation } from "react-query";

const contact = async (details: ContactDetails) => {
  try {
    const response = await contactService.contact(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useContact = () => {
  return useMutation(contact, {
    onSuccess: (data) =>
      notificationService.show({
        title: "Success",
        description: data,
        status: "success",
      }),
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
