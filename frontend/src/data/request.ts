export type Status = "pending" | "confirmed" | "cancelled";

export interface Request {
  id: number
  name: string
  email: string
  phone: string
  date: Date
  venue: string
  city: string
  state: string
  message: string
  status: Status
}

export const placeholder: Request[] = [
  {
    id: 1,
    name: "string",
    email: "string",
    phone: "string",
    date: new Date(),
    venue: "string",
    city: "string",
    state: "string",
    message: "string",
    status: "pending"
  },
  {
    id: 2,
    name: "string",
    email: "string",
    phone: "string",
    date: new Date(),
    venue: "string",
    city: "string",
    state: "string",
    message: "string",
    status: "confirmed"
  },
  {
    id: 3,
    name: "string",
    email: "string",
    phone: "string",
    date: new Date(),
    venue: "string",
    city: "string",
    state: "string",
    message: "string",
    status: "cancelled"
  }
]