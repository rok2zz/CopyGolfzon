import { useSelector } from "react-redux";
import { RootState } from "../slices";

export default function useToken() {
    return useSelector((state: RootState) => state.auth.token)
}