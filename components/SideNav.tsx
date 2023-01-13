import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const router = usePathname();

  return (
    <nav className="absolute left-0 right-0 w-1/5 h-screen bg-yellow-50">
      {/* <img src="/vercel.svg" /> */}
      <div className="text-lg flex flex-col space-y-10 p-10">
        <Link
          className={router === "/" ? "active text-pink-400 " : ""}
          href="/"
        >
          Home
        </Link>
        <Link
          className={router === "/about" ? "active text-pink-400" : ""}
          href="/about"
        >
          About
        </Link>
      </div>
      {/* <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
          background: yellow;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style> */}
    </nav>
  );
}
