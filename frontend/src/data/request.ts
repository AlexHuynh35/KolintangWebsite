import { formatDate } from "@/utils/formatDate";

export type Status = "pending" | "confirmed" | "cancelled";

export const defaultRate = 200;

export const allEventTypes = [
  { value: "Birthday", cost: defaultRate },
  { value: "Wedding", cost: defaultRate },
  { value: "Performance", cost: defaultRate },
  { value: "Other", cost: defaultRate },
];

export type EventType = typeof allEventTypes[number]["value"];

export const allDurations = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export interface Request {
  id: number
  name: string
  email: string
  phone: string
  date: string
  venue: string
  city: string
  state: string
  type: EventType
  length: number
  message: string
  status: Status
}

export const placeholder: Request[] = [
  {
    id: 1,
    name: "string",
    email: "string",
    phone: "string",
    date: formatDate(new Date()),
    venue: "string",
    city: "string",
    state: "string",
    type: "Other",
    length: 1,
    message: "string",
    status: "pending"
  },
  {
    id: 2,
    name: "string",
    email: "string",
    phone: "string",
    date: formatDate(new Date()),
    venue: "string",
    city: "string",
    state: "string",
    type: "Other",
    length: 1,
    message: "string",
    status: "confirmed"
  },
  {
    id: 3,
    name: "string",
    email: "string",
    phone: "string",
    date: formatDate(new Date()),
    venue: "string",
    city: "string",
    state: "string",
    type: "Other",
    length: 1,
    message: "string",
    status: "cancelled"
  }
];