import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseHeading from "@/common/components/BaseHeading/BaseHeading";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import { SendNotificationDetails } from "@/services/notification/types";
import {
  MESSAGE_REQUIRED_ERROR,
  TITLE_REQUIRED_ERROR,
} from "@/app/messages/errors";
import { useSendNotification } from "../hooks/useSendNotification";
import BaseCard from "@/common/components/BaseCard/BaseCard";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseTextArea from "@/common/components/BaseTextArea/BaseTextArea";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import { EmailIcon } from "@chakra-ui/icons";

const schema = yup.object().shape({
  title: yup.string().required(TITLE_REQUIRED_ERROR),
  message: yup.string().required(MESSAGE_REQUIRED_ERROR),
});

const SendNotification: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SendNotificationDetails>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { mutateAsync: sendNotification, isLoading: isSendingNotification } =
    useSendNotification();

  const onSubmit = (values: SendNotificationDetails) => {
    sendNotification(values).then(() => reset());
  };

  return (
    <BaseSection>
      <BaseHeading textAlign="center">
        Send a notification to every user
      </BaseHeading>

      <BaseCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BaseFlex direction="column" gap="1rem">
            <BaseFormControl isInvalid={Boolean(errors.title)}>
              <BaseFormLabel>Title</BaseFormLabel>
              <BaseInput
                variant="filled"
                placeholder="Enter title"
                {...register("title")}
              />
              <BaseFormErrorMessage>
                {errors.title?.message}
              </BaseFormErrorMessage>
            </BaseFormControl>

            <BaseFormControl isInvalid={Boolean(errors.message)}>
              <BaseFormLabel>Message (HTML)</BaseFormLabel>
              <BaseTextArea
                variant="filled"
                placeholder="Enter message"
                {...register("message")}
              />
              <BaseFormErrorMessage>
                {errors.message?.message}
              </BaseFormErrorMessage>
            </BaseFormControl>
          </BaseFlex>

          <BaseButton
            leftIcon={<EmailIcon />}
            marginTop="2.5rem"
            width="100%"
            isLoading={isSendingNotification}
            variant="solid"
            type="submit"
          >
            Send
          </BaseButton>
        </form>
      </BaseCard>
    </BaseSection>
  );
};

export default SendNotification;
