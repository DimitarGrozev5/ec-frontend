import { useCallback, useRef, useState } from "react";
import { tw } from "../../../util/tw";
import { useNavigate } from "react-router-dom";
import Header2 from "../../ui/text/h2";
import Draggable from "../../common/draggable/draggable";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../../ui/button/button";
import { useUploadFile } from "../../../api/api";

const AddPhotoPage: React.FC = () => {
  // Setup File Upload handler
  const navigate = useNavigate();
  const { isLoading, mutate: uploadFile } = useUploadFile(() => {
    navigate("/photos");
  });

  // Ref to hold the file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Ref to hold the loaded file
  const loadedFileRef = useRef<File | null>(null);
  // Ref to hold the url for the file in order to preview it
  const photoUrlRef = useRef<string | null>(null);

  // State that indicates if a file is loaded in memory
  const [fileIsLoaded, setFileIsLoaded] = useState(false);

  // Handler for loading a file in memory
  const onOpenFile = useCallback((files: FileList) => {
    if (files.length === 0) {
      return;
    }
    loadedFileRef.current = files[0];
    photoUrlRef.current = URL.createObjectURL(files[0]);

    if (fileInputRef.current) {
      fileInputRef.current.files = files;
    }

    setFileIsLoaded(true);
  }, []);

  // Handler for removing a file from memory
  const onRemoveFile = useCallback(() => {
    loadedFileRef.current = null;
    setFileIsLoaded(false);
  }, []);

  // Handler for submitting the form
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      uploadFile(loadedFileRef.current);
    },
    [uploadFile]
  );

  return (
    <form
      className={tw(
        "self-stretch px-4",
        "flex flex-col items-stretch gap-4",
        "md:w-[30rem] md:self-center",
        "lg:w-[50rem]"
      )}
      onSubmit={onSubmit}
    >
      <Header2 center>Upload new file</Header2>
      <input
        type="file"
        id="photo-file"
        ref={fileInputRef}
        hidden
        accept=".txt, .csv"
        onChange={(event) =>
          event.target.files && onOpenFile(event.target.files)
        }
      />
      {fileIsLoaded ? (
        <>
          <div
            className={tw(
              "flex flex-row items-center gap-1",
              "px-5 py-4",
              "border border-dashed border-zinc-500 bg-zinc-900 rounded-lg"
            )}
          >
            <p className="flex-1">{loadedFileRef.current?.name}</p>

            <button onClick={onRemoveFile}>
              <XMarkIcon className="w-6 h-6 cursor-pointer" />
            </button>
          </div>

          <img src={photoUrlRef.current ?? ""} alt="Image preview" />

          <Button
            loading={isLoading}
            variant="contained"
            className={tw("self-stretch")}
          >
            Upload
          </Button>
        </>
      ) : (
        <Draggable
          onDrop={onOpenFile}
          acceptExtensions={[".jpg"]}
          className="min-h-[50vh]"
        >
          <div
            onClick={() => fileInputRef.current?.click()}
            className={tw(
              "flex-1 self-stretch",
              "flex flex-col items-center justify-center",
              "cursor-default"
            )}
          >
            <h2 className="text-xl">Drop file here or click to browse files</h2>
            <h3>
              Accepted formats: <span className="font-semibold">.jpg</span>
            </h3>
          </div>
        </Draggable>
      )}
    </form>
  );
};

export default AddPhotoPage;
