import React, {useState} from 'react';
import './App.css';
import styled from "styled-components";
import {ViewPDF} from "./ViewPDF";
import {pdfjs} from 'react-pdf';

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
    visible: boolean
}

const MainContainer = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    height:600px;
`;
const FileContainer = styled.div`
       display:flex;
       justify-content:center;
       width:100%;
       height:200px;
`
const FileList = styled.div`
      display:flex;
      flex-direction:column;
      width:80%;
      height:100%;
      border:1px solid black;
`;
const FileListTitle = styled.div`
       display:flex;
       align-items:center;
       height:20%;
       border-bottom:1px solid black;
       padding-left:10px;
`;
const FileListBody = styled.div`
       display:flex;
       height:80%;
       align-items:center;
       justify-content:center;    
`;

const FileResultBody = styled.div`
       display:flex;
       width:100%;
       height:80%;
       overflow:scroll;
`;
const FileResultRow = styled.div`
        width:100%;
        height:30px;
        display:flex;
        align-items:center;
        padding-left:10px;
        justify-content:space-between;
        
`;
const Input = styled.input`
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        overflow: hidden;
        border: 0;
`;

const Label = styled.label`
        display:flex;
        align-items:center;
        justify-content:center;
        width:100px;
        height:30px;
        border:1px solid gray;
        border-radius:5px;
        font-size:13px;
`;

const ModalOverlay = styled.div<Props>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`
const DeleteButton = styled.button`
    margin-right:10px;
`
const PdfContainer = styled.div`
    display:flex;
    flex-direction:column;
`;

const ButtonContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    margin-bottom:10px;
    
`;
const CloseButton = styled.button`
    width:50px;
`;

function App() {
    const [pdfFileList, setPdfFileList] = useState<Array<File>>([]);
    const [pdfUrl, setPdfUrl] = useState<string>();
    const [showModal, setShowModal] = useState(false);

    const getUrl = (file: File) => {
        const blob = new Blob([file]);
        const pdfUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfUrl);
    }
    const onPdfFileUpload = (e: any) => {
        const selectedList: Array<File> = Array.from(e.target.files);
        const getAddList = selectedList.map(item => item);
        getUrl(getAddList[0]);
        setPdfFileList(selectedList);
    }
    const onDeleteTarget = () => {
        setPdfFileList([]);
    }

    const FileResultList = () => {
        return (
            <>
                {
                    pdfFileList.map((item, index) => (
                        <FileResultBody>
                            <FileResultRow key={index}>
                                <div onClick={onUrlClick} style={{textDecoration: "darkblue"}}>{item.name}</div>
                                <DeleteButton onClick={onDeleteTarget}>X</DeleteButton>
                            </FileResultRow>
                        </FileResultBody>
                    ))
                }
            </>
        )
    }
    const onUrlClick = (e: any) => {
        setShowModal(true);
    };
    const onPdfClose = (e: any) => {
        setShowModal(false);
    }
    return (
        <MainContainer>
            <FileContainer>
                <ModalOverlay visible={showModal}>
                    <PdfContainer>
                        <ButtonContainer>
                            <CloseButton onClick={onPdfClose}>X</CloseButton>
                        </ButtonContainer>
                        <ViewPDF fileUrl={pdfUrl}/>
                    </PdfContainer>
                </ModalOverlay>
                <FileList>
                    <FileListTitle>파일 목록</FileListTitle>
                    {pdfFileList.length === 0 ?
                        <FileListBody>
                            <Label htmlFor="uploadFile">파일 업로드하기</Label>
                            <Input type="file" id="uploadFile" accept="application/pdf" multiple={true}
                                   onChange={onPdfFileUpload}/>
                        </FileListBody>
                        : <FileResultList/>
                    }
                </FileList>
            </FileContainer>
        </MainContainer>
    );
}

export default App;
