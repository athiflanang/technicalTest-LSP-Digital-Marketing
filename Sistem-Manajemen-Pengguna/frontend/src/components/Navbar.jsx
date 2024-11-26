import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function logoutAction() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className="navbar bg-teal-400">
      <div className="flex-1">
        <Link to="/">
          <a className="btn btn-ghost text-xl text-white">Admin Dashboard</a>
        </Link>
      </div>
      <div className="flex-none">
        <div
          className="btn btn-end btn-error text-white"
          onClick={logoutAction}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
