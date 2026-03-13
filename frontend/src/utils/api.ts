import { BookingRequest } from "@/components/form";

export async function checkDate(date: Date) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check_date`, {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit_form`, {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit_login`, {
    method: "POST",
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