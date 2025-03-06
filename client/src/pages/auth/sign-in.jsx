import { useEffect, useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const token = Cookies.get("user_token");
    if (token) {
      navigate("/dashboard/home");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("https://zohfy.in/wabot/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.error === "0") {
        const encryptedToken = CryptoJS.AES.encrypt(data.token, username).toString();
        Cookies.set("user_token", encryptedToken, { expires: 7, secure: true });
        setSuccessMessage("User logged in successfully");
        setTimeout(() => {
          navigate("/dashboard/home");
        }, 500)

      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="flex h-screen justify-center items-center px-8 bg-gray-50 bg-opacity-50">
      <div className="flex w-full lg:w-4/5 h-[80vh] shadow-2xl rounded-3xl overflow-hidden">
        <div className="w-1/2 h-full bg-white flex flex-col justify-center items-center rounded-l-3xl">
          <div className="text-center px-8">
            <Typography variant="h2" className="font-bold mb-4 text-blue-gray-700">
              Sign In
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal text-blue-gray-800">
              Enter your username and password to Sign In.
            </Typography>
          </div>
          <form className="mt-8 w-80 " onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6 ">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Your username
              </Typography>
              <Input
                size="lg"
                placeholder="username"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 "
                labelProps={{ className: "before:content-none after:content-none" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            {succesMessage && <p className="text-green-500 text-sm">{succesMessage}</p>}
            <Button className="mt-6 bg-blue-gray-900" fullWidth type="submit">
              Sign In
            </Button>


          </form>
        </div>

        <div className="w-1/2 h-full hidden lg:block">
          <img
            src="https://i.pinimg.com/1200x/11/56/b9/1156b9303d28a652a36dc1e6a40e4edc.jpg"
            className="h-full w-full object-cover rounded-r-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default SignIn;