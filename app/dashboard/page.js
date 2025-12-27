"use client";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Dashboard() {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress.emailAddress,
  });

  return (
    <div className="px-6 py-8">
      <h2 className="font-semibold text-3xl text-gray-800 mb-6">Workspace</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {fileList?.length > 0
          ? fileList.map((file, index) => (
              <Link href={`/workspace/${file.fileId}`} key={index}>
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <Image
                    src="/file.png"
                    alt="file"
                    width={64}
                    height={64}
                    className="mb-4"
                  />
                  <h2 className="text-center text-gray-700 text-sm font-medium truncate w-full">
                    {file?.fileName}
                  </h2>
                </div>
              </Link>
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-slate-300 rounded-md mb-4" />
                <div className="w-3/4 h-4 bg-slate-300 rounded" />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
