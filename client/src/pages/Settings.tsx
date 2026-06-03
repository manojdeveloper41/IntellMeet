import DashboardLayout from "@/layouts/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <p className="mt-3 text-slate-500">
        User preferences and account settings.
      </p>
    </DashboardLayout>
  );
}