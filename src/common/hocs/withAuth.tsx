import { ComponentType, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { RouteEnum } from "../models/RouteEnum";
import { useMe } from "../hooks/useMe";

function withAuth<T extends {}>(Component: ComponentType<T>) {
  return (props: T) => {
    const [isAccessed, setIsAccessed] = useState(false);

    const { refetch: getMe, data: user } = useMe();

    const navigate = useNavigate();

    useEffect(() => {
      if (user === undefined) {
        getMe();
      }

      if (user) {
        setIsAccessed(true);
      } else if (user === null) {
        navigate(RouteEnum.SIGN_IN);
      }
    }, [user, navigate, getMe]);

    return !isAccessed ? <Loading /> : <Component {...props} />;
  };
}

export default withAuth;
