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
    <div className="mt-4">
      {pdfList.map((item, index) => (
        <div
          className="flex w-full"
          key={`pdf` + index}
        >
          <div
            key={index}
            className="w-full h-[30px] flex justify-between shadow-sm items-center"
          >
            <div
              id={`${index}`}
              onClick={onOpenClick}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-center overflow-scroll text-sm">
                <AiOutlineFilePdf className="mr-2" />
                <div id={`${index}`} className="w-full overflow-hidden">
                  {item.name}
                </div>
              </div>
            </div>
            <button
              id={`${index}`}
              className="text-sm rounded-full"
              onClick={onDeleteClick}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
