"use client";
import { Session } from "next-auth";
import Header from "../components/common/Header";
import Taskboard from "../components/ui/common/Tasks/taskboard";
import Footer from "../components/common/Footer";
import { todayString } from "@g360/core";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  if(session) {
    return (
        <main>
          <div className="flex flex-col justify-center text-center">
            <div className="m-5">
              <h1 className="m-5 text-xl font-bold">Olá, {session.user?.name}</h1>
               <p>Hoje é dia: {todayString}</p>
            </div>
            <div className="mx-5 justify-center">
              <Taskboard user={session.user?.username || "Guest"}/>
            </div>
          </div>
        </main>
      );
    }
}