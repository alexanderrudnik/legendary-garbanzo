import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  PASSWORD_REQUIRED_ERROR,
  PASSWORD_INVALID_ERROR,
} from "@/app/messages/errors";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { UpdatePasswordDetails } from "@/services/user/types";
import { PASSWORD_REGEX } from "@/common/regex/regex";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";
import { CheckIcon } from "@chakra-ui/icons";

const schema = yup.object().shape({
  password: yup
    .string()
    .required(PASSWORD_REQUIRED_ERROR)
    .matches(PASSWORD_REGEX, PASSWORD_INVALID_ERROR),
});

const UpdatePassword: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdatePasswordDetails>({
    resolver: yupResolver(schema),
    mode: "onTouched",
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
      </BaseFlex>

      <BaseButton
        leftIcon={<CheckIcon />}
        marginTop="2.5rem"
        type="submit"
        isLoading={isUpdatingPassword}
      >
        Update
      </BaseButton>
    </form>
  );
};

export default UpdatePassword;
