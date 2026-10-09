import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowLeft, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        // Store real JWT token and admin profile
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.admin?.email || email);
        if (data.admin) {
          localStorage.setItem("user", JSON.stringify(data.admin));
        }

        navigate("/dashboard");
      } else {
        setError(data.error || data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login network error:", err);
      setError("Unable to connect to backend server. Please verify your connection.");
    } finally {
      setLoading(false);
    }
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
            Sign in with your admin credentials
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-900/40 border border-red-500 text-red-200 text-sm flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <span>{error}</span>
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
              Initial admin credentials: <code className="text-[#00F9FF]">admin@carsreally.com</code> / <code className="text-[#00F9FF]">admin123</code>
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
