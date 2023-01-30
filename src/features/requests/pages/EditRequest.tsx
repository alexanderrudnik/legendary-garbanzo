import BaseBox from "@/common/components/BaseBox/BaseBox";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseText from "@/common/components/BaseText/BaseText";
import { useMe } from "@/common/hooks/useMe";
import { IRequest } from "@/services/request/types";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CreateRequest from "../components/CreateRequest/CreateRequest";
import { useRequests } from "../hooks/useRequests";
import { RequestInputs } from "../models/RequestInputs";

const EditRequest: React.FC = () => {
  const { data: requests, isLoading } = useRequests();

  const { data: me } = useMe();

  const [currentRequest, setCurrentRequest] = useState<IRequest | undefined>(
    undefined
  );

  const params = useParams();

  useEffect(() => {
    if (requests) {
      setCurrentRequest(requests.find((request) => request.id === params.id));
    }
  }, [params.id, requests]);

  const isMy = useMemo(
    () => currentRequest?.owner === me?.id,
    [me, currentRequest]
  );

  const handleSubmit = (values: RequestInputs) => {};

  return (
    <BaseSection>
      {isLoading ? (
        <BaseCenter>
          <BaseSpinner />
        </BaseCenter>
      ) : isMy ? (
        <BaseBox maxWidth="600px" margin="0 auto">
          <CreateRequest
            isLoading={false}
            onSubmit={handleSubmit}
            values={currentRequest}
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

export default EditRequest;
