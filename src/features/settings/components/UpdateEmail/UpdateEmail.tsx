import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  EMAIL_INVALID_ERROR,
  EMAIL_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import { useMe } from "@/common/hooks/useMe";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { UpdateEmailDetails } from "@/services/user/types";
import { useUpdateEmail } from "../../hooks/useUpdateEmail";

const schema = yup.object().shape({
  email: yup.string().required(EMAIL_REQUIRED_ERROR).email(EMAIL_INVALID_ERROR),
});

const UpdateEmail: React.FC = () => {
  const { data: me } = useMe();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateEmailDetails>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: me?.email,
    },
  });

  const { mutateAsync: updateEmail, isLoading: isUpdatingEmail } =
    useUpdateEmail();

  const onSubmit = (values: UpdateEmailDetails) => {
    updateEmail({ email: values.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseFlex flexDirection="column" gap="1rem">
        <BaseFormControl isInvalid={Boolean(errors.email)}>
          <BaseFormLabel>Email</BaseFormLabel>
          <BaseInput
            type="email"
            variant="filled"
            placeholder="Enter email"
            {...register("email")}
          />
          <BaseFormErrorMessage>{errors.email?.message}</BaseFormErrorMessage>
        </BaseFormControl>

        <BaseButton type="submit" isLoading={isUpdatingEmail}>
          Update
        </BaseButton>
      </BaseFlex>
    </form>
  );
};

export default UpdateEmail;