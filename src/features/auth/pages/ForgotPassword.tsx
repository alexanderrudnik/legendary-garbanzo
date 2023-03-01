import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";

import {
  EMAIL_INVALID_ERROR,
  EMAIL_REQUIRED_ERROR,
} from "@/app/messages/errors";
import { useResetPassword } from "../hooks/useResetPassword";
import BaseText from "@/common/components/BaseText/BaseText";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RouteEnum } from "@/common/models/RouteEnum";
import { ResetPasswordDetails } from "@/services/auth/types";
import { ArrowBackIcon } from "@chakra-ui/icons";

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_INVALID_ERROR).required(EMAIL_REQUIRED_ERROR),
});

const ForgotPassword: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordDetails>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const {
    mutateAsync: resetPassword,
    isLoading: isResettingPassword,
    isSuccess,
    variables,
  } = useResetPassword();

  const onSubmit = (values: ResetPasswordDetails) => {
    resetPassword(values);
  };

  return isSuccess ? (
    <>
      <Flex gap="1rem" flexDirection="column">
        <BaseText>
          A reset link was successfully sent to <b>{variables?.email}</b>
        </BaseText>

        <Link to={RouteEnum.SIGN_IN}>
          <BaseButton width="100%">Sign In</BaseButton>
        </Link>
      </Flex>
    </>
  ) : (
    <>
      <Link to={RouteEnum.SIGN_IN}>
        <BaseButton
          leftIcon={<ArrowBackIcon />}
          colorScheme="blackAlpha"
          marginBottom="3rem"
          variant="link"
        >
          Back
        </BaseButton>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseFlex gap="1rem" direction="column">
          <BaseFormControl isInvalid={Boolean(errors.email)}>
            <BaseFormLabel>Email</BaseFormLabel>
            <BaseInput
              variant="filled"
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            <BaseFormErrorMessage>{errors.email?.message}</BaseFormErrorMessage>
          </BaseFormControl>
        </BaseFlex>

        <BaseButton
          marginTop="2.5rem"
          width="100%"
          isLoading={isResettingPassword}
          variant="solid"
          type="submit"
        >
          Submit
        </BaseButton>
      </form>
    </>
  );
};

export default ForgotPassword;
