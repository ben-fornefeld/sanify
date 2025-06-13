import { AuthState } from "@/app/features/auth/authSlice";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const useAuthSelector = () =>
  useSelector<RootState, AuthState>((state) => state.auth);

export default useAuthSelector;
