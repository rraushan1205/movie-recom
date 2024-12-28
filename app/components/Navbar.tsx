import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between py-3 px-20 border-b border-gray-800">
        <ul className="flex gap-20">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className="flex relative">
            <div>
              <Link href="/request">Requests</Link>
            </div>
            <div className="text-[10px] px-[4px] py-[1px] bg-red-600 rounded-full w-fit h-fit">
              10
            </div>
          </li>
        </ul>
        <div>Login</div>
      </nav>
    </>
  );
}
