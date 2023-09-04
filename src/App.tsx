import React, { useState } from "react";
import "./App.css";
import { ViewPDF } from "./ViewPDF";
import { pdfjs } from "react-pdf";
import { FileResultList } from "./components/fileResultList";
import { BsFillCloudArrowUpFill } from "react-icons/bs";

// workerSrc defination
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  visible: boolean;
}

// const MainContainer = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   height: 600px;
// `;
// const FileContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   height: 200px;
// `;
// const FileList = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 80%;
//   height: 100%;
//   border: 1px solid black;
// `;
// const FileListTitle = styled.div`
//   display: flex;
//   align-items: center;
//   height: 20%;
//   border-bottom: 1px solid black;
//   padding-left: 10px;
// `;
// const FileListBody = styled.div`
//   display: flex;
//   height: 80%;
//   align-items: center;
//   justify-content: center;
// `;

// const FileResultBody = styled.div`
//   display: flex;
//   width: 100%;
//   height: 80%;
//   overflow: scroll;
// `;
// const FileResultRow = styled.div`
//   width: 100%;
//   height: 30px;
//   display: flex;
//   align-items: center;
//   padding-left: 10px;
//   justify-content: space-between;
// `;
// const Input = styled.input`
//   position: absolute;
//   width: 0;
//   height: 0;
//   padding: 0;
//   overflow: hidden;
//   border: 0;
// `;

// const Label = styled.label`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100px;
//   height: 30px;
//   border: 1px solid gray;
//   border-radius: 5px;
//   font-size: 13px;
// `;

// const ModalOverlay = styled.div<Props>`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? "flex" : "none")};
//   justify-content: center;
//   align-items: center;
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 999;
// `;
// const DeleteButton = styled.button`
//   margin-right: 10px;
// `;
// const PdfContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-bottom: 10px;
// `;
// const CloseButton = styled.button`
//   width: 50px;
// `;

function App() {
  const [pdfFileList, setPdfFileList] = useState<Array<File>>([]);
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  const getUrl = (file: File) => {
    const blob = new Blob([file]);
    const pdfUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfUrl);
  };
  const onPdfFileUpload = (e: any) => {
    const selectedList: Array<File> = Array.from(e.target.files);
    const getAddList = selectedList.map((item) => item);
    getUrl(getAddList[0]);
    setPdfFileList(selectedList);
  };
  const onDeleteTarget = () => {
    setPdfFileList([]);
  };

  const onPdfClose = (e: any) => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center w-screen h-screen">
      <div className="flex items-center justify-center w-full h-full">
        <div className="hidden">
          <div>
            <div>
              <button onClick={onPdfClose}>X</button>
            </div>
            <ViewPDF fileUrl={pdfUrl} />
          </div>
        </div>
        <div className="flex-col w-1/2 p-4 border rounded-lg h-[500px]">
          <div className="flex justify-center text-md h-1/6">
            PDF File Upload
          </div>
          {pdfFileList.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-5/6">
              <div className="w-full border border-dashed h-2/4">no files</div>
              <div className="flex h-1/4">
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
            </div>
          ) : (
            <FileResultList
              pdfList={pdfFileList}
              onDeleteClick={onDeleteTarget}
              onOpenClick={onPdfClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
