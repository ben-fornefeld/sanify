import authApi from "@/api/authApi";
import { firebaseAuth } from "@/api/firebase";
import { changeAuthState, signOut } from "@/app/features/auth/authActions";
import useAppDispatch from "@/app/hooks/useAppDispatch";
import { DEFAULT_TIMEOUT } from "@/config/constants";
import { FunctionComponent, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { useEffectOnce } from "usehooks-ts";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  //TODO: refactor into redux StartAppMiddleware

  useEffect(() => {
    if (!dispatch) return;

    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      try {
        const userModel = user ? await authApi.fetchAppUser(user) : null;

        await DEFAULT_TIMEOUT();

        dispatch(changeAuthState(userModel));
      } catch (e) {
        firebaseAuth.currentUser && dispatch(signOut());
        toast.error("Account invalid");
      }
    });

    () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthWrapper;
