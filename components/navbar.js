import Link from "next/link";
import React from "react";
import { FcWorkflow } from "react-icons/fc";

const Navbar = () => {
  return (
    <div>
      <div className="flex space-x-4 px-2 py-3 bg-gray-100 sticky z-10 top-0  ">
        <Link href={"/"}>
          <div className="px-8 font-bold flex space-x-3 items-center hover:text-gray-600 ">
            <div>
              <FcWorkflow className="text-2xl font-bold" />
            </div>
            <div>WorkFlow designer</div>
          </div>
        </Link>
      </div>
     
    </div>
  );
};

export default Navbar;
