"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { RequestCard } from "@/components";
import { Request } from "@/data/request";
import { checkLogin, submitLogout, getBookings } from "@/utils/api";

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();

  useEffect(() => {
    checkLogin().then((data) => {
      if (data.success) {
        setIsLogin(true);
      }
    }).catch(() => {
      router.push("/admin/login");
    });
  }, [])

  function handleBookings() {
    setBookingLoading(true);
    getBookings().then((data) => {
      setRequests(data);
      setError(undefined);
      setBookingLoading(false);
    }).catch((err) => {
      setError(err.message);
      setBookingLoading(false);
    });
  }

  function handleLogout() {
    setLogoutLoading(true);
    submitLogout().then((data) => {
      setLogoutLoading(false);
      if (data.success) {
        router.push("/admin/login");
      }
    }).catch((err) => {
      setError(err.message);
      setLogoutLoading(false);
    });
  }

  return (
    <section className="py-6 bg-gray-100">
      {isLogin && (
        <div>
          <div className="max-w-5xl mx-auto text-center text-balance p-6">
            <div className="w-full flex justify-between items-center pb-3">
              <h1 className="font-bold text-xl md:text-4xl text-accent-medium">
                All Booking Requests
              </h1>
              <div className="flex flex-row justify-center">
                <button
                  onClick={() => handleBookings()}
                  className="font-bold text-lg md:text-3xl text-gray-600 pr-3"
                >
                  {bookingLoading ? "Loading..." : "Load"}
                </button>
                <div className="w-1 h-6 md:h-10 bg-gray-800 rounded"></div>
                <button
                  onClick={() => handleLogout()}
                  className="font-bold text-lg md:text-3xl text-gray-600 pl-3"
                >
                  {logoutLoading ? "Logging Out..." : "Log Out"}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-2 bg-accent-light rounded" />
            </div>
          </div>
          {error ? (
            <div className="max-w-5xl mx-auto p-3 flex justify-center items-center">
              <h1 className="text-xl text-red-500 p-1">{error}</h1>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6 justify-center items-center">
              {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}