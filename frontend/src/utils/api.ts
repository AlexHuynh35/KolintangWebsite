import { BookingRequest } from "@/components/form";

/*
function getCSRFToken(): string | null {
  const match = document.cookie.match(/csrf_token=([^;]+)/);
  return match ? match[1] : null;
}
*/

export async function checkDate(date: Date) {
  /*
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
  */
  return {
    success: date == date
  }
}

export async function submitForm(form: BookingRequest) {
  /*
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
  */
  return {
    success: true,
    name: form.name
  }
}

/*
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

export async function submitLogout() {
  const csrfToken = getCSRFToken();
  const response = await fetch("/api/submit_logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-Token": csrfToken || "",
    },
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submission failed, please try again");
  }
  return data;
}

export async function getBookings() {
  const csrfToken = getCSRFToken();
  const response = await fetch("/api/get_bookings", {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRF-Token": csrfToken || "",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submission failed, please reload");
  }
  return data;
}

export async function confirmRequest(id: number) {
  const csrfToken = getCSRFToken();
  const response = await fetch("/api/confirm_request", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken || "",
    },
    body: JSON.stringify({
      id: id
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submission failed, please try again");
  }
  return data;
}

export async function cancelRequest(id: number) {
  const csrfToken = getCSRFToken();
  const response = await fetch("/api/cancel_request", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken || "",
    },
    body: JSON.stringify({
      id: id
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submission failed, please try again");
  }
  return data;
}
*/