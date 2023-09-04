import React, { useState } from "react";
import "./App.css";
import { ViewPDF } from "./ViewPDF";
import { pdfjs } from "react-pdf";
import { FileResultList } from "./components/fileResultList";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import _ from "lodash";

// workerSrc defination
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [pdfFileList, setPdfFileList] = useState<Array<File>>([]);
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  const getUrl = async (file: File) => {
    const blob = new Blob([file]);
    const pdfUrl = URL.createObjectURL(blob);
    await setPdfUrl(pdfUrl);
  };
  const onPdfFileUpload = (e: any) => {
    const selectedList: Array<File> = Array.from(e.target.files);
    setPdfFileList(selectedList);
  };

  const onDeleteTarget = (e: any) => {
    const target = e.target.id;
    const copyList = _.cloneDeep(pdfFileList);
    const num = _.toNumber(target);
    copyList.splice(num, 1);
    setPdfFileList(copyList);
  };

  const onPdfClose = (e: any) => {
    setShowModal(false);
  };

  const onPdfOpen = (e: any) => {
    const target = e.target.id;
    const num = _.toNumber(target);
    getUrl(pdfFileList[num]);
    setShowModal(e);
  };

  console.log(pdfUrl, pdfFileList, pdfFileList.length);
  return (
    <div className="flex w-full h-screen">
      <div className="flex items-center justify-center w-full h-full">
        <div
          className={
            showModal
              ? "flex z-90 top-0 bottom-0 left-0 right-0 bg-zinc-400 fixed justify-center items-center"
              : "hidden"
          }
        >
          <div>
            <div className="flex justify-end mb-2 mr-2 text-lg font-bold">
              <button onClick={onPdfClose}>X</button>
            </div>
            <ViewPDF fileUrl={pdfUrl} />
          </div>
        </div>
        <div className="flex-col w-1/2 h-auto p-4 border rounded-lg">
          <div className="flex justify-center text-md h-[50px] items-center">
            PDF Viewer
          </div>
          {pdfFileList.length === 0 ? (
            <div className="flex items-center justify-center w-full min-h-[100px]">
              <label
                htmlFor="uploadFile"
                className="flex items-center justify-center w-1/2 p-2 text-sm font-semibold rounded-lg shadow-md cursor-pointer bg-slate-200"
              >
                <BsFillCloudArrowUpFill size={20} />
                <div className="ml-2">Upload</div>
              </label>
              <input
                className="hidden"
                type="file"
                id="uploadFile"
                accept="application/pdf"
                multiple={true}
                onChange={onPdfFileUpload}
              />
            </div>
          ) : (
            <FileResultList
              pdfList={pdfFileList}
              onDeleteClick={onDeleteTarget}
              onOpenClick={onPdfOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
