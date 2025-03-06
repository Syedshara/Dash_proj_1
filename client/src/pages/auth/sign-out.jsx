import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function SignOut() {
    console.log("clicked")
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove("user_token");
        navigate("/signin");
    }, [navigate]);

    return null;
}

export default SignOut;
