"use client";

import { useEffect, useState, useRef } from "react";
import { Calendar } from "@/components";
import { formatDate } from "@/utils/formatDate";
import { checkDate, submitForm } from "@/utils/api";
import Image from "next/image";

export interface BookingRequest {
  name: string
  email: string
  phone: string
  date: Date
  location: string
}

export default function Form() {
  const [active, setActive] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateLoading, setDateLoading] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingRequest>({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    location: ""
  })
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleDateChange(date: Date | undefined) {
    setAvailable(false);
    setSelectedDate(date);
  }

  function submitDate(date: Date) {
    setDateLoading(true);
    checkDate(date).then((data) => {
      setAvailable(data.available);
      setFormData(prev => ({
        ...prev,
        date: date
      }))
      setDateLoading(false);
    }).catch((err) => {
      setDateError(err.message);
      setDateLoading(false);
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function submitFormData(form: BookingRequest) {
    setFormLoading(true);
    submitForm(form).then((data) => {
      setSubmitted(true);
      setName(data.name);
      setFormLoading(false);
    }).catch((err) => {
      setFormError(err.message);
      setFormLoading(false);
    });
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    }

    function handleClickInside(event: MouseEvent) {
      if (wrapperRef.current && wrapperRef.current.contains(event.target as Node)) {
        setActive(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickInside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 rounded-xl shadow-sm bg-white">
      {!submitted ? (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl text-accent-medium font-bold pb-6">Booking Form</h1>

          <div className="w-full flex justify-center pb-3">
            <div className="w-9/10 h-1 bg-accent-light rounded" />
          </div>

          <h1 className="text-2xl text-accent-medium font-bold pb-6">Check if your event date is available</h1>

          <div className="grid gap-6 items-center grid-cols-1 md:grid-cols-2 pb-6">
            <div className="w-full flex flex-row justify-center items-center gap-3">
              <strong className="text-xl text-accent-medium">Date: </strong>
              <div ref={wrapperRef} className="relative gap-3">
                <input readOnly value={selectedDate ? formatDate(selectedDate) : "Choose Date"} className="text-lg text-black border border-black bg-yellow-100 rounded-xl p-1"></input>
                {active && (
                  <div className="absolute left-0 right-0 top-0 max-h-54 pt-12 z-10">
                    <Calendar onDateSubmit={handleDateChange} />
                  </div>
                )}
              </div>
              <button
                disabled={dateLoading}
                onClick={() => submitDate(selectedDate ? selectedDate : new Date())}
                className="text-xl text-white py-1 px-3 border border-4 bg-accent-dark hover:bg-accent-medium border-accent-intense z-20"
              >
                &gt;
              </button>
            </div>
            <div className="w-full flex flex-row justify-center items-center gap-3">
              <strong className="text-xl text-accent-medium">Availability: </strong>
              <Image
                src={available ? "/media/icons/check.svg" : "/media/icons/cross.svg"}
                alt={available ? "Date Available" : "Date Not Available"}
                width={20}
                height={20}
                className="object-cover rounded-full"
              />
            </div>
          </div>

          <div className="w-full flex justify-center pt-6 pb-3">
            <div className="w-9/10 h-1 bg-accent-light rounded" />
          </div>

          <h1 className="text-2xl text-accent-medium font-bold pb-6">Enter your info below</h1>

          <div className="grid gap-6 items-center grid-cols-1 md:grid-cols-2 pb-6">
            <div className="">
              <strong className="text-xl text-accent-medium">Name: </strong>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
              ></input>
            </div>
            <div className="">
              <strong className="text-xl text-accent-medium">Email: </strong>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
              ></input>
            </div>
            <div className="">
              <strong className="text-xl text-accent-medium">Phone: </strong>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
              ></input>
            </div>
            <div className="">
              <strong className="text-xl text-accent-medium">Location: </strong>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
              ></input>
            </div>
          </div>

          <button
            disabled={!available || formLoading}
            onClick={() => submitFormData(formData)}
            className={`text-xl text-white px-6 py-3 border border-4 ${!available ? "bg-gray-600 border-gray-700" : "bg-accent-dark hover:bg-accent-medium border-accent-intense"}`}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl text-accent-medium font-bold">Thank You, {name}! We'll be in touch shortly!</h1>
        </div>
      )}
    </div>
  );
}