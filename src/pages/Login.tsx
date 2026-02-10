// src/pages/Login.tsx
import React, { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // ✅ ล้างของเก่าทิ้งก่อน
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (!username.trim() || !password.trim()) {
      setError("กรุณากรอก Username และ Password ให้ครบ");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pns_id: username.trim(),
          user_password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || "Username หรือ Password ไม่ถูกต้อง");
        return;
      }

      // ✅ เก็บ token + user (พอแล้ว)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/workorder");
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-700 text-white px-6 py-4 shadow-md">
        <div className="text-xl font-medium">| MMS</div>
      </div>

      {/* Main */}
      <div
        className="flex items-center justify-center px-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-2xl">
          <h2 className="text-3xl text-center mb-10 text-gray-800">Log in</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-teal-500"
              autoFocus
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border rounded focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-700 text-white rounded hover:bg-teal-800"
            >
              {isLoading ? "กำลังเข้าสู่ระบบ..." : "Log in"}
            </button>
          </form>

          <div className="text-center mt-12 text-xs text-gray-400">
            version 1.0.7
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
