import DashboardLayout from "@/layouts/DashboardLayout";

export default function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <DashboardLayout>
      <div>

        <h1 className="text-4xl font-bold text-slate-300 ">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Manage meetings, teams, and collaboration from one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
shadow-xl
text-white
">
            <h3 className="text-slate-500">
              Total Meetings
            </h3>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
shadow-xl
text-white
">
            <h3 className="text-slate-500">
              Upcoming Meetings
            </h3>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
shadow-xl
text-white
">
            <h3 className="text-slate-500">
              Team Members
            </h3>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}