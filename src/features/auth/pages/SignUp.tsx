import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAllInvitedUsers } from "@/features/invite/hooks/useAllInvitedUsers";
import Loading from "@/common/components/Loading/Loading";
import BaseHeading from "@/common/components/BaseHeading/BaseHeading";
import {
  EMAIL_INVALID_ERROR,
  EMAIL_REQUIRED_ERROR,
  FIRST_NAME_REQUIRED_ERROR,
  LAST_NAME_REQUIRED_ERROR,
  PASSWORD_INVALID_ERROR,
  PASSWORD_REQUIRED_ERROR,
  TELEGRAM_AT_ERROR,
} from "@/app/messages/errors";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { PASSWORD_REGEX, TELEGRAM_AT_REGEX } from "@/common/regex/regex";
import { useSignUp } from "../hooks/useSignUp";
import BaseText from "@/common/components/BaseText/BaseText";
import { SignUpDetails } from "@/services/auth/types";
import { RouteEnum } from "@/common/models/RouteEnum";
import BaseInputGroup from "@/common/components/BaseInputGroup/BaseInputGroup";
import BaseInputLeftAddon from "@/common/components/BaseInputLeftAddon/BaseInputLeftAddon";
import BaseInputRightElement from "@/common/components/BaseInputRightElement/BaseInputRightElement";

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_INVALID_ERROR).required(EMAIL_REQUIRED_ERROR),
  password: yup
    .string()
    .required(PASSWORD_REQUIRED_ERROR)
    .matches(PASSWORD_REGEX, PASSWORD_INVALID_ERROR),
  firstName: yup.string().required(FIRST_NAME_REQUIRED_ERROR),
  lastName: yup.string().required(LAST_NAME_REQUIRED_ERROR),
  telegram: yup
    .string()
    .matches(new RegExp(TELEGRAM_AT_REGEX), TELEGRAM_AT_ERROR),
});

const SignUp: React.FC = () => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>();

  const [isSignUpAccessed, setIsSignUpAccessed] = useState(false);
  const [show, setShow] = useState(false);

  const { isLoading, data: invitedUsers } = useAllInvitedUsers();

  const [searchParams] = useSearchParams();

  const email = useMemo(() => searchParams.get("email"), [searchParams]);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpDetails>({
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
    variables,
  } = useSignUp();

  useEffect(() => {
    if (invitedUsers?.find((user) => user.email === email)) {
      setIsSignUpAccessed(true);
    }
  }, [invitedUsers, email]);

  const onSubmit = (values: SignUpDetails) => {
    signUp(values);
  };

  useEffect(() => {
    if (isSuccess) {
      timeoutId.current = setTimeout(() => {
        navigate(RouteEnum.SIGN_IN);
      }, 1000 * 5);

      return () => {
        clearTimeout(timeoutId.current);
      };
    }
  }, [isSuccess, navigate]);

  return isLoading ? (
    <Loading />
  ) : isSuccess ? (
    <BaseText>
      A verification email has been sent to the <b>{variables?.email}</b>
    </BaseText>
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

        <BaseFormControl isInvalid={Boolean(errors.telegram)}>
          <BaseFormLabel>Telegram</BaseFormLabel>
          <BaseInputGroup>
            <BaseInputLeftAddon pointerEvents="none">t.me/</BaseInputLeftAddon>
            <BaseInput
              borderLeftRadius="none"
              variant="filled"
              placeholder="Enter your telegram"
              {...register("telegram")}
            />
          </BaseInputGroup>
          <BaseFormErrorMessage>
            {errors.telegram?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.email)}>
          <BaseFormLabel>Email</BaseFormLabel>
          <BaseInput
            isDisabled
            variant="filled"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <BaseFormErrorMessage>{errors.email?.message}</BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.password)}>
          <BaseFormLabel>Password</BaseFormLabel>
          <BaseInputGroup>
            <BaseInput
              type={show ? "text" : "password"}
              variant="filled"
              placeholder="Enter password"
              {...register("password")}
            />
            <BaseInputRightElement width="4.5rem">
              <BaseButton
                variant="outline"
                h="1.75rem"
                size="sm"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </BaseButton>
            </BaseInputRightElement>
          </BaseInputGroup>
          <BaseFormErrorMessage>
            {errors.password?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>
      </BaseFlex>

      <BaseFlex
        marginTop="2.5rem"
        flexDirection="column"
        gap="1rem"
        align="center"
      >
        <Link to={RouteEnum.SIGN_IN}>
          <BaseButton width="100%" variant="link">
            Already have an account?
          </BaseButton>
        </Link>

        <BaseButton
          width="100%"
          isLoading={isSigningUp}
          variant="solid"
          type="submit"
        >
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
