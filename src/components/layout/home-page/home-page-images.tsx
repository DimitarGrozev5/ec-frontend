import { useGetPhotos } from "../../../api/api";
import { tw } from "../../../util/tw";
import Image from "../../common/image/image";

const HomePageImages: React.FC = () => {
  const { data: photos, isLoading } = useGetPhotos({ limit: 10, page: 1 });

  return (
    <div
      className={tw("flex flex-col items-stretch gap-8", "px-2", "lg:flex-1")}
    >
      <div className={tw("h-[19vh]", "flex flex-row items-stretch gap-8")}>
        <Image isLoading={isLoading} photo={photos && photos[0]} />
        <Image isLoading={isLoading} photo={photos && photos[1]} />
      </div>
      <div className={tw("h-[19vh]", "flex flex-row items-stretch gap-8")}>
        <Image isLoading={isLoading} photo={photos && photos[2]} />
        <Image isLoading={isLoading} photo={photos && photos[3]} />
        <Image isLoading={isLoading} photo={photos && photos[4]} />
      </div>
      <div className={tw("h-[19vh]", "flex flex-row items-stretch gap-8")}>
        <Image isLoading={isLoading} photo={photos && photos[5]} />
        <Image isLoading={isLoading} photo={photos && photos[6]} />
        <Image isLoading={isLoading} photo={photos && photos[7]} />
      </div>
      <div className={tw("h-[19vh]", "flex flex-row items-stretch gap-8")}>
        <Image isLoading={isLoading} photo={photos && photos[8]} />
        <Image isLoading={isLoading} photo={photos && photos[9]} />
      </div>
    </div>
  );
};

export default HomePageImages;
