export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg">
        <h1 className="text-xl font-bold">Profile setting</h1>
        {/* Profile image */}
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 mt-1 rounded-full shadow-lg"
            src="/me.jpeg"
            alt="Bonnie image"
          />
          <div className="">
            <h2 className="text-lg">John Anderson</h2>
            <span className="text-gray-500">
              Update your photo and personal details
            </span>
          </div>
        </div>
        {/* Profile form */}
        <div className="flex flex-col gap-6 mt-5">
          <div className="flex gap-4">
            <div className="flex flex-col w-72">
              <label htmlFor="" className="text-gray-400 font-semibold text-sm">
                First name
              </label>
              <input
                type="text"
                value={"John"}
                className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="" className="text-gray-400 font-semibold text-sm">
                Last name
              </label>
              <input
                type="text"
                value={"Anderson"}
                className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              value={"john.anderson@example.com"}
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              Phone Number
            </label>
            <input
              type="text"
              value={"+1 (555) 123-4567"}
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
            />
          </div>

          <hr className="text-gray-200" />
          <h1 className="font-semibold">Change Password</h1>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              Current Password
            </label>
            <input
              type="password"
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              New Password
            </label>
            <input
              type="password"
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button className="cursor-pointer border-gray-300 border px-4  py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="flex rounded-lg justify-between items-center gap-21 bg-white p-4">
        <div>
          <h1 className="font-bold text-xl">Delete Account</h1>
          <span className="text-gray-500 font-semibold">
            Once you delete your account, there is no going back
          </span>
        </div>
        <button className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
