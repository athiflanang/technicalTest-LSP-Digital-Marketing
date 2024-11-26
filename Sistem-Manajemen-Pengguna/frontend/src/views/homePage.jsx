import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage({ url }) {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  async function fetchAllUser() {
    try {
      const { data } = await axios.get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setAllUsers(data.users);
      console.log(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`${url}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchAllUser();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-slate-100">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((data) => (
                <tr className="hover:bg-slate-200">
                  <th>{data?.id}</th>
                  <td>{data?.name}</td>
                  <td>{data?.email}</td>
                  <td>{data?.role}</td>
                  <td>
                    <button
                      className="btn btn-outline btn-error btn-xs mx-4"
                      onClick={() => deleteUser(data?.id)}
                    >
                      delete
                    </button>
                    <button
                      className="btn btn-outline btn-secondary btn-xs mx-4"
                      onClick={() => navigate(`/updateUser/${data?.id}`)}
                    >
                      update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="items-center justify-center flex mt-10">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/addUser")}
          >
            Add User
          </button>
        </div>
      </div>
    </>
  );
}
