import { ComponentType, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { auth } from "@/app/firebase/firebaseConfig";
import { RouteEnum } from "../models/RouteEnum";

function withAuth<T extends {}>(Component: ComponentType<T>) {
  return (props: T) => {
    const [isAccessed, setIsAccessed] = useState(false);

    const [user, isLoading] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
      if (user) {
        setIsAccessed(true);
      } else if (!isLoading && !user) {
        navigate(RouteEnum.LOGIN);
      }
    }, [user, isLoading, navigate]);

    return !isAccessed ? <Loading /> : <Component {...props} />;
  };
}

export default withAuth;
