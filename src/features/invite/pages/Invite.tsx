import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import {
  EMAIL_INVALID_ERROR,
  EMAIL_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormHelperText from "@/common/components/BaseFormHelperText/BaseFormHelperText";
import { useAllInvitedUsers } from "@/features/invite/hooks/useAllInvitedUsers";
import { useMe } from "@/common/hooks/useMe";
import { useInviteUser } from "../hooks/useInviteUser";
import { InviteUserDetails } from "@/services/user/types";
import { EmailIcon } from "@chakra-ui/icons";

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_INVALID_ERROR).required(EMAIL_REQUIRED_ERROR),
});

const Invite: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<InviteUserDetails>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { isLoading: isInvitingUser, mutateAsync: inviteUser } =
    useInviteUser();

  const { data } = useAllInvitedUsers();

  const { data: me } = useMe();

  const invitedUsers = useMemo(
    () => (data || []).filter((item) => item.sender === me?.id),
    [data, me?.id]
  );

  const onSubmit = (values: InviteUserDetails) => {
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
              placeholder="alex@email.com"
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
        </BaseFlex>

        <BaseButton
          leftIcon={<EmailIcon />}
          marginTop="2.5rem"
          isLoading={isInvitingUser}
          type="submit"
        >
          Invite
        </BaseButton>
      </form>
    </BaseSection>
  );
};

export default Invite;
