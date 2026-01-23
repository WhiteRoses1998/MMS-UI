export default function ChangePassword() {
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
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Old Password
            </label>
            <input
              type="password"
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-5 py-3
                text-base
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                transition
              "
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-5 py-3
                text-base
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                transition
              "
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-5 py-3
                text-base
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500
                transition
              "
            />
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
