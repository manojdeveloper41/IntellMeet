import {
  LayoutDashboard,
  Calendar,
  Video,
  Settings,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/authService";




export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <aside
      className="
      w-72
      m-4
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      text-white
      flex
      flex-col
      shadow-2xl
    "
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-r
            from-cyan-400
            to-blue-600
            flex
            items-center
            justify-center
            font-bold
            text-lg
          "
          >
            I
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              IntellMeet
            </h1>

            <p className="text-xs text-slate-400">
              AI Collaboration Platform
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          <li>
            <Link
              to="/dashboard"
              className="
              flex
              items-center
              gap-3
              p-3
              rounded-2xl
              hover:bg-white/10
              transition-all
              duration-300
              hover:translate-x-1
            "
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/meetings"
              className="
              flex
              items-center
              gap-3
              p-3
              rounded-2xl
              hover:bg-white/10
              transition-all
              duration-300
              hover:translate-x-1
            "
            >
              <Calendar size={20} />
              Meetings
            </Link>
          </li>

          <li>
            <Link
              to="/create-meeting"
              className="
              flex
              items-center
              gap-3
              p-3
              rounded-2xl
              hover:bg-white/10
              transition-all
              duration-300
              hover:translate-x-1
            "
            >
              <Video size={20} />
              Create Meeting
            </Link>
          </li>
          <li>
  <Link
    to="/profile"
    className="
    flex
    items-center
    gap-3
    p-3
    rounded-2xl
    hover:bg-white/10
    transition-all
    duration-300
    hover:translate-x-1
    "
  >
    <User size={20} />
    Profile
  </Link>
</li>

          <li>
            <Link
              to="/settings"
              className="
              flex
              items-center
              gap-3
              p-3
              rounded-2xl
              hover:bg-white/10
              transition-all
              duration-300
              hover:translate-x-1
            "
            >
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="
            w-full
            rounded-2xl
            bg-red-500/20
            text-red-300
            p-3
            hover:bg-red-500/30
            transition
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
}