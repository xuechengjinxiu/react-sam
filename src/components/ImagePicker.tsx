import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AppContext from "./hooks/createContext";
export interface ImagePickerProps {
  handleSelectedImage: (
    data: File | URL,
    options?: { shouldDownload?: boolean; shouldNotFetchAllModel?: boolean }
  ) => void;
  showGallery: [showGallery: boolean, setShowGallery: (e: boolean) => void];
}

const ImagePicker = ({
  handleSelectedImage,
  showGallery: [showGallery, setShowGallery],
}: ImagePickerProps) => {
  const [error, setError] = useState<string>("");
  const [isLoadedCount, setIsLoadedCount] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const {
    enableDemo: [enableDemo, setEnableDemo],
  } = useContext(AppContext)!;

  const isMobile = window.innerWidth < 768;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    onDrop: (acceptedFile) => {
      try {
        if (acceptedFile.length === 0) {
          setError("File not accepted! Try again.");
          return;
        }
        if (acceptedFile.length > 1) {
          setError("Too many files! Try again with 1 file.");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          handleSelectedImage(acceptedFile[0]);
        };
        reader.readAsDataURL(acceptedFile[0]);
      } catch (error) {
        console.log(error);
      }
    },
    maxSize: 50_000_000,
  });

  return (
    <div className="pt-6 mx-4">
      {/*!enableDemo && <StarterModal />*/}
      {/* <Button onClick={downloadAllImageResponses}>
        Download All Image Responses
      </Button> */}
      <div className="flex flex-row py-5 text-sm align-middle md:text-lg">
        {/* <AiOutlineArrowDown className="mr-2" /> */}
        <div className="flex items-center">
          <span {...getRootProps()}>
            <input {...getInputProps()} />
            <button className="ml-1 text-blue-700 underline">
              请上传一张图片
            </button>
          </span>
        </div>
      </div>
      <div
        className={`h-full w-full overflow-y-scroll pb-20 ${
          showGallery ? "fade-in" : ""
        }`}
      >
      </div>
    </div>
  );
};

export default ImagePicker;
