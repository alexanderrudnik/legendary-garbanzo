import { auth, db } from "@/app/firebase/firebaseConfig";
import { errorMapper } from "@/common/errorMapper/errorMapper";
import { FirestoreEnum } from "@/common/models/FirestoreEnum";
import { authService } from "@/services/auth/authService";
import { SignUpDetails } from "@/services/auth/types";
import { notificationService } from "@/services/notification/notificationService";
import { User } from "@/services/user/types";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";

const signup = async (details: SignUpDetails) => {
  try {
    const response = await authService.signUp(details);

    const dbRef = doc(db, FirestoreEnum.USERS, response.user.uid);

    const data: User = {
      ...(({ password, ...o }) => o)(details),
      uid: response.user.uid,
    }; // removes password from details and adds uid from response

    await setDoc(dbRef, data);

    await sendEmailVerification(response.user);

    await auth.signOut();

    return response.user;
  } catch (error) {
    throw error;
  }
};

export const useSignUp = () => {
  return useMutation(signup, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
