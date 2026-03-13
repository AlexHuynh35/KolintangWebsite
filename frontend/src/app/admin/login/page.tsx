"use client";

import { useState } from "react";
import { submitLogin } from "@/utils/api";
import { validateEmail } from "@/utils/validation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.value
    setEmail(value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.value
    setPassword(value);
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Enter a valid email");
      setPassword("");
      return;
    }
    if (password == "") {
      setPasswordError("Enter a password");
      setPassword("");
      return;
    }

    setLoading(true);

    submitLogin(email, password).then((data) => {
      setPassword("");
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setPassword("");
      setLoading(false);
    });
  }

  return (
    <section className="py-6 bg-gray-100">
      <div className="max-w-3xl mx-auto my-6 p-6 rounded-xl shadow-sm bg-white">
        <form noValidate onSubmit={handleSubmit}>
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl text-accent-medium font-bold pb-6">Login</h1>

            <div className="w-full md:w-1/2 mx-auto flex flex-col gap-6 pb-6">
              <div className="flex flex-row">
                <strong className="text-xl text-accent-medium py-1">Email: </strong>
                <div className="w-full flex flex-col">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => {
                      if (!validateEmail(email)) {
                        setEmailError("Enter a valid email");
                      }
                      else {
                        setEmailError(null);
                      }
                    }}
                    className="w-full h-fit text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
                  ></input>
                  {emailError && (
                    <h1 className="text-md text-red-500 ml-2 p-1">{emailError}</h1>
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <strong className="text-xl text-accent-medium py-1">Password: </strong>
                <div className="w-full flex flex-col">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => {
                      if (password == "") {
                        setPasswordError("Enter a password");
                      }
                      else {
                        setPasswordError(null);
                      }
                    }}
                    className="w-full h-fit text-lg text-black border border-black bg-yellow-100 rounded-xl ml-2 p-1"
                  ></input>
                  {passwordError && (
                    <h1 className="text-md text-red-500 ml-2 p-1">{passwordError}</h1>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`text-xl text-white px-6 py-3 border border-4 ${loading ? "bg-gray-600 border-gray-700" : "bg-accent-dark hover:bg-accent-medium border-accent-intense"}`}
            >
              Login
            </button>

            {error && (
              <h1 className="text-xl text-red-500 p-1">{error}</h1>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}