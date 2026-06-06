import api from "@/api/axios";

export const createMeeting = async (meetingData: any) => {
  const response = await api.post(
    "/meetings",
    meetingData
  );

  return response.data;
};