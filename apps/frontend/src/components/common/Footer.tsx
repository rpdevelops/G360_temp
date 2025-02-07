import {
    Card,
    CardContent
  } from "@/components/ui/card"
import Image from "next/image";
export default function Footer () {
    return (
        <footer className="flex flex-row justify-center place-content-center bottom-0">
            <div className="mb-5">
        <Card className="w-fit">
        <CardContent>
                <Image src="/logo-sei.png" className="mt-5" width={200} height={50} alt=""/>
        </CardContent>
        </Card>
        </div>
        </footer>
    )
}  