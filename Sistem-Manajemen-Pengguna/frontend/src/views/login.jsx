import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/login`, { email, password });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleEmail(value) {
    setEmail(value);
  }

  function handlePassword(value) {
    setPassword(value);
  }
  return (
    <>
      <div className="min-h-screen w-full bg-slate-100">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={login}>
              <div>
                <label
                  for="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    required=""
                    className="input input-bordered w-full border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm/6"
                    onChange={(e) => handleEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required=""
                    className="input input-bordered w-full border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm/6"
                    onChange={(e) => handlePassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  className="btn btn-outline btn-accent justify-center flex w-full"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
