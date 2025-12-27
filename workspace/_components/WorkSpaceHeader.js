import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function WorkSpaceHeader({ fileName }) {
  return (
    <div className="flex justify-between items-center shadow-md h-16 p-4">
      <Image
        src={"/logo.svg"}
        alt="Logo"
        width={50}
        height={25}
        className="pl-4"
      />
      <h2 className="text-2xl font-bold">{fileName}</h2>
      <UserButton />
    </div>
  );
}

export default WorkSpaceHeader;
