"use client";

import { useEffect, useState, useRef } from "react";
import { Calendar } from "@/components";
import { formatDate } from "@/utils/formatDate";
import { checkDate, submitForm } from "@/utils/api";
import { validateEmail, validatePhone } from "@/utils/validation";
import Image from "next/image";

export interface BookingRequest {
  name: string
  email: string
  phone: string
  date: Date
  venue: string
  city: string
  state: string
  message: string
}

export interface BookingErrors {
  name: string | null
  email: string | null
  phone: string | null
  venue: string | null
  city: string | null
  state: string | null
}

export default function Form() {
  const [active, setActive] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateLoading, setDateLoading] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<BookingErrors>({
    name: null,
    email: null,
    phone: null,
    venue: null,
    city: null,
    state: null
  });
  const [formData, setFormData] = useState<BookingRequest>({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    venue: "",
    city: "",
    state: "",
    message: ""
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
      setAvailable(data.success);
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

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    
    if (formData.name == "") {
      setBookingError(prev => ({
        ...prev,
        name: "Enter your name"
      }));
      return;
    }
    if (!validateEmail(formData.email)) {
      setBookingError(prev => ({
        ...prev,
        email: "Enter a valid email"
      }));
      return;
    }
    if (!validatePhone(formData.phone)) {
      setBookingError(prev => ({
        ...prev,
        phone: "Enter a valid phone number"
      }));
      return;
    }
    if (formData.venue == "") {
      setBookingError(prev => ({
        ...prev,
        venue: "Enter your venue"
      }));
      return;
    }
    if (formData.city == "") {
      setBookingError(prev => ({
        ...prev,
        city: "Enter your venue's city"
      }));
      return;
    }
    if (formData.state == "") {
      setBookingError(prev => ({
        ...prev,
        state: "Enter your venue's state"
      }));
      return;
    }

    setFormLoading(true);

    submitForm(formData).then((data) => {
      setSubmitted(data.success);
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
      <form noValidate onSubmit={handleSubmit}>
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
                  <input type="text" readOnly required value={selectedDate ? formatDate(selectedDate) : "Choose Date"} className="text-lg text-black border border-black bg-yellow-100 rounded-xl p-1"></input>
                  {active && (
                    <div className="absolute left-0 right-0 top-0 max-h-54 pt-12 z-10">
                      <Calendar onDateSubmit={handleDateChange} />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  disabled={dateLoading}
                  onClick={() => submitDate(selectedDate ? selectedDate : new Date())}
                  className={`text-xl text-white py-1 px-3 border border-4 ${dateLoading ? "bg-gray-600 border-gray-700" : "bg-accent-dark hover:bg-accent-medium border-accent-intense"}`}
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

            <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 pb-6">
              <div className="flex flex-row">
                <strong className="text-xl text-accent-medium py-1">Name: </strong>
                <div className="w-full flex flex-col">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => {
                      if (formData.name == "") {
                        setBookingError(prev => ({
                          ...prev,
                          name: "Enter your name"
                        }));
                      }
                      else {
                        setBookingError(prev => ({
                          ...prev,
                          name: null
                        }));
                      }
                    }}
                    className="w-full h-fit text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
                  ></input>
                  {bookingError.name && (
                    <h1 className="text-md text-red-500 ml-2 p-1">{bookingError.name}</h1>
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <strong className="text-xl text-accent-medium py-1">Email: </strong>
                <div className="w-full flex flex-col">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => {
                      if (!validateEmail(formData.email)) {
                        setBookingError(prev => ({
                          ...prev,
                          email: "Enter a valid email"
                        }));
                      }
                      else {
                        setBookingError(prev => ({
                          ...prev,
                          email: null
                        }));
                      }
                    }}
                    className="w-full h-fit text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
                  ></input>
                  {bookingError.email && (
                    <h1 className="text-md text-red-500 ml-2 p-1">{bookingError.email}</h1>
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <strong className="text-xl text-accent-medium py-1">Phone: </strong>
                <div className="w-full flex flex-col">
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => {
                      if (!validatePhone(formData.phone)) {
                        setBookingError(prev => ({
                          ...prev,
                          phone: "Enter a valid phone number"
                        }));
                      }
                      else {
                        setBookingError(prev => ({
                          ...prev,
                          phone: null
                        }));
                      }
                    }}
                    className="w-full h-fit text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
                  ></input>
                  {bookingError.phone && (
                    <h1 className="text-md text-red-500 ml-2 p-1">{bookingError.phone}</h1>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:col-span-2">
                <strong className="text-xl text-accent-medium py-1">Location: </strong>
                <div className="flex flex-col gap-3 mt-3 ml-3">
                  <div className="flex flex-row">
                    <strong className="text-md text-accent-medium py-1">Venue: </strong>
                    <div className="w-full flex flex-col">
                      <input
                        type="text"
                        name="venue"
                        required
                        value={formData.venue}
                        onChange={handleChange}
                        onBlur={() => {
                          if (formData.venue == "") {
                            setBookingError(prev => ({
                              ...prev,
                              venue: "Enter your venue"
                            }));
                          }
                          else {
                            setBookingError(prev => ({
                              ...prev,
                              venue: null
                            }));
                          }
                        }}
                        className="w-full h-fit text-sm text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
                      ></input>
                      {bookingError.venue && (
                        <h1 className="text-md text-red-500 ml-2 p-1">{bookingError.venue}</h1>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <strong className="text-md text-accent-medium py-1">City: </strong>
                    <div className="w-full flex flex-col">
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={() => {
                          if (formData.city == "") {
                            setBookingError(prev => ({
                              ...prev,
                              city: "Enter your venue's city"
                            }));
                          }
                          else {
                            setBookingError(prev => ({
                              ...prev,
                              city: null
                            }));
                          }
                        }}
                        className="w-full h-fit text-sm text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
                      ></input>
                      {bookingError.city && (
                        <h1 className="text-md text-red-500 ml-2 p-1">{bookingError.city}</h1>
                      )}
                    </div>
                    <strong className="text-md text-accent-medium py-1 ml-6">State: </strong>
                    <div className="w-full flex flex-col">
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={() => {
                          if (formData.state == "") {
                            setBookingError(prev => ({
                              ...prev,
                              state: "Enter your venue's state"
                            }));
                          }
                          else {
                            setBookingError(prev => ({
                              ...prev,
                              state: null
                            }));
                          }
                        }}
                        className="w-full h-fit text-sm text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
                      ></input>
                      {bookingError.state && (
                        <h1 className="text-md text-red-500 ml-2 p-1">{bookingError.state}</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center pb-3">
              <div className="w-9/10 h-1 bg-accent-light rounded" />
            </div>

            <h1 className="text-2xl text-accent-medium font-bold pb-6">Anything we should know about your event?</h1>

            <div className="w-full pb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full h-fit text-lg text-black border border-black bg-yellow-100 rounded-xl p-1"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={!available || formLoading}
              className={`text-xl text-white px-6 py-3 border border-4 ${!available || formLoading ? "bg-gray-600 border-gray-700" : "bg-accent-dark hover:bg-accent-medium border-accent-intense"}`}
            >
              Submit
            </button>

            {formError && (
              <h1 className="text-xl text-red-500 p-1">{formError}</h1>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-2xl text-accent-medium font-bold">Thank You, {name}! We'll be in touch shortly!</h1>
          </div>
        )}
      </form>
    </div>
  );
}