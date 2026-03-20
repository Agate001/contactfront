"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { login, createAccount, saveToken } from "@/lib/Logic";

export default function Page() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const username = usernameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";
    const confirm = confirmRef.current?.value || "";

    if (mode === "signup") {
      if (!username || !email || !password || !confirm) {
        setError("Please fill in all fields.");
        return;
      }
    } else {
      if (!username || !password) {
        setError("Please fill in all fields.");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        if (password !== confirm) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        const success = await createAccount({ username, email, password });

        if (!success) {
          setError("Failed to create account.");
          return;
        }

        const loginResult = await login({ username, email, password });

        if (loginResult?.token) {
          saveToken(loginResult.token);
          router.push("/home");
        } else {
          setError("Account created but login failed.");
        }

        return;
      }

      const result = await login({ username, email, password });

      if (!result?.token) {
        setError("Invalid username/email or password.");
        return;
      }

      saveToken(result.token);
      router.push("/home");
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1f2937]">
      <div className="absolute inset-0">
        <Image
          src="/images/login-bg.png"
          alt="Login background"
          fill
          priority
          className="object-cover opacity-20"
        />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-350 items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-xs font-bold text-white">
                C
              </div>
              <span className="text-sm font-semibold text-indigo-600">
                ContactManager
              </span>
            </div>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="mb-5 rounded-xl border border-indigo-100 bg-[#eef0ff] px-4 py-3 text-sm text-gray-600 shadow-sm">
              {mode === "login"
                ? "Welcome back! All systems are operational."
                : "Create your account to get started."}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="px-6 pb-6 pt-7">
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {mode === "login" ? "Sign In" : "Create Account"}
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    {mode === "login"
                      ? "Enter your credentials to access your workspace."
                      : "Fill in the details below to create your account."}
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Username */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      ref={usernameRef}
                      type="text"
                      placeholder="alexmorgan"
                      className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400"
                    />
                  </div>

                  {/* Email only for signup */}
                  {mode === "signup" && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        ref={emailRef}
                        type="email"
                        placeholder="alex.morgan@design.com"
                        className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400"
                      />
                    </div>
                  )}

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div
                      className={`flex h-11 items-center rounded-lg border px-3 ${
                        error ? "border-red-400" : "border-gray-200"
                      }`}
                    >
                      <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="w-full bg-transparent text-sm outline-none"
                      />
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="ml-2 shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
                        tabIndex={-1}
                      >
                        {showPassword ? "🙈" : "👁"}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  {mode === "signup" && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        ref={confirmRef}
                        type="password"
                        placeholder="Confirm password"
                        className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400"
                      />
                    </div>
                  )}

                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex h-11 w-full items-center justify-center rounded-lg bg-indigo-500 text-sm font-semibold text-white hover:bg-indigo-600 disabled:opacity-60"
                  >
                    {loading
                      ? "Loading..."
                      : mode === "login"
                      ? "Sign In to Dashboard"
                      : "Create Account"}
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-5 text-center text-sm text-gray-500">
                {mode === "login" ? (
                  <>
                    New to the platform?{" "}
                    <button
                      onClick={() => {
                        setMode("signup");
                        setError("");
                      }}
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setMode("login");
                        setError("");
                      }}
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}