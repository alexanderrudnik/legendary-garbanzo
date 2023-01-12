import React from "react";
import * as yup from "yup";
import { useCreateWorkspace } from "../../hooks/useCreateWorkspace";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  WEBSITE_REQUIRED_ERROR,
  WORKSPACE_REQUIRED_ERROR,
} from "@/app/messages/errors";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";

interface WorkspaceInputs {
  workspace: string;
  website: string;
}

const schema = yup.object().shape({
  workspace: yup.string().required(WORKSPACE_REQUIRED_ERROR),
  website: yup.string().required(WEBSITE_REQUIRED_ERROR),
});

interface Props {
  cb?: () => void;
}

const CreateWorkspaceModal: React.FC<Props> = ({ cb }) => {
  const { mutateAsync: createWorkspace, isLoading: isCreatingWorkspace } =
    useCreateWorkspace();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<WorkspaceInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (values: WorkspaceInputs) => {
    createWorkspace(values).then(() => {
      if (cb) {
        cb();
      }
    });
  };

  return (
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

        <BaseFormControl isInvalid={Boolean(errors.website)}>
          <BaseFormLabel>Website</BaseFormLabel>
          <BaseInput
            variant="filled"
            placeholder="Enter your website"
            {...register("website")}
          />
          <BaseFormErrorMessage>{errors.website?.message}</BaseFormErrorMessage>
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
  );
};

export default CreateWorkspaceModal;
