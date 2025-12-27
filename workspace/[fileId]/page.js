"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import PdfViewer from "../_components/PdfViewer";
import TextEditor from "../_components/TextEditor";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function Workspace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.getFileRecord, { fileId: fileId });
  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);
  return (
    <div>
      <WorkSpaceHeader fileName={fileInfo?.fileName} />
      <div className="grid grid-cols-2 gap-5">
        <div>
          {/* Text Editor */}
          <TextEditor fileId={fileId} />
        </div>
        <div>
          {/* Pdf Viewer */}
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
