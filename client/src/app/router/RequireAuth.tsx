import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore"

export default function RequireAuth(){
    const {user}=useAppSelector(state=>state.account);
    const location=useLocation();

    if(!user)
    {
        return <Navigate to='/login' state={{from:location}} />
        //u state se cuva lokacija kojoj se zahtjevao pristup ali nije odobren u momentu
        //da bi se moglo vratiti na nju kad se uloguje
    }

    return <Outlet />


}