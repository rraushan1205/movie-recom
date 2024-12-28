import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="flex justify-center h-full">
        <div className="flex flex-col mt-[100px] border border-gray-900 px-10 py-5">
          <h1 className="self-center text-[20px] my-5">Login</h1>
          <div className="flex flex-col my-2 ">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              pattern="[0-9]"
              className="outline-none text-white px-2 border-b border-white bg-transparent"
            />
          </div>
          <div className="flex flex-col my-2 ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="outline-none text-white px-2 border-b border-white bg-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={false}
            className="bg-green-500 w-32 self-center rounded my-2 disabled:bg-green-50"
          >
            Login
          </button>
          <p className="flex text-[15px] flex-col self-center">
            New User?{" "}
            <Link href="/Signup" className="self-center">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
