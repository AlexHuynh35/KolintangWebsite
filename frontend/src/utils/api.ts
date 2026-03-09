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
    throw new Error("Submission Failed, Please Try Again!");
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
  if (!response.ok) {
    throw new Error("Submission Failed, Please Try Again!");
  }
  return response.json();
}