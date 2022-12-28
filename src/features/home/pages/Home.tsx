import React from "react";
import BaseButton from "@/common/components/BaseButton/BaseButton";
import withAuth from "@/common/hocs/withAuth";
import { authService } from "@/services/auth/authService";

const Home: React.FC = () => {
  const signOut = () => {
    authService.signOut();
  };

  return <BaseButton onClick={signOut}>Sign out</BaseButton>;
};

export default withAuth(Home);
