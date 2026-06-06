import DashboardLayout from "@/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import {
User,
Camera,
Shield,
Activity,
Users,
Calendar,
} from "lucide-react";

export default function Profile() {
const storedUser = JSON.parse(
localStorage.getItem("user") || "{}"
);

const [avatar, setAvatar] = useState("");

const [name, setName] = useState(
storedUser?.name || ""
);

const [phone, setPhone] = useState(
storedUser?.phone || ""
);

const [department, setDepartment] = useState(
storedUser?.department || ""
);

const [bio, setBio] = useState(
storedUser?.bio || ""
);

const [currentPassword, setCurrentPassword] =
useState("");

const [newPassword, setNewPassword] =
useState("");

const [confirmPassword, setConfirmPassword] =
useState("");

const handleImage = (
e: React.ChangeEvent<HTMLInputElement>
) => {
const file = e.target.files?.[0];


if (file) {
  setAvatar(
    URL.createObjectURL(file)
  );

  toast.success(
    "Profile picture updated"
  );
}


};

const handleSave = () => {
const updatedUser = {
...storedUser,
name,
phone,
department,
bio,
};


localStorage.setItem(
  "user",
  JSON.stringify(updatedUser)
);

toast.success(
  "Profile updated successfully"
);


};

const handlePasswordUpdate = () => {
if (
!currentPassword ||
!newPassword ||
!confirmPassword
) {
toast.error(
"Fill all password fields"
);
return;
}


if (
  newPassword !== confirmPassword
) {
  toast.error(
    "Passwords do not match"
  );
  return;
}

toast.success(
  "Password ready for backend integration"
);

setCurrentPassword("");
setNewPassword("");
setConfirmPassword("");


};

return ( <DashboardLayout> <div className="max-w-7xl mx-auto">


    {/* Header */}
<div className="mb-8">
  <h1 className="text-5xl font-bold text-white">
    My Profile
  </h1>

  <p className="text-slate-400 mt-2">
    Manage your profile and account settings.
  </p>
</div>

{/* Profile Overview Card */}
<div
  className="
  rounded-3xl
  border border-white/10
  bg-white/5
  backdrop-blur-xl
  p-8
  shadow-2xl
  mb-8
  "
>
  <div className="flex flex-col lg:flex-row items-center gap-8">

    {/* Avatar */}
    <div className="relative">

      <div
        className="
        w-32
        h-32
        rounded-full
        overflow-hidden
        border-4
        border-cyan-500
        bg-slate-800
        "
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Profile"
            className="
            w-full
            h-full
            object-cover
            "
          />
        ) : (
          <div
            className="
            w-full
            h-full
            flex
            items-center
            justify-center
            "
          >
            <User
              size={60}
              className="text-white"
            />
          </div>
        )}
      </div>

      <label
        className="
        absolute
        bottom-1
        right-1
        w-10
        h-10
        rounded-full
        bg-cyan-500
        flex
        items-center
        justify-center
        cursor-pointer
        shadow-lg
        hover:bg-cyan-600
        transition
        "
      >
        <Camera size={18} />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="hidden"
        />
      </label>

    </div>

    {/* User Details */}
    <div className="flex-1">

      <h2 className="text-4xl font-bold text-white">
        {name || "User"}
      </h2>

      <p className="text-slate-400 mt-2">
        {storedUser?.email}
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <div
          className="
          rounded-2xl
          bg-white/5
          border border-white/10
          p-4
          "
        >
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span className="text-slate-400">
              Meetings
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mt-2">
            12
          </h3>
        </div>

        <div
          className="
          rounded-2xl
          bg-white/5
          border border-white/10
          p-4
          "
        >
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span className="text-slate-400">
              Teams
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mt-2">
            3
          </h3>
        </div>

        <div
          className="
          rounded-2xl
          bg-white/5
          border border-white/10
          p-4
          "
        >
          <div className="flex items-center gap-2">
            <Activity size={18} />
            <span className="text-slate-400">
              Activity
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mt-2">
            48h
          </h3>
        </div>

      </div>

    </div>

  </div>
</div>

    {/* Main Content */}
    <div className="grid lg:grid-cols-3 gap-8">

      {/* Personal Information */}
      <div
        className="
        lg:col-span-2
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
        shadow-2xl
        "
      >
        <h3 className="text-2xl font-bold text-white mb-6">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-slate-400 text-sm">
              Full Name
            </label>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm">
              Email
            </label>

            <Input
              value={storedUser?.email}
              disabled
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm">
              Phone
            </label>

            <Input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm">
              Department
            </label>

            <Input
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="mt-2"
            />
          </div>

        </div>

        <div className="mt-6">
          <label className="text-slate-400 text-sm">
            About Me
          </label>

          <Textarea
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            className="mt-2 min-h-32"
          />
        </div>

        <Button
          onClick={handleSave}
          className="
          mt-6
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          "
        >
          Save Changes
        </Button>
      </div>

      {/* Stats */}
      <div className="space-y-6">

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3">
            <Calendar />
            <span>Meetings</span>
          </div>

          <h4 className="text-4xl font-bold mt-4 text-white">
            12
          </h4>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3">
            <Users />
            <span>Teams</span>
          </div>

          <h4 className="text-4xl font-bold mt-4 text-white">
            3
          </h4>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3">
            <Activity />
            <span>Activity</span>
          </div>

          <h4 className="text-4xl font-bold mt-4 text-white">
            48h
          </h4>
        </div>

      </div>

    </div>

    {/* Security */}
    <div
      className="
      mt-8
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      shadow-2xl
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <Shield />
        <h3 className="text-2xl font-bold text-white">
          Security Settings
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <Input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

      </div>

      <Button
        onClick={handlePasswordUpdate}
        className="
        mt-6
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        "
      >
        Update Password
      </Button>
    </div>

    {/* Activity */}
    <div
      className="
      mt-8
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      shadow-2xl
      "
    >
      <h3 className="text-2xl font-bold text-white mb-6">
        Recent Activity
      </h3>

      <div className="space-y-4">

        <div className="border-l-2 border-cyan-500 pl-4">
          Created Weekly Team Meeting
        </div>

        <div className="border-l-2 border-cyan-500 pl-4">
          Updated Profile Information
        </div>

        <div className="border-l-2 border-cyan-500 pl-4">
          Logged into IntellMeet
        </div>

      </div>
    </div>

  </div>
</DashboardLayout>


);
}
