import BaseButton from "@/common/components/BaseButton/BaseButton";
import BaseInput from "@/common/components/BaseInput/BaseInput";
import BaseModal from "@/common/components/BaseModal/BaseModal";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseTagInput from "@/common/components/BaseTagInput/BaseTagInput";
import useBaseDisclosure from "@/common/hooks/useBaseDisclosure";
import React, { useState } from "react";
import CreateRequest from "../components/CreateRequest/CreateRequest";

const Requests: React.FC = () => {
  const { isOpen, onClose, onOpen } = useBaseDisclosure();

  const [value, setValue] = useState<string[]>([]);

  return (
    <>
      <BaseSection>
        <BaseButton width="100%" onClick={onOpen}>
          Add new request
        </BaseButton>

        <BaseTagInput
          placeholder="test"
          variant="filled"
          value={value}
          onChange={setValue}
        />

        <BaseInput placeholder="test" variant="filled" />

        <BaseModal header="Create request" isOpen={isOpen} onClose={onClose}>
          <CreateRequest />
        </BaseModal>
      </BaseSection>

      <BaseSection>list</BaseSection>
    </>
  );
};

export default Requests;
