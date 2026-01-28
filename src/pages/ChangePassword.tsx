import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-8 py-16">
      <div className="
        w-full
        max-w-xl
        lg:max-w-3xl
        xl:max-w-4xl
        bg-white
        p-12
        rounded-2xl
        shadow-xl
      ">
        <h1 className="text-3xl font-bold mb-8 text-teal-700 text-center">
          Change Password
        </h1>

        <ul className="mb-10 text-base text-gray-600 list-disc pl-6 space-y-2">
          <li>รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร</li>
          <li>
            รหัสผ่านต้องประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และสัญลักษณ์อย่างน้อย 1 ตัว
          </li>
        </ul>

        <form className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                className="
                  w-full
                  border border-gray-300
                  rounded-xl
                  px-5 py-3
                  pr-12
                  text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500
                  transition
                "
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-gray-700
                  transition
                  focus:outline-none
                "
              >
                {showOldPassword ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="
                  w-full
                  border border-gray-300
                  rounded-xl
                  px-5 py-3
                  pr-12
                  text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500
                  transition
                "
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-gray-700
                  transition
                  focus:outline-none
                "
              >
                {showNewPassword ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="
                  w-full
                  border border-gray-300
                  rounded-xl
                  px-5 py-3
                  pr-12
                  text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-teal-500
                  transition
                "
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-gray-700
                  transition
                  focus:outline-none
                "
              >
                {showConfirmPassword ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="
              mt-6
              w-full
              bg-teal-700
              text-white
              py-4
              rounded-xl
              text-lg
              font-semibold
              hover:bg-teal-800
              transition
              shadow-md
            "
          >
            Save Change
          </button>
        </form>
      </div>
    </div>
  );
}