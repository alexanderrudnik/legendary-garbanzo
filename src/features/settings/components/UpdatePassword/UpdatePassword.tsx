import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  PASSWORD_LENGTH_ERROR,
  PASSWORD_LOWER_CASE_ERROR,
  PASSWORD_NUMBER_ERROR,
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_UPPER_CASE_ERROR,
} from "@/app/messages/errors";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { UpdatePasswordDetails } from "@/services/user/types";
import {
  PASSWORD_LOWER_CASE_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_UPPER_CASE_REGEX,
} from "@/common/regex/regex";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";

const schema = yup.object().shape({
  password: yup
    .string()
    .required(PASSWORD_REQUIRED_ERROR)
    .min(8, PASSWORD_LENGTH_ERROR)
    .matches(PASSWORD_NUMBER_REGEX, PASSWORD_NUMBER_ERROR)
    .matches(PASSWORD_UPPER_CASE_REGEX, PASSWORD_UPPER_CASE_ERROR)
    .matches(PASSWORD_LOWER_CASE_REGEX, PASSWORD_LOWER_CASE_ERROR),
});

const UpdatePassword: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdatePasswordDetails>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { mutateAsync: updatePassword, isLoading: isUpdatingPassword } =
    useUpdatePassword();

  const onSubmit = (values: UpdatePasswordDetails) => {
    updatePassword({ password: values.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseFlex flexDirection="column" gap="1rem">
        <BaseFormControl isInvalid={Boolean(errors.password)}>
          <BaseFormLabel>Password</BaseFormLabel>
          <BaseInput
            type="password"
            variant="filled"
            placeholder="Enter password"
            {...register("password")}
          />
          <BaseFormErrorMessage>
            {errors.password?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseButton type="submit" isLoading={isUpdatingPassword}>
          Update
        </BaseButton>
      </BaseFlex>
    </form>
  );
};

export default UpdatePassword;
