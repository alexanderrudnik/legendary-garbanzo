import { createStandaloneToast, UseToastOptions } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

class ToastService {
  show(options: UseToastOptions) {
    toast({
      ...options,
      duration: options?.duration || 3000,
      isClosable: options?.isClosable || true,
    });
  }
}

export const toastService = new ToastService();
