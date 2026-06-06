import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <header
      className="
      sticky
      top-4
      z-[1000]
      h-20
      mx-4
      mt-4
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      flex
      items-center
      justify-between
      px-8
      shadow-2xl
      relative
      "
    >
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search meetings..."
          className="
          w-80
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-4
          py-3
          text-white
          placeholder:text-slate-400
          outline-none
          focus:border-cyan-500
          transition
          "
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button
          className="
          px-5
          py-2.5
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          text-white
          font-medium
          shadow-lg
          hover:scale-105
          transition-all
          duration-300
          "
        >
          ⚡ AI Assistant
        </button>

        <div className="text-right hidden md:block">
          <p className="font-semibold text-white">
            {user?.name || "User"}
          </p>

          <p className="text-xs text-slate-400">
            {user?.email || "No Email"}
          </p>
        </div>

        <ProfileDropdown />
      </div>
    </header>
  );
}