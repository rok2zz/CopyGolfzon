import { useSelector } from "react-redux";
import { RootState } from "../slices";

export default function useUserInfo() {
    return useSelector((state: RootState) => state.auth.userInfo)
}