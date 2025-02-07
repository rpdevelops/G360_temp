import Image from "next/image";
import Logout from "../ui/header/logout";
import Menu from "../ui/header/menu";
import { Session } from "next-auth";
import Link from "next/link";

export default function Header(session: Session) {
    return (
        <main className="">
            <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
            <Link href="/"><Image src="/Logo.png" className="mr-1 ml-5" width={200} height={50} alt=""/></Link>
            <p className="text-left text-xs">{session.user?.name}</p>
            </div>
        <div className="m-5">
            <Logout />
        </div>
        </div>
        <div className="flex justify-center -mt-14 z-10"><Menu></Menu></div>
        </main>
    )
}