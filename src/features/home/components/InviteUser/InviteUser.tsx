import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { useInviteUser } from "../../hooks/useInviteUser";
import { useInvitedUsersByMe } from "../../hooks/useInvitedUsersByMe";
import {
  EMAIL_INVALID_ERROR,
  EMAIL_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseText from "@/common/components/BaseText/BaseText";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";

interface InviteUserInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_INVALID_ERROR).required(EMAIL_REQUIRED_ERROR),
});

const InviteUser: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<InviteUserInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { isLoading: isInvitingUser, mutateAsync: inviteUser } =
    useInviteUser();

  const { isLoading: isGettingInvitedUsers, data: invitedUsers } =
    useInvitedUsersByMe();

  const onSubmit = (values: InviteUserInputs) => {
    inviteUser(values).finally(() => reset());
  };

  return (
    <BaseSection>
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

          <BaseButton isLoading={isInvitingUser} type="submit">
            Invite
          </BaseButton>
        </BaseFlex>
      </form>

      <BaseFlex marginTop="2rem" direction="column" gap="1rem">
        <BaseText>Invited users:</BaseText>

        {isGettingInvitedUsers ? (
          <BaseSpinner />
        ) : invitedUsers?.length ? (
          <BaseFlex direction="column" gap="0.5rem">
            {invitedUsers?.map((user) => (
              <BaseText>{user.email}</BaseText>
            ))}
          </BaseFlex>
        ) : (
          <BaseText>No invited users yet</BaseText>
        )}
      </BaseFlex>
    </BaseSection>
  );
};

export default InviteUser;
