import Link from "next/link";

export default function Signup() {
  return (
    <>
      <div className="flex justify-center h-full">
        <div className="flex flex-col mt-[100px] border border-gray-900 px-10 py-5">
          <h1 className="self-center text-[20px] my-5">SignUp</h1>
          <div className="gap-10">
            <div className="flex flex-col my-2 gap-y-2">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="outline-none text-white px-2 py-1 border rounded border-white bg-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={false}
              className="bg-transparent hover:bg-[#050505] active:bg-[#] border-2 h-fit px-6 border-gray-900 rounded-full self-center my-2 disabled:bg-green-50 text-[16px]"
            >
              verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
