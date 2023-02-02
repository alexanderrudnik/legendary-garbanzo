import { contactService } from "@/services/contact/contactService";
import { ContactDetails } from "@/services/contact/types";
import { toastService } from "@/services/toast/toastService";
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
      toastService.show({
        title: "Success",
        description: data,
        status: "success",
      }),
    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
