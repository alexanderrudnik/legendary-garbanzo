import React, { useEffect } from "react";
import * as yup from "yup";
import { useCreateWorkspace } from "../../hooks/useCreateWorkspace";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WORKSPACE_REQUIRED_ERROR } from "@/app/messages/errors";
import { useMe } from "@/common/hooks/useMe";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";

interface WorkspaceInputs {
  workspace: string;
  website?: string;
}

const schema = yup.object().shape({
  workspace: yup.string().required(WORKSPACE_REQUIRED_ERROR),
});

const CreateWorkspaceModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useBaseDisclosure();

  const { mutateAsync: createWorkspace, isLoading: isCreatingWorkspace } =
    useCreateWorkspace();

  const { data: user } = useMe();

  useEffect(() => {
    if (!user?.workspace) {
      onOpen();
    }
  }, [user?.workspace, onOpen]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<WorkspaceInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (values: WorkspaceInputs) => {
    createWorkspace(values).then(() => onClose());
  };

  return (
    <BaseModal
      close={false}
      header="Let us know more about you"
      isOpen={isOpen}
      onClose={user?.workspace ? onClose : () => {}}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseFlex gap="1rem" direction="column">
          <BaseFormControl isInvalid={Boolean(errors.workspace)}>
            <BaseFormLabel>Workspace</BaseFormLabel>
            <BaseInput
              variant="filled"
              placeholder="Enter your workspace"
              {...register("workspace")}
            />
            <BaseFormErrorMessage>
              {errors.workspace?.message}
            </BaseFormErrorMessage>
          </BaseFormControl>

          <BaseFormControl>
            <BaseFormLabel>Website</BaseFormLabel>
            <BaseInput
              variant="filled"
              placeholder="Enter your website"
              {...register("website")}
            />
          </BaseFormControl>

          <BaseButton
            isLoading={isCreatingWorkspace}
            variant="solid"
            type="submit"
          >
            Submit
          </BaseButton>
        </BaseFlex>
      </form>
    </BaseModal>
  );
};

export default CreateWorkspaceModal;
