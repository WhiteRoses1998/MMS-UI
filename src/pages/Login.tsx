// src/pages/Login.tsx
import React, { useState, FormEvent } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('ENG');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError('กรุณากรอก Username และ Password ให้ครบ');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        if (trimmedUsername === 'admin' && trimmedPassword === 'admin') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username', trimmedUsername);
          navigate('/dashboard');
        } else {
          setError('Username หรือ Password ไม่ถูกต้อง');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-medium">| MMS</div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-2xl">
          {/* Title */}
          <h2 className="text-3xl font-normal text-center mb-10 text-gray-800">Log in</h2>

          {/* Language Selector */}
          <div className="flex justify-end mb-8">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white cursor-pointer"
            >
              <option value="ENG">ENG</option>
              <option value="THA">THA</option>
            </select>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base placeholder-gray-400"
                autoFocus
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username.trim() || !password.trim()}
              className={`w-full py-3 rounded font-medium transition-colors text-base ${
                isLoading || !username.trim() || !password.trim()
                  ? 'bg-teal-700 cursor-not-allowed text-white'
                  : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'Log in'}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-6">
            <a 
              href="#" 
              className="text-gray-500 hover:text-teal-700 text-sm transition-colors inline-block"
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </a>
          </div>

          {/* Logo and Version */}
          <div className="text-center mt-12 space-y-2">
            <div className="flex justify-center">
              <div className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span>PowerMaintenance</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              version 1.0.7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;