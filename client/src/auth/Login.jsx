import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowLeft } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    setLoading(true);

    // Client-side authentication logic
    setTimeout(() => {
      // Allow admin credentials or valid email format for demo
      if (
        (email.toLowerCase() === "admin@carsreally.com" && password === "admin123") ||
        (email.includes("@") && password.length >= 6)
      ) {
        const token = "carsreally-admin-auth-" + Date.now();
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Try admin@carsreally.com / admin123");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-950 px-4">
      <div className="bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#00F9FF] hover:underline mb-6"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white">
            Admin <span className="text-[#00F9FF]">Portal</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Sign in to manage rally registrations & approvals
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-900/40 border border-red-500 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@carsreally.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-900/80 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-900/80 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00F9FF]"
                required
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Demo admin credentials: <code className="text-[#00F9FF]">admin@carsreally.com</code> / <code className="text-[#00F9FF]">admin123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#00F9FF] hover:bg-cyan-400 text-black font-bold rounded-lg transition duration-200 cursor-pointer shadow-[0_0_12px_rgba(0,249,255,0.4)] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Log In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
