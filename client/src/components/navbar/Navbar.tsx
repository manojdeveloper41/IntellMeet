export default function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
   <header
  className="
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
  shadow-xl
"
>

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
  "
/>
      </div>

      <div className="flex items-center gap-4">
        <button
  className="
  px-4
  py-2
  rounded-xl
  bg-gradient-to-r
  from-cyan-500
  to-blue-600
  text-white
  font-medium
  shadow-lg
"
>
  ⚡ AI Assistant
</button>

        <div className="text-right">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-xs text-slate-500">
            {user?.email}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center">
          {user?.name?.charAt(0)}
        </div>

      </div>

    </header>
  );
}