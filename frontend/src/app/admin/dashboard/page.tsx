"use client";

import { useState } from "react";
import { RequestCard } from "@/components";
import { placeholder, Request } from "@/data/request";

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>(placeholder);

  return (
    <section className="py-6 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center text-balance p-6">
        <h1 className="font-bold text-3xl md:text-5xl text-accent-medium pb-6">
          All Booking Requests
        </h1>
        <div className="flex justify-center">
          <div className="w-9/10 h-2 bg-accent-light rounded" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6 justify-center items-center">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </section>
  )
}