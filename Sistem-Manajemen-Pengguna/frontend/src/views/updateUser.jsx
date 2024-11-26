import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUserPage({ url }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser(url) {
      try {
        const { data } = await axios.get(`${url}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const user = data.user;
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setRole(user);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [id, url]);

  async function updateUser(e) {
    e.preventDefault();
    try {
      await axios.put(
        `${url}/users/${id}`,
        { name, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="min-h-screen w-full bg-slate-100">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Update User
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={updateUser}>
              <div>
                <label
                  for="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    placeholder="John Doe"
                    required=""
                    className="input input-bordered w-full border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm/6"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    required=""
                    className="input input-bordered w-full border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm/6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  className="btn btn-outline btn-accent justify-center flex w-full"
                  type="submit"
                >
                  Update Data
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
