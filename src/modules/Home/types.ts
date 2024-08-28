import { Nullish } from "@/types";

type Customer = {
  addedBy: string;
  createdAt: number;
  email: string;
  name: string;
  status: string;
  tenantId: string;
  updatedAt: number;
  __v: number;
  _id: string;
};

type Meeting = Nullish<{
  _id: string;
  name: string;
  botName: string;
  url: string;
  customerId: string;
  scheduledTime: number;
  transcripts: { speaker: string; text: string }[];
  tenantId: string;
  addedBy: string;
  isDeleted: boolean;
  meetingParticipants: { name: string; isHost: boolean; _id: string }[];
  createdAt: number;
  updatedAt: number;
  __v: number;
  botId: string;
  startTime: number;
  endTime: number;
  summary: string;
  companySummary: string;
  customerDetails: Customer;
  videoRecordingUrl: string;
}>;

export type { Meeting };
