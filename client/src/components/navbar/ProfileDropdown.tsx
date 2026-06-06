import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { logoutUser } from "@/services/authService";

export default function ProfileDropdown() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
  localStorage.clear();

  navigate("/login");

  window.location.reload();
};

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="
        w-10
        h-10
        rounded-full
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        flex
        items-center
        justify-center
        text-white
        font-bold
        "
      >
        {user?.name?.charAt(0) || "U"}
      </button>

      {open && (
        <div
          className="
          absolute
          right-0
          mt-3
          w-72
          rounded-3xl
          border
          border-white/10
          bg-slate-900
          shadow-2xl
          p-4
         z-[9999]
          "
        >
          <div className="border-b border-white/10 pb-4">

            <h3 className="font-bold text-white">
              {user?.name}
            </h3>

            <p className="text-sm text-slate-400">
              {user?.email}
            </p>

          </div>

          <div className="mt-3 space-y-2">

            <button
            onClick={() => navigate("/profile")}
              className="
              flex
              items-center
              gap-3
              w-full
              p-3
              rounded-xl
              hover:bg-white/5
              text-white
              "
            >
              <User size={18} />
              Profile
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="
              flex
              items-center
              gap-3
              w-full
              p-3
              rounded-xl
              hover:bg-white/5
              text-white
              "
            >
              <Settings size={18} />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="
              flex
              items-center
              gap-3
              w-full
              p-3
              rounded-xl
              hover:bg-red-500/20
              text-red-400
              "
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      )}
    </div>
  );
}