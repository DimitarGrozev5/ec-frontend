import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { tw } from "../../../util/tw";
import Link from "../../ui/link/link";
import { useGetPhotos, useGetPhotosCount } from "../../../api/api";
import Image from "../../common/image/image";
import { useAuth } from "../../../contexts/auth/use-auth";
import { useCallback, useEffect, useMemo } from "react";
import Pagination from "../../ui/pagination/pagination";

const PhotosPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  // Get page index from search params
  const { search } = useLocation();

  const page = useMemo(() => {
    const page = new URLSearchParams(search).get("page");
    return page === null ? 1 : parseInt(page);
  }, [search]);

  // Fetch photos
  const {
    data: photos,
    isLoading,
    refetch,
  } = useGetPhotos({ limit: 10, page });

  // Refresh photos when page changes
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  // Calculate total number of pages
  const { data: photosCount, isLoading: loadingCount } = useGetPhotosCount();
  const max = useMemo(
    () => Math.ceil((loadingCount ? page : Number(photosCount)) / 10),
    [loadingCount, page, photosCount]
  );

  // Update page index search param
  const navigateToPage = useCallback(
    (page: number) => {
      navigate(`/photos/?page=${page}`);
    },
    [navigate]
  );

  return (
    <>
      <div
        className={tw(
          "self-stretch",
          "grid grid-cols-1 grid-flow-row gap-8",
          "sm:grid-cols-2",
          "md:grid-cols-3",
          "lg:w-[90vw] lg:self-center",
          "xl:w-[80vw]",
          "px-2",
          "min-h-screen"
        )}
      >
        {isAuth && (
          <Link
            to="/photos/add"
            className={tw(
              "py-4",
              "bg-zinc-800 hover:bg-zinc-900",
              "border border-dashed border-zinc-500 rounded-lg",
              "flex flex-row items-center justify-center gap-2",
              "transition-all duration-150"
            )}
          >
            <PlusCircleIcon className="w-8 h-8" />
            Add your own Photo
          </Link>
        )}

        {photos === undefined
          ? Array(5)
              .fill("")
              .map((_, i) => (
                <Image key={i} isLoading={isLoading} photo={undefined} />
              ))
          : photos.map((photo) => (
              <Image
                key={photo.id}
                isLoading={isLoading}
                photo={photo}
                className="min-h-[20rem]"
              />
            ))}
      </div>
      <Pagination page={page} max={max} setPage={navigateToPage} />
    </>
  );
};

export default PhotosPage;
