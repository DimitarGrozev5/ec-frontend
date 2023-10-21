import { useEffect, useState } from "react";
import Button from "../../ui/button/button";
import { tw } from "../../../util/tw";
import { ClassValue } from "clsx";

type Props = {
  onDrop: (files: FileList) => void;
  acceptMultiple?: boolean;
  acceptExtensions?: string[];
  children: React.ReactNode;
  className?: ClassValue;
};

/**
 * Wrapper Component that allows file drag & drop
 * @param onDrop Handler that loads the file
 * @param [acceptMultiple] Flag to accept multple files
 * @param acceptExtensions Array of accepted file extensions, e.g. ["*.ext"]
 * @param className CSS class names
 * @returns
 */
const Draggable: React.FC<Props> = ({
  onDrop,
  acceptMultiple = false,
  acceptExtensions = [],
  children,
  className,
}) => {
  const [dragging, setDragging] = useState(0);

  const [warning, setWarning] = useState("");

  const [autoConfirmLabel, setAutoConfirmLabel] = useState(0);

  useEffect(() => {
    if (warning !== "") {
      const target = new Date().getTime() + 5000;
      const timer = setInterval(() => {
        const now = new Date().getTime();

        if (now > target) {
          setWarning("");
          clearInterval(timer);
        } else {
          setAutoConfirmLabel(Math.round((target - now) / 1000));
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [warning]);

  const dragInHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging((prev) => prev + 1);
  };

  const dragOutHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging((prev) => prev - 1);
  };

  const dragHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files.length > 0
    ) {
      if (!acceptMultiple && event.dataTransfer.files.length > 1) {
        setWarning("Only one file is allowed");
        setDragging(0);
        event.dataTransfer.clearData();
        return;
      }

      const files = event.dataTransfer.files;

      if (
        acceptExtensions.length === 0 ||
        acceptExtensions.find((ext) =>
          files[0].name.toLowerCase().endsWith(ext)
        )
      ) {
        onDrop(files);
      } else {
        setWarning("Unsupported file type");
      }

      event.dataTransfer.clearData();
    }
    setDragging(0);
  };

  return (
    <div
      onDragEnter={dragInHandler}
      onDragLeave={dragOutHandler}
      onDragOver={dragHandler}
      onDrop={dropHandler}
      className={tw(
        "border-4 border-dashed border-zinc-500 bg-zinc-900",
        "self-stretch flex-1 m-2",
        "flex flex-col items-center justify-center gap-2",
        "text-zinc-400",
        dragging > 0 && "border-zinc-500 bg-zinc-700",
        dragging > 0 && "text-zinc-300",
        className
      )}
    >
      {warning === "" ? (
        children
      ) : (
        <>
          <h1 className="text-xl font-semibold text-red-700">{warning}</h1>
          <Button variant="contained" onClick={() => setWarning("")}>
            OK ({autoConfirmLabel})
          </Button>
        </>
      )}
    </div>
  );
};

export default Draggable;
