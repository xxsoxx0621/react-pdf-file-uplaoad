import {useState} from "react";
import {Document, Page} from 'react-pdf';


interface Props {
    fileUrl: string | undefined,
}

export const ViewPDF = ({fileUrl}: Props) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}: any) {
        setNumPages(numPages);
    }

    return (
        <>
            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber}/>
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </>
    )
}