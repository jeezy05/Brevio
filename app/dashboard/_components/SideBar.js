"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Layout, Shield } from "lucide-react";
import { Progress } from "../../../components/ui/progress";
import UploadPDFDialog from "./UploadPDFDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideBar() {
  const { user } = useUser();
  const path = usePathname();
  const getUserInfo = useQuery(api.user.getUserInfo, {
    email: user?.primaryEmailAddress.emailAddress,
  });

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress.emailAddress,
  });
  return (
    <div className="shadow-md h-screen p-7">
      <Image
        src={"/logo.svg"}
        alt="Logo"
        width={75}
        height={50}
        className="pl-4"
      />
      <div className="mt-10 ">
        <UploadPDFDialog
          isMaxFile={
            fileList?.length >= 5 && !getUserInfo.upgrade ? true : false
          }
        >
          <Button className="w-full">+ Upload PDF</Button>
        </UploadPDFDialog>
        <Link href={"/dashboard"}>
          <div
            className={`flex gap-2 items-center p-3 mt-3 hover:bg-gray-100 rounded-md cursor-pointer ${path == "/dashboard" && "bg-slate-200"}`}
          >
            <Layout />
            <h2>Workspace</h2>
          </div>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <div
            className={`flex gap-2 items-center p-3 mt-3 hover:bg-gray-100 rounded-md cursor-pointer ${path == "/dashboard/upgrade" && "bg-slate-200"}`}
          >
            <Shield />
            <h2>Upgrade</h2>
          </div>
        </Link>
      </div>
      {!getUserInfo?.upgrade && (
        <div className="absolute bottom-24 w-[80%]">
          <Progress value={(fileList?.length / 5) * 100}></Progress>
          <p className="text-sm mt-1">
            {fileList?.length || 0} out of 5 Pdf Uploaded
          </p>
          <p className="text-sm mt-2 text-gray-400">
            Upgrade to upload more Pdf
          </p>
        </div>
      )}
    </div>
  );
}

export default SideBar;
