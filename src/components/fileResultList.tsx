import { AiOutlineFilePdf } from "react-icons/ai";

interface Props {
  pdfList: Array<File>;
  onOpenClick: (e: any) => void;
  onDeleteClick: (e: any) => void;
}
export const FileResultList = ({
  pdfList,
  onOpenClick,
  onDeleteClick,
}: Props) => {
  return (
    <>
      {pdfList.map((item, index) => (
        <div className="flex w-full">
          <div
            key={index}
            className="w-full h-[30px] flex justify-between shadow-sm"
          >
            <div onClick={onOpenClick} className="">
              <div className="flex items-center justify-center text-sm">
                <AiOutlineFilePdf className="mr-2"/>
                {item.name}
              </div>
            </div>
            <button className="text-sm rounded-full" onClick={onDeleteClick}>
              X
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
