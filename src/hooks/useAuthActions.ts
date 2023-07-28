import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { access, authorize, getInfo, logout } from "../slices/auth";
import { useMemo } from "react";

export default function useAuthActions() {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators({ authorize, access, getInfo, logout }, dispatch), [ dispatch ]) 
}