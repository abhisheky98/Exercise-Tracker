import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error(' AuthContext context must be usd inside an authcontext provider')
    }

    return context
}