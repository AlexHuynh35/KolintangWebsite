"use client";

import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Request } from "@/data/request";

type RequestCardProps = {
  request: Request;
};

export default function RequestCard({ request }: RequestCardProps) {
  const pending = request.status == "pending";
  const [isOpen, setIsOpen] = useState<boolean>(pending);
  const statusColorDark = request.status == "pending" ? "bg-yellow-200" : request.status == "confirmed" ? "bg-green-200" : "bg-red-200";
  const statusColorLight = request.status == "pending" ? "bg-yellow-100" : request.status == "confirmed" ? "bg-green-100" : "bg-red-100";

  return (
    <div className="w-full mx-auto flex flex-col items-center rounded-xl shadow">
      <div
        onClick={() => setIsOpen(!open)}
        className={`w-full flex flex-row gap-3 p-4 rounded-t-xl ${!open && "rounded-b-xl"} ${statusColorDark}`}
      >
        <div className="w-1/2 flex justify-left items-center">
          <h1 className="text-xl text-gray-800">{request.name}</h1>
        </div>
        <button
          disabled={!pending}
          className={`w-1/4 text-md rounded-full text-white py-3 border border-4 ${!pending ? "bg-gray-600 border-gray-700" : "bg-green-800 hover:bg-green-700 border-green-900"}`}
        >
          Approve
        </button>
        <button
          disabled={!pending}
          className={`w-1/4 text-md rounded-full text-white py-3 border border-4 ${!pending ? "bg-gray-600 border-gray-700" : "bg-red-800 hover:bg-red-700 border-red-900"}`}
        >
          Deny
        </button>
      </div>
      {isOpen && (
        <div className={`w-full flex flex-row gap-3 p-4 rounded-b-xl grid grid-cols-2 ${statusColorLight}`}>
          <p className="text-gray-800"><strong>Email:</strong> {request.email}</p>
          <p className="text-gray-800"><strong>Phone:</strong> {request.phone}</p>
          <p className="text-gray-800"><strong>Date:</strong> {formatDate(request.date)}</p>
          <p className="text-gray-800"><strong>Location:</strong> {request.venue + ", " + request.city + ", " + request.state}</p>
          <p className="col-span-2 text-gray-800"><strong>Message:</strong> {request.message}</p>
        </div>
      )}
    </div>
  )
}