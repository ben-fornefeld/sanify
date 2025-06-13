import { AccountState } from "@/app/features/account/accountSlice";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const useAccountSelector = () =>
  useSelector<RootState, AccountState>((state) => state.account);

export default useAccountSelector;
