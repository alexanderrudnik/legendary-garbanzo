import { ComponentType, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { auth } from "@/app/firebase/firebaseConfig";
import { RouteEnum } from "../models/RouteEnum";
import { useMe } from "../hooks/useMe";

function withAuth<T extends {}>(Component: ComponentType<T>) {
  return (props: T) => {
    const [isAccessed, setIsAccessed] = useState(false);

    const [user, isLoading] = useAuthState(auth);

    const { refetch: getMe, data } = useMe();

    const navigate = useNavigate();

    useEffect(() => {
      if (user) {
        if (!data) {
          getMe();
        } else {
          setIsAccessed(true);
        }
      } else if (!isLoading && !user) {
        navigate(RouteEnum.SIGN_IN);
      }
    }, [user, isLoading, navigate, data, getMe]);

    return !isAccessed ? <Loading /> : <Component {...props} />;
  };
}

export default withAuth;
