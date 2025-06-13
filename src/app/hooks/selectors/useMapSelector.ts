import { MapState } from "@/app/features/map/mapSlice";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const useMapSelector = () =>
  useSelector<RootState, MapState>((state) => state.map);

export default useMapSelector;
