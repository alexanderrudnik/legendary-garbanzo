import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";

import { useSignIn } from "../hooks/useSignIn";

import {
  EMAIL_INVALID_ERROR,
  EMAIL_REQUIRED_ERROR,
  PASSWORD_REQUIRED_ERROR,
} from "@/app/messages/errors";
import { RouteEnum } from "@/common/models/RouteEnum";
import { SignInDetails } from "@/services/auth/types";
import BaseInputGroup from "@/common/components/BaseInputGroup/BaseInputGroup";
import BaseInputRightElement from "@/common/components/BaseInputRightElement/BaseInputRightElement";

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_INVALID_ERROR).required(EMAIL_REQUIRED_ERROR),
  password: yup.string().required(PASSWORD_REQUIRED_ERROR),
});

const SignIn: React.FC = () => {
  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInDetails>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { isLoading: isSigningIn, mutateAsync: signIn } = useSignIn();

  const navigate = useNavigate();

  const onSubmit = (values: SignInDetails) => {
    signIn(values).then(() => {
      navigate(RouteEnum.HOME);
    });
  };

  return (
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

        <BaseFormControl isInvalid={Boolean(errors.password)}>
          <BaseFormLabel>Password</BaseFormLabel>
          <BaseInputGroup>
            <BaseInput
              variant="filled"
              type={show ? "text" : "password"}
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

        <Link to={RouteEnum.FORGOT_PASSWORD}>
          <BaseButton width="100%" justifyContent="flex-end" variant="link">
            Forgot password?
          </BaseButton>
        </Link>

        {/* <BaseFormControl>
          <BaseFlex align="center">
            <BaseCheckbox disabled {...register("rememberMe")}>
              Remember me (AVAILABLE SOON)
            </BaseCheckbox>
          </BaseFlex>
        </BaseFormControl> */}

        <BaseButton isLoading={isSigningIn} variant="solid" type="submit">
          Submit
        </BaseButton>
      </BaseFlex>
    </form>
  );
};

export default SignIn;
