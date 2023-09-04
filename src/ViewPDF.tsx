import { useState } from "react";
import { Document, Page } from "react-pdf";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface Props {
  fileUrl: string | undefined;
}

export const ViewPDF = ({ fileUrl }: Props) => {
  const [numPages, setNumPages] = useState(null ?? 0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  return (
    <>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="flex justify-between mt-4">
        <div className="cursor-pointer">
          {pageNumber > 1 && (
            <button
              onClick={(e: any) => {
                e.preventDefault();
                setPageNumber((prev) => prev + -1);
              }}
            >
              <FaArrowAltCircleLeft size={20} />
            </button>
          )}
        </div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div className="cursor-pointer">
          {pageNumber < numPages && (
            <div
              onClick={(e: any) => {
                e.preventDefault();
                setPageNumber((prev) => prev + +1);
              }}
            >
              <FaArrowAltCircleRight size={20} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
