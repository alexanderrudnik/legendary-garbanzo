import { ComponentType, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { RouteEnum } from "../models/RouteEnum";
import { useMe } from "../hooks/useMe";
import { useWorkspace } from "@/features/workspace/hooks/useWorkspace";

function withAuth<T extends {}>(Component: ComponentType<T>) {
  return (props: T) => {
    const [isAccessed, setIsAccessed] = useState(false);

    const { refetch: getMe, data: user } = useMe();

    const { refetch: getWorkspace, data: workspace } = useWorkspace();

    const navigate = useNavigate();

    useEffect(() => {
      if (user === undefined) {
        getMe();
      }

      if (user) {
        setIsAccessed(true);

        if (user.workspace && !workspace) {
          getWorkspace();
        }
      } else if (user === null) {
        navigate(RouteEnum.SIGN_IN);
      }
    }, [user, navigate, getMe, getWorkspace, workspace]);

    return !isAccessed ? <Loading /> : <Component {...props} />;
  };
}

export default withAuth;
