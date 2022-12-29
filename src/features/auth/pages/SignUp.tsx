import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAllInvitedUsers } from "@/features/home/hooks/useAllInvitedUsers";
import Loading from "@/common/components/Loading/Loading";
import BaseHeading from "@/common/components/BaseHeading/BaseHeading";
import {
  COMPANY_REQUIRED_ERROR,
  EMAIL_INVALID_ERROR,
  EMAIL_REQUIRED_ERROR,
  FIRST_NAME_REQUIRED_ERROR,
  LAST_NAME_REQUIRED_ERROR,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_LOWER_CASE_ERROR,
  PASSWORD_NUMBER_ERROR,
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_UPPER_CASE_ERROR,
} from "@/app/messages/errors";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import {
  PASSWORD_LOWER_CASE_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_UPPER_CASE_REGEX,
} from "@/common/regex/regex";
import { useSignUp } from "../hooks/useSignUp";
import BaseText from "@/common/components/BaseText/BaseText";

interface SignUpFormInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
}

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_INVALID_ERROR).required(EMAIL_REQUIRED_ERROR),
  password: yup
    .string()
    .required(PASSWORD_REQUIRED_ERROR)
    .min(8, PASSWORD_LENGTH_ERROR)
    .matches(PASSWORD_NUMBER_REGEX, PASSWORD_NUMBER_ERROR)
    .matches(PASSWORD_UPPER_CASE_REGEX, PASSWORD_UPPER_CASE_ERROR)
    .matches(PASSWORD_LOWER_CASE_REGEX, PASSWORD_LOWER_CASE_ERROR),
  firstName: yup.string().required(FIRST_NAME_REQUIRED_ERROR),
  lastName: yup.string().required(LAST_NAME_REQUIRED_ERROR),
  company: yup.string().required(COMPANY_REQUIRED_ERROR),
});

const SignUp: React.FC = () => {
  const [isSignUpAccessed, setIsSignUpAccessed] = useState(false);

  const { isLoading, data: invitedUsers } = useAllInvitedUsers();

  const [searchParams] = useSearchParams();

  const email = useMemo(() => searchParams.get("email"), [searchParams]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: email || "",
    },
  });

  const {
    isLoading: isSigningUp,
    mutateAsync: signUp,
    isSuccess,
    data,
  } = useSignUp();

  useEffect(() => {
    if (invitedUsers?.find((user) => user.email === email)) {
      setIsSignUpAccessed(true);
    }
  }, [invitedUsers, email]);

  const onSubmit = (values: SignUpFormInputs) => {
    signUp(values);
  };

  return isLoading ? (
    <Loading />
  ) : isSuccess ? (
    <BaseText>A verification email has been sent to the {data.email}</BaseText>
  ) : isSignUpAccessed ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseFlex gap="1rem" direction="column">
        <BaseFormControl isInvalid={Boolean(errors.firstName)}>
          <BaseFormLabel>First Name</BaseFormLabel>
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
          <BaseFormLabel>Last Name</BaseFormLabel>
          <BaseInput
            variant="filled"
            placeholder="Enter last name"
            {...register("lastName")}
          />
          <BaseFormErrorMessage>
            {errors.lastName?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

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

        <BaseFormControl isInvalid={Boolean(errors.password)}>
          <BaseFormLabel>Password</BaseFormLabel>
          <BaseInput
            variant="filled"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
          <BaseFormErrorMessage>
            {errors.password?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.company)}>
          <BaseFormLabel>Company</BaseFormLabel>
          <BaseInput
            variant="filled"
            placeholder="Enter company"
            {...register("company")}
          />
          <BaseFormErrorMessage>{errors.company?.message}</BaseFormErrorMessage>
        </BaseFormControl>

        <BaseButton isLoading={isSigningUp} variant="solid" type="submit">
          Sign Up
        </BaseButton>
      </BaseFlex>
    </form>
  ) : (
    <BaseHeading textAlign="center">
      We are sorry, but this email isn't invited ;(
    </BaseHeading>
  );
};

export default SignUp;