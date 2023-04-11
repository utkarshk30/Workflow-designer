import Image from "next/image";
import { Inter } from "next/font/google";
import Workflow from "./workflow";
import Link from "next/link";
import Module from "./module";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="mt-8">
        <Workflow />
      </div>
      <div className="fixed bottom-0 right-0 bg-gradient-to-r from-emerald-500 rounded-2xl p-2 border">
        <span className="text-sm text-gray-300 font-semibold">
          designed by :{" "}
        </span>
        <span className="font-bold text-base ">Rohit Siva Sai</span>
      </div>
    </>
  );
}
