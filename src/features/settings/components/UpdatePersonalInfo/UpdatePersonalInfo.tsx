import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FIRST_NAME_REQUIRED_ERROR,
  LAST_NAME_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import { useMe } from "@/common/hooks/useMe";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { UpdatePersonalInfoDetails } from "@/services/user/types";
import { useUpdatePersonalInfo } from "../../hooks/useUpdatePersonalInfo";

const schema = yup.object().shape({
  firstName: yup.string().required(FIRST_NAME_REQUIRED_ERROR),
  lastName: yup.string().required(LAST_NAME_REQUIRED_ERROR),
});

const UpdatePersonalInfo: React.FC = () => {
  const { data: me } = useMe();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdatePersonalInfoDetails>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      firstName: me?.firstName,
      lastName: me?.lastName,
      telegram: me?.telegram,
    },
  });

  const { mutateAsync: updatePersonalInfo, isLoading: isUpdatingPersonalInfo } =
    useUpdatePersonalInfo();

  const onSubmit = (values: UpdatePersonalInfoDetails) => {
    updatePersonalInfo(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseFlex flexDirection="column" gap="1rem">
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

        <BaseFormControl isInvalid={Boolean(errors.telegram)}>
          <BaseFormLabel>Telegram</BaseFormLabel>
          <BaseInput
            variant="filled"
            placeholder="Enter telegram"
            {...register("telegram")}
          />
          <BaseFormErrorMessage>
            {errors.telegram?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>

        <BaseButton isLoading={isUpdatingPersonalInfo} type="submit">
          Update
        </BaseButton>
      </BaseFlex>
    </form>
  );
};

export default UpdatePersonalInfo;
