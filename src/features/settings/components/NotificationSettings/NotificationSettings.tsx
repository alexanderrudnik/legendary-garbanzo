import React from "react";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { CheckIcon } from "@chakra-ui/icons";
import { useMe } from "@/common/hooks/useMe";
import { useToggleMailing } from "../../hooks/useToggleMailing";
import BaseCheckbox from "@/common/components/BaseCheckbox/BaseCheckbox";

const schema = yup.object().shape({});

const NotificationSettings: React.FC = () => {
  const { data: me } = useMe();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ isMailingEnabled: boolean }>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      isMailingEnabled: me?.isMailingEnabled,
    },
  });

  const { mutateAsync: toggleMailing, isLoading: isTogglingMailing } =
    useToggleMailing();

  const onSubmit = (values: { isMailingEnabled: boolean }) => {
    toggleMailing(values.isMailingEnabled);
  };

  return (
    <BaseSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseFlex flexDirection="column" gap="1rem">
          <BaseFormControl isInvalid={Boolean(errors.isMailingEnabled)}>
            <BaseFormLabel>Mailing list</BaseFormLabel>
            <BaseCheckbox {...register("isMailingEnabled")}>
              Subscribe to mailing list
            </BaseCheckbox>
            <BaseFormErrorMessage>
              {errors.isMailingEnabled?.message}
            </BaseFormErrorMessage>
          </BaseFormControl>
        </BaseFlex>

        <BaseButton
          leftIcon={<CheckIcon />}
          marginTop="2.5rem"
          type="submit"
          isLoading={isTogglingMailing}
        >
          Update
        </BaseButton>
      </form>
    </BaseSection>
  );
};

export default NotificationSettings;
