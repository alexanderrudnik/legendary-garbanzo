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
import { useInviteUser } from "../../home/hooks/useInviteUser";
import { useInvitedUsersByMe } from "../../home/hooks/useInvitedUsersByMe";
import {
  EMAIL_INVALID_ERROR,
  EMAIL_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormHelperText from "@/common/components/BaseFormHelperText/BaseFormHelperText";

interface InviteInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_INVALID_ERROR).required(EMAIL_REQUIRED_ERROR),
});

const Invite: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<InviteInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { isLoading: isInvitingUser, mutateAsync: inviteUser } =
    useInviteUser();

  const { data: invitedUsers } = useInvitedUsersByMe();

  const onSubmit = (values: InviteInputs) => {
    inviteUser(values).finally(() => reset());
  };

  return (
    <BaseSection padding="2rem 0">
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
            {invitedUsers && (
              <BaseFormHelperText>
                You've invited {invitedUsers.length} user
                {invitedUsers.length > 1 || invitedUsers.length === 0
                  ? "s"
                  : ""}
                .
              </BaseFormHelperText>
            )}
            <BaseFormErrorMessage>{errors.email?.message}</BaseFormErrorMessage>
          </BaseFormControl>

          <BaseButton isLoading={isInvitingUser} type="submit">
            Invite
          </BaseButton>
        </BaseFlex>
      </form>
    </BaseSection>
  );
};

export default Invite;
