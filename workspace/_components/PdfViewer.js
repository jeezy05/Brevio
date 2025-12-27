import React from "react";

function PdfViewer({ fileUrl }) {
  console.log(fileUrl);
  return (
    <div>
      <iframe
        src={fileUrl+"#toolbar=0&navpanes=0&scrollbar=0"}
        width="100%"
        height="90vh"
        className="h-[90vh]"
        title="PDF Viewer"
      />
    </div>
  );
}

export default PdfViewer;
