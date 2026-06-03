import DashboardLayout from "@/layouts/DashboardLayout";

export default function Meetings() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Meetings
      </h1>

      <p className="mt-3 text-slate-500">
        All scheduled meetings will appear here.
      </p>
    </DashboardLayout>
  );
}