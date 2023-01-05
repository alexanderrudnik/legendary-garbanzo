import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseContainer from "@/common/components/BaseContainer/BaseContainer";
import Header from "./components/Header/Header";
import withAuth from "@/common/hocs/withAuth";
import { useMe } from "@/common/hooks/useMe";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import { WORKSPACE_REQUIRED_ERROR } from "@/app/messages/errors";
import BaseFlex from "@/common/components/BaseFlex/BaseFlex";
import BaseFormControl from "@/common/components/BaseFormControl/BaseFormControl";
import BaseFormLabel from "@/common/components/BaseFormLabel/BaseFormLabel";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseFormErrorMessage from "@/common/components/BaseFormErrorMessage/BaseFormErrorMessage";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import { useCreateWorkspace } from "@/features/workspace/hooks/useCreateWorkspace";

interface WorkspaceInputs {
  workspace: string;
  website?: string;
}

const schema = yup.object().shape({
  workspace: yup.string().required(WORKSPACE_REQUIRED_ERROR),
});

const MainLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useBaseDisclosure();

  const { data: user } = useMe();

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
    createWorkspace(values).then(() => onClose());
  };

  useEffect(() => {
    if (!user?.workspace) {
      onOpen();
    }
  }, [user?.workspace, onOpen]);

  return (
    <>
      <Header />
      <main>
        <BaseContainer>
          <Outlet />
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
        </BaseContainer>
      </main>
    </>
  );
};

export default withAuth(MainLayout);
