import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FIRST_NAME_REQUIRED_ERROR,
  LAST_NAME_REQUIRED_ERROR,
  TELEGRAM_AT_ERROR,
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
import { CheckIcon } from "@chakra-ui/icons";
import { TELEGRAM_AT_REGEX } from "@/common/regex/regex";
import BaseInputGroup from "@/common/components/BaseInputGroup/BaseInputGroup";
import BaseInputLeftAddon from "@/common/components/BaseInputLeftAddon/BaseInputLeftAddon";

const schema = yup.object().shape({
  firstName: yup.string().required(FIRST_NAME_REQUIRED_ERROR),
  lastName: yup.string().required(LAST_NAME_REQUIRED_ERROR),
  telegram: yup
    .string()
    .matches(new RegExp(TELEGRAM_AT_REGEX), TELEGRAM_AT_ERROR),
});

const UpdatePersonalInfo: React.FC = () => {
  const { data: me } = useMe();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdatePersonalInfoDetails>({
    resolver: yupResolver(schema),
    mode: "onTouched",
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
          <BaseInputGroup>
            <BaseInputLeftAddon pointerEvents="none">t.me/</BaseInputLeftAddon>
            <BaseInput
              borderLeftRadius="none"
              variant="filled"
              placeholder="Enter telegram"
              {...register("telegram")}
            />
          </BaseInputGroup>
          <BaseFormErrorMessage>
            {errors.telegram?.message}
          </BaseFormErrorMessage>
        </BaseFormControl>
      </BaseFlex>

      <BaseButton
        leftIcon={<CheckIcon />}
        marginTop="2.5rem"
        isLoading={isUpdatingPersonalInfo}
        type="submit"
      >
        Update
      </BaseButton>
    </form>
  );
};

export default UpdatePersonalInfo;
