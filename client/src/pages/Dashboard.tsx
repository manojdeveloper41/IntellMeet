export default function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-xl border p-8 shadow">
        <h1 className="text-3xl font-bold">
          Welcome to IntellMeet
        </h1>

        <p className="mt-4">
          Name: {user?.name}
        </p>

        <p>
          Email: {user?.email}
        </p>
      </div>
    </div>
  );
}