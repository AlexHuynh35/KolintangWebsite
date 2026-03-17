"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { RequestCard } from "@/components";
import { placeholder, Request } from "@/data/request";
import { checkLogin, submitLogout } from "@/utils/api";

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    checkLogin().then((data) => {
      if (data.success) {
        setIsLogin(true);
        setRequests(placeholder);
      }
    }).catch(() => {
      router.push("/admin/login");
    });
  }, [])

  function handleLogout() {
    setLogoutLoading(true);
    submitLogout().then((data) => {
      setLogoutLoading(false);
      if (data.success) {
        router.push("/admin/login");
      }
    }).catch(() => {
      setLogoutLoading(false);
    });
  }

  return (
    <section className="py-6 bg-gray-100">
      {isLogin && (
        <div>
          <div className="max-w-5xl mx-auto text-center text-balance p-6">
            <div className="w-full flex justify-between pb-3">
              <h1 className="font-bold text-3xl md:text-5xl text-accent-medium">
                All Booking Requests
              </h1>
              <button
                onClick={() => handleLogout()}
                className="font-bold text-xl md:text-3xl text-gray-600 border-l-4 border-gray-800 pl-3"
              >
                {logoutLoading ? "Logging Out..." : "Log Out"}
              </button>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-2 bg-accent-light rounded" />
            </div>
          </div>
          <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6 justify-center items-center">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}