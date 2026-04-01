"use client";

import { useState } from "react";
import { formatDateString } from "@/utils/formatDate";
import { Status, Request } from "@/data/request";
import { confirmRequest, cancelRequest } from "@/utils/api";

type RequestCardProps = {
  request: Request;
};

export default function RequestCard({ request }: RequestCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(request.status == "pending");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>(request.status);

  function handleRequestConfirm(id: number) {
    setLoading(true);
    confirmRequest(id).then((data) => {
      if (data.success) {
        setStatus(data.status);
        setError(undefined);
      }
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }

  function handleRequestCancel(id: number) {
    setLoading(true);
    cancelRequest(id).then((data) => {
      if (data.success) {
        setStatus(data.status);
        setError(undefined);
      }
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }

  return (
    <div className="w-full mx-auto flex flex-col items-center rounded-xl shadow">
      <div className={`w-full flex flex-row gap-3 p-4 rounded-t-xl ${!isOpen && "rounded-b-xl"} ${status == "pending" ? "bg-yellow-200" : status == "confirmed" ? "bg-green-200" : "bg-red-200"}`}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-1/2 flex justify-left items-center"
        >
          <h1 className="text-md md:text-xl text-gray-800">{request.name} <span className="text-sm md:text-md">&#9660;</span></h1>
        </div>
        <div className="w-1/2 flex flex-col gap-3 justify-center items-center">
          <div className="w-full flex flex-row gap-3 justify-center items-center">
            <button
              disabled={status != "pending" || loading}
              onClick={() => handleRequestConfirm(request.id)}
              className={`w-1/2 text-sm md:text-lg rounded-full text-white py-3 border border-4 ${status != "pending" || loading ? "bg-gray-600 border-gray-700" : "bg-green-800 hover:bg-green-700 border-green-900"}`}
            >
              Approve
            </button>
            <button
              disabled={status != "pending" || loading}
              onClick={() => handleRequestCancel(request.id)}
              className={`w-1/2 text-sm md:text-lg rounded-full text-white py-3 border border-4 ${status != "pending" || loading ? "bg-gray-600 border-gray-700" : "bg-red-800 hover:bg-red-700 border-red-900"}`}
            >
              Deny
            </button>
          </div>
          {error && (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-xl text-red-500 p-1">{error}</h1>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className={`w-full flex flex-row gap-3 p-4 rounded-b-xl grid grid-cols-1 md:grid-cols-2 ${status == "pending" ? "bg-yellow-100" : status == "confirmed" ? "bg-green-100" : "bg-red-100"}`}>
          <p className="text-gray-800"><strong>Email:</strong> {request.email}</p>
          <p className="text-gray-800"><strong>Phone:</strong> {request.phone}</p>
          <p className="text-gray-800"><strong>Date:</strong> {formatDateString(request.date)}</p>
          <p className="text-gray-800"><strong>Location:</strong> {request.venue + ", " + request.city + ", " + request.state}</p>
          <p className="text-gray-800"><strong>Event Type:</strong> {request.type}</p>
          <p className="text-gray-800"><strong>Event Duration:</strong> {request.length + (request.length === 1 ? " Hour" : " Hours")}</p>
          <p className="md:col-span-2 text-gray-800"><strong>Message:</strong> {request.message}</p>
        </div>
      )}
    </div>
  )
}