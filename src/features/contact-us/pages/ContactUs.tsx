import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseHeading from "@/common/components/BaseHeading/BaseHeading";
import BaseCard from "@/common/components/BaseCard/BaseCard";
import BaseText from "@/common/components/BaseText/BaseText";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseTextArea from "@/common/components/BaseTextArea/BaseTextArea";
import { MESSAGE_REQUIRED_ERROR } from "@/app/messages/errors";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { useContact } from "../hooks/useContact";
import { ContactDetails } from "@/services/contact/types";

const schema = yup.object().shape({
  message: yup.string().required(MESSAGE_REQUIRED_ERROR),
});

const ContactUs: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ContactDetails>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { isLoading: isContacting, mutateAsync: contact } = useContact();

  const onSubmit = (values: ContactDetails) => {
    contact(values).then(() => reset());
  };

  return (
    <BaseSection>
      <BaseHeading marginBottom="3rem" textAlign="center">
        Got any comments or questions?
      </BaseHeading>

      <BaseCard>
        <BaseHeading marginBottom="1rem">Contact us</BaseHeading>

        <BaseText marginBottom="2rem">
          Please use the form below to inquire about anything
        </BaseText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <BaseFlex direction="column" gap="1rem">
            <BaseFormControl isInvalid={Boolean(errors.message)}>
              <BaseFormLabel>Message</BaseFormLabel>
              <BaseTextArea
                variant="filled"
                placeholder="How can we help you?"
                {...register("message")}
              />
              <BaseFormErrorMessage>
                {errors.message?.message}
              </BaseFormErrorMessage>
            </BaseFormControl>

            <BaseButton isLoading={isContacting} variant="solid" type="submit">
              Send
            </BaseButton>
          </BaseFlex>
        </form>
      </BaseCard>
    </BaseSection>
  );
};

export default ContactUs;
