import Image from "next/image";
import Login from "../ui/header/login";

export default function LogoutPage() {
    return (
        <main className="flex flex-col justify-center items-center text-center min-h-screen">
          <Image src="/Logo.png" width={200} height={50} alt=""/>
          <div className="m-5">
          </div>
          <div>
            <Login />
          </div>
        </main>
      );
}