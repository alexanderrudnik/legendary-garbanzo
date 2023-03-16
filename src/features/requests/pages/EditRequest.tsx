import BaseBox from "@/common/components/BaseBox/BaseBox";
import BaseCenter from "@/common/components/BaseCenter/BaseCenter";
import BaseSection from "@/common/components/BaseSection/BaseSection";
import BaseSpinner from "@/common/components/BaseSpinner/BaseSpinner";
import BaseText from "@/common/components/BaseText/BaseText";
import { useMe } from "@/common/hooks/useMe";
import { RouteEnum } from "@/common/models/RouteEnum";
import { IRequest } from "@/services/request/types";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateRequest from "../components/CreateRequest/CreateRequest";
import { useEditRequest } from "../hooks/useEditRequest";
import { useRequests } from "../hooks/useRequests";
import { RequestInputs } from "../models/RequestInputs";

const EditRequest: React.FC = () => {
  const { data: requests, isLoading: isLoadingRequests } = useRequests();

  const { data: me } = useMe();

  const [currentRequest, setCurrentRequest] = useState<IRequest | undefined>(
    undefined
  );

  const navigate = useNavigate();

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

  const { isLoading: isEditingRequest, mutateAsync: editRequest } =
    useEditRequest();

  const handleSubmit = (values: RequestInputs) => {
    editRequest({ details: values, id: params.id || "0" }).then(() =>
      navigate(RouteEnum.REQUESTS)
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <BaseSection>
      {isLoadingRequests ? (
        <BaseCenter>
          <BaseSpinner />
        </BaseCenter>
      ) : isMy ? (
        <BaseBox maxWidth="600px" margin="0 auto">
          <CreateRequest
            isLoading={isEditingRequest}
            onSubmit={handleSubmit}
            values={currentRequest}
            onCancel={handleCancel}
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
