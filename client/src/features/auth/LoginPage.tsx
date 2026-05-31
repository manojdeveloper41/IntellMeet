import LoginForm from "./LoginForm";


export default function LoginPage() {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 text-white">
        {/* Background Effects */}
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-20">
          <span className="w-fit rounded-full border border-white/20 px-4 py-2 text-sm backdrop-blur">
            AI Collaboration Platform
          </span>

          <h1 className="mt-8 text-6xl font-extrabold">
            IntellMeet
          </h1>

          <p className="mt-4 text-2xl font-medium text-blue-100">
            Work Smarter. Meet Better.
          </p>

          <p className="mt-6 max-w-xl text-lg text-blue-100">
            Manage meetings, tasks, discussions and project workflows
            from one intelligent workspace powered by AI.
          </p>

          {/* Dashboard Preview */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">
                Today's Activity
              </span>

              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-200">
                Active
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-white/10 p-4">
                📅 Product Strategy Meeting
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                🤖 AI Summary Generated
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                ✅ 12 Tasks Completed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Floating Logo */}
      <div className="hidden xl:flex absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-full bg-white p-4 shadow-2xl">
          <img
           
            alt="IntellMeet"
            className="h-20 w-20 object-contain"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <LoginForm />
      </div>
    </div>
  );
}