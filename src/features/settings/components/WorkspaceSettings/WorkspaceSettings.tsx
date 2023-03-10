import React, { useEffect } from "react";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";
import {
  WEBSITE_REQUIRED_ERROR,
  WORKSPACE_REQUIRED_ERROR,
} from "@/app/messages/errors";
import { UpdateWorkspaceDetails } from "@/services/workspace/types";
import { useUpdateWorkspace } from "../../hooks/useUpdateWorkspace";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { CheckIcon } from "@chakra-ui/icons";

const schema = yup.object().shape({
  name: yup.string().required(WORKSPACE_REQUIRED_ERROR),
  website: yup.string().required(WEBSITE_REQUIRED_ERROR),
});

const WorkspaceSettings: React.FC = () => {
  const { data: workspace } = useWorkspace();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<UpdateWorkspaceDetails>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: workspace?.name,
      website: workspace?.website,
    },
  });

  useEffect(() => {
    if (workspace) {
      setValue("name", workspace.name);
      setValue("website", workspace.website);
    }
  }, [workspace, setValue]);

  const { mutateAsync: updateWorkspace, isLoading: isUpdatingWorkspace } =
    useUpdateWorkspace();

  const onSubmit = (values: UpdateWorkspaceDetails) => {
    updateWorkspace(values);
  };

  return (
    <BaseSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseFlex flexDirection="column" gap="1rem">
          <BaseFormControl isInvalid={Boolean(errors.name)}>
            <BaseFormLabel>Workspace</BaseFormLabel>
            <BaseInput
              variant="filled"
              placeholder="Google"
              {...register("name")}
            />
            <BaseFormErrorMessage>{errors.name?.message}</BaseFormErrorMessage>
          </BaseFormControl>

          <BaseFormControl isInvalid={Boolean(errors.website)}>
            <BaseFormLabel>Website</BaseFormLabel>
            <BaseInput
              variant="filled"
              placeholder="https://google.com"
              {...register("website")}
            />
            <BaseFormErrorMessage>
              {errors.website?.message}
            </BaseFormErrorMessage>
          </BaseFormControl>
        </BaseFlex>

        <BaseButton
          leftIcon={<CheckIcon />}
          marginTop="2.5rem"
          type="submit"
          isLoading={isUpdatingWorkspace}
        >
          Update
        </BaseButton>
      </form>
    </BaseSection>
  );
};

export default WorkspaceSettings;
