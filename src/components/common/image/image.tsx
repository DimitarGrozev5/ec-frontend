import { ClassValue } from "clsx";
import { Photo } from "../../../api/api";
import { tw } from "../../../util/tw";
import Link from "../../ui/link/link";
import { getImgUrl } from "../../../util/get-img-url";

type Props = {
  isLoading: boolean;
  photo: Photo | undefined;
  className?: ClassValue;
};

const Image: React.FC<Props> = ({ isLoading, photo, className }) => {
  const fullUrl = getImgUrl(photo?.url ?? "");
  return (
    <div
      className={tw(
        "group/card",
        "flex-1",
        "overflow-hidden",
        "relative",
        "bg-cover bg-no-repeat bg-center",
        isLoading && "bg-zinc-800 animate-pulse",
        !photo?.url && "hidden",
        className
      )}
      style={{
        backgroundImage: photo?.url ? `url(${fullUrl})` : "none",
      }}
    >
      {!!photo && (
        <>
          <div
            className={tw(
              "absolute inset-0",
              "lg:backdrop-saturate-0 lg:group-hover/card:backdrop-saturate-100",
              "transition-all duration-200"
            )}
          />
          <Link to={`/photos/${photo.id}`} className="absolute inset-0"></Link>
        </>
      )}
    </div>
  );
};

export default Image;
