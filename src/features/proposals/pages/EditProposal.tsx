import BaseBox from "@/common/components/BaseBox/BaseBox";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseText from "@/common/components/BaseText/BaseText";
import { useMe } from "@/common/hooks/useMe";
import { Proposal } from "@/services/proposal/types";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CreateProposal from "../components/CreateProposal/CreateProposal";
import { useProposals } from "../hooks/useProposals";
import { ProposalsInputs } from "../models/ProposalInputs";

const EditProposal: React.FC = () => {
  const { data: proposals, isLoading } = useProposals();

  const { data: me } = useMe();

  const [currentProposal, setCurrentProposal] = useState<Proposal | undefined>(
    undefined
  );

  const params = useParams();

  useEffect(() => {
    if (proposals) {
      setCurrentProposal(
        proposals.find((proposal) => proposal.id === params.id)
      );
    }
  }, [params.id, proposals]);

  const isMy = useMemo(
    () => currentProposal?.owner === me?.id,
    [me, currentProposal]
  );

  const handleSubmit = (values: ProposalsInputs) => {};

  return (
    <BaseSection>
      {isLoading ? (
        <BaseCenter>
          <BaseSpinner />
        </BaseCenter>
      ) : isMy ? (
        <BaseBox maxWidth="600px" margin="0 auto">
          <CreateProposal
            isLoading={false}
            onSubmit={handleSubmit}
            values={currentProposal}
          />
        </BaseBox>
      ) : (
        <BaseCenter>
          <BaseText>You cannot edit this request!</BaseText>
        </BaseCenter>
      )}
    </BaseSection>
  );
};

export default EditProposal;
