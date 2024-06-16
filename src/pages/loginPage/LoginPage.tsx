import { useEffect, useState } from "react";
import { getAxiosRequestForTest, postAxiosRequestForLogin } from "../../utils/axios/axios.Api.Request";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorageForLogin,
  setLocalStorageForLogin,
} from "../../utils/localstorage/localStorage.Handler";

export default function Login() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  // Function to handle login request
  const loginHandler = async (user: string, password: string) => {
    try {
      // Send login request and get the result
      const isLogin = await loginRequestHandler(user, password);

      // If login successful, set local storage and navigate to dashboard
      if (isLogin) {
        setLocalStorageForLogin();
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  // Check if user is already logged in, if yes, navigate to dashboard
  useEffect(() => {
    const isAlreadyLoggedIn = getLocalStorageForLogin();
    if (isAlreadyLoggedIn) navigate("/dashboard");
    return;
  }, []);

  //for testing
  useEffect(()=>{
    Test();
  },[])

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto rounded-full"
            src="https://via.placeholder.com/150"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e: any) => setUser(e.target.value)}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  onChange={(e: any) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  loginHandler(user, password);
                }}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// Function to handle login request
const loginRequestHandler = async (user: string, password: string) => {
  // Check if user or password is empty
  if (user.length === 0 && password.length === 0)
    return await Promise.reject(false); // Return the rejected Promise

  try {
    // Send login request to the server
    const isLogin: Record<string, any> = await postAxiosRequestForLogin(
      process.env.REACT_APP_LOGIN_URL as string,
      {
        user: user,
        password: password,
      }
    );

    // If login is successful, resolve the Promise with true
    if (isLogin?.is_success) return await Promise.resolve(true);

    // If login failed, throw an error
    throw new Error();

    // Note: Code after throw statement will not be executed
    console.log(isLogin);
  } catch (error) {
    console.error("Login failed:", error);
    // If login failed, reject the Promise with false
    return await Promise.reject(false);
    // Handle the error, such as displaying an error message to the user
  }
};


async function Test()
{
  const res = await getAxiosRequestForTest(process.env.REACT_APP_BASE_API_URL as string);
  console.log(res);
}