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
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseTextArea from "@/common/components/BaseTextArea/BaseTextArea";
import {
  FIRST_NAME_REQUIRED_ERROR,
  LAST_NAME_REQUIRED_ERROR,
  MESSAGE_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseButton from "@/common/components/BaseButton/BaseButton";

interface ContactUsInputs {
  firstName: string;
  lastName: string;
  message: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required(FIRST_NAME_REQUIRED_ERROR),
  lastName: yup.string().required(LAST_NAME_REQUIRED_ERROR),
  message: yup.string().required(MESSAGE_REQUIRED_ERROR),
});

const ContactUs: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContactUsInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (values: ContactUsInputs) => {
    console.log(values);
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
            <BaseFormControl isInvalid={Boolean(errors.firstName)}>
              <BaseFormLabel>First name</BaseFormLabel>
              <BaseInput
                variant="filled"
                placeholder="Enter first name"
                {...register("firstName")}
              />
              <BaseFormErrorMessage>
                {errors.firstName?.message}
              </BaseFormErrorMessage>
            </BaseFormControl>

            <BaseFormControl isInvalid={Boolean(errors.lastName)}>
              <BaseFormLabel>Last name</BaseFormLabel>
              <BaseInput
                variant="filled"
                placeholder="Enter last name"
                {...register("lastName")}
              />
              <BaseFormErrorMessage>
                {errors.lastName?.message}
              </BaseFormErrorMessage>
            </BaseFormControl>

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

            <BaseButton variant="solid" type="submit">
              Send
            </BaseButton>
          </BaseFlex>
        </form>
      </BaseCard>
    </BaseSection>
  );
};

export default ContactUs;
