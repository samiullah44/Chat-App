import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) login(formData);
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 bg-base-200">
      {/* Left side form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-6 px-8 space-y-6 animate-fadeIn">
            {/* Logo & Title */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="size-14 rounded-2xl bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center shadow-lg">
                  <MessageSquare className="size-7 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-base-content/70 mt-2">
                Sign in to continue your conversations ✨
              </p>
            </div>

            {/* Social login */}
            <div className="flex gap-4">
              <button className="btn flex-1 rounded-xl bg-gradient-to-tr from-primary/80 to-secondary/80 text-white hover:opacity-90 shadow-md">
                Google
              </button>
              <button className="btn flex-1 rounded-xl bg-[#1877F2] text-white hover:bg-[#165DCA] shadow-md">
                Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="divider text-sm text-base-content/50">or</div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <Mail className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <Lock className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none" />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-base-content/50 hover:text-primary transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl flex items-center justify-center gap-2 font-medium"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-base-content/70">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:flex">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>
    </div>
  );
};

export default LoginPage;
