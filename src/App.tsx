import React, {useState} from 'react';
import './App.css';
import styled from "styled-components";

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

function App() {
    const [pdfFileList, setPdfFileList] = useState<Array<File>>([]);
    const onPdfFileUpload = (e: any) => {
        const selectedList: Array<File> = Array.from(e.target.files);
        setPdfFileList(selectedList);
        console.log(selectedList);
    }
    const FileResultList = () => {
        return (
            <>
                {
                    pdfFileList.map((item) =>(
                        <FileResultBody>
                            <FileResultRow>{item.name}</FileResultRow>
                        </FileResultBody>
                    ))
                }

            </>
        )
    }
    return (
        <FileContainer>
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
    );
}

export default App;
