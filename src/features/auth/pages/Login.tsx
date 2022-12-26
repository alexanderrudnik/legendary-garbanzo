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

interface LoginFormInputs {
  Email: string;
  Password: string;
}
const schema = yup.object().shape({
  Email: yup.string().email().required(),
  Password: yup.string().required(),
});

const Login: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (values: LoginFormInputs) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseFlex gap="1rem" direction="column">
        <BaseFormControl isInvalid={Boolean(errors.Email)}>
          <BaseFormLabel>Email</BaseFormLabel>
          <BaseInput
            type="email"
            placeholder="Enter email"
            {...register("Email")}
          />
          <BaseFormErrorMessage>{errors.Email?.message}</BaseFormErrorMessage>
        </BaseFormControl>

        <BaseFormControl isInvalid={Boolean(errors.Password)}>
          <BaseFormLabel>Password</BaseFormLabel>
          <BaseInput
            type="password"
            placeholder="Enter password"
            {...register("Password")}
          />
          <BaseFormErrorMessage>
            {errors.Password?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseButton variant="solid" type="submit">
          Submit
        </BaseButton>
      </BaseFlex>
    </form>
  );
};

export default Login;
