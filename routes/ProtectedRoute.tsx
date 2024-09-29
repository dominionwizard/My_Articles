import { useContext } from "react";
import { UserContext } from "../context";
import { Outlet , Navigate} from "react-router-dom";
import { OutputFileType } from "typescript";

export const ProtectedRoute =() =>{
    const [state] = useContext(UserContext);

    if(state.loading) return  <div>Please wait...</div>

    return state.data ? <Outlet/>: <Navigate to={"/"} />;
}