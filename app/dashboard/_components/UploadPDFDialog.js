"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { v4 as uuid4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function UploadPDFDialog({ children, isMaxFile }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myActions.ingest);
  const { user } = useUser();
  const [file, setFile] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const onUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("File uploaded successfully with storageId:", storageId);
    const fileId = uuid4(); // Generate a unique file ID
    const fileUrl = await getFileUrl({ storageId });
    // Step 3: Save the newly allocated storage id to the database
    const resp = await addFileEntry({
      fileId,
      fileName: fileName ?? "Untitled",
      storageId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      fileUrl,
    });
    // Reset the form
    setFile(null);
    setFileName("");
    // api call to fetch PDF Proces data
    const ApiResp = await axios.get(`/api/pdf-loader?pdfUrl=${fileUrl}`);
    console.log("PDF Processed Data:", ApiResp.data.result);
    await embeddDocument({
      splitText: ApiResp.data.result,
      fileId: fileId,
    });
    alert("File uploaded successfully!");
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          disabled={isMaxFile}
          className="w-full"
        >
          + Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Pdf File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="mt-5">Select a file to Upload</h2>
              <div className=" gap-2 p-3 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
              <div className="mt-2">
                <label>File Name *</label>
                <Input
                  placeholder="File Name"
                  onChange={(e) => {
                    setFileName(e.target.value);
                  }}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
          <Button onClick={onUpload} disabled={loading || !file}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPDFDialog;
