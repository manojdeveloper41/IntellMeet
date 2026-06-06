import DashboardLayout from "@/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Users,
  Video,
} from "lucide-react";



export default function CreateMeeting() {
  
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");
const [duration, setDuration] = useState("");
const [participants, setParticipants] = useState("");
const handleCreateMeeting = () => {
  console.log({
    title,
    description,
    date,
    time,
    duration,
    participants,
  });

  toast.success("Meeting created successfully ");
  
};
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-white">
            Create Meeting
          </h1>

          <p className="mt-3 text-slate-400 text-lg">
            Schedule, organize and collaborate with your team effortlessly.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">

          {/* Left Section */}
          <div
            className="
            xl:col-span-2
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            p-8
            shadow-2xl
            "
          >

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white">
                Meeting Details
              </h2>

              <p className="text-slate-400 mt-1">
                Fill the details below to create a meeting.
              </p>
            </div>

            <div className="space-y-6">

              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Meeting Title
                </label>

               <Input
  placeholder="Meeting Title"
  className="h-12"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Description
                </label>

                <Textarea
  placeholder="Description"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    Meeting Date
                  </label>

                  <Input
  type="date"
  value={date}
  onChange={(e) =>
    setDate(e.target.value)
  }
/>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    Meeting Time
                  </label>

                  <Input
  type="time"
  value={time}
  onChange={(e) =>
    setTime(e.target.value)
  }
/>
                </div>

              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Duration
                </label>

                <Input
  type="number"
  placeholder="60 Minutes"
  value={duration}
  onChange={(e) =>
    setDuration(e.target.value)
  }
/>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Participants
                </label>

                <Input
  placeholder="Participants"
  value={participants}
  onChange={(e) =>
    setParticipants(e.target.value)
  }
/>
              </div>
              

              <Button
  onClick={handleCreateMeeting}
  className="
  w-full
  h-14
  text-lg
  font-semibold
  bg-gradient-to-r
  from-cyan-500
  to-blue-600
  hover:from-cyan-600
  hover:to-blue-700
  rounded-2xl
  "
>
  Create Meeting
</Button>

            </div>

          </div>

          {/* Right Section */}
          <div
            className="
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            p-6
            shadow-2xl
            h-fit
            sticky
            top-8
            "
          >

            <div className="flex items-center gap-3 mb-6">

              <div
                className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                flex
                items-center
                justify-center
                "
              >
                <Video size={22} />
              </div>

              <div>
                <h3 className="font-bold text-white text-lg">
                  Meeting Preview
                </h3>

                <p className="text-slate-400 text-sm">
                  Live meeting summary
                </p>
              </div>

            </div>

            <div className="space-y-5">

              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-slate-400 text-sm">
                  Title
                </p>

               <h4 className="text-white font-semibold mt-1">
  {title || "Meeting Title"}
</h4>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 flex items-center gap-3">
                <Calendar size={18} />

                <div>
                  <p className="text-slate-400 text-sm">
                    Date
                  </p>

                 <p className="text-white">
  {date || "Select Date"}
</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 flex items-center gap-3">
  <Clock size={18} />

  <div>
    <p className="text-slate-400 text-sm">
      Time
    </p>

    <p className="text-white">
      {time || "--:--"}
    </p>
  </div>
</div>

              <div className="rounded-2xl bg-white/5 p-4 flex items-center gap-3">
                <Clock size={18} />

                <div>
                  <p className="text-slate-400 text-sm">
                    Duration
                  </p>

                 <p className="text-white">
  {duration
    ? `${duration} Minutes`
    : "60 Minutes"}
</p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4 flex items-center gap-3">
                <Users size={18} />

                <div>
                  <p className="text-slate-400 text-sm">
                    Participants
                  </p>
<p className="text-white">
  {participants
    ? participants.split(",").length
    : 0} Added
</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}