import { BookingRequest } from "@/components/form";

export async function checkDate(date: Date) {
  const response = await fetch("/api/check_date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: date.toISOString()
    })
  });
  if (!response.ok) {
    throw new Error("Submission failed, please try again");
  }
  return response.json();
}

export async function submitForm(form: BookingRequest) {
  const response = await fetch("/api/submit_form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...form,
      date: form.date.toISOString()
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submission failed, please try again");
  }
  return data;
}

export async function submitLogin(email: string, password: string) {
  const response = await fetch("/api/submit_login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submission failed, please try again");
  }
  return data;
}

export async function checkLogin() {
  const response = await fetch("/api/check_login", {
    method: "GET",
    credentials: "include"
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submission failed, please reload");
  }
  return data;
}

export async function getBookings() {
  const response = await fetch("/api/get_bookings", {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submission failed, please reload");
  }
  return data;
}