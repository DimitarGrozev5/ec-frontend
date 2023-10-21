import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeletePhoto,
  useGetPhoto,
  useGetPhotoComments,
} from "../../../api/api";
import { tw } from "../../../util/tw";
import { getImgUrl } from "../../../util/get-img-url";
import AddCommentForm from "./add-comment-form";
import { useAuth } from "../../../contexts/auth/use-auth";
import Button from "../../ui/button/button";
import { XMarkIcon } from "@heroicons/react/20/solid";

const PhotoPage: React.FC = () => {
  const { userId, isAuth } = useAuth();

  // Get photoId from URL params
  const { photoId } = useParams();

  // Navigate away if param is not provided
  const navigate = useNavigate();
  useEffect(() => {
    if (!photoId) {
      navigate("/photos");
    }
  }, [navigate, photoId]);

  // Fetch photo and comments
  const { data: photo } = useGetPhoto(photoId ?? "");
  const { data: comments } = useGetPhotoComments(photoId ?? "");

  // Setup handler to delete photo
  const { isLoading, mutate: del } = useDeletePhoto(photoId ?? "", () =>
    navigate("/photos")
  );

  return (
    <div
      className={tw("flex-1", "flex flex-col items-stretch gap-4", "px-4 pb-4")}
    >
      <div className="relative max-w-[60rem]">
        <img
          src={getImgUrl(photo?.url ?? "")}
          className={tw(
            "object-contain",
            "w-full",
            "h-full",
            "max-w-full",
            "max-h-full"
          )}
        />
        {userId === photo?.userId.toString() && (
          <Button
            loading={isLoading}
            onClick={() => del(undefined)}
            variant="contained"
            className="absolute right-2 top-2"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="relative flex-1 min-h-[50vh]">
        <div
          className={tw(
            "absolute inset-0 overflow-auto",
            "flex flex-col items-start gap-4"
          )}
        >
          {comments?.map((comment) => (
            <div key={comment.id}>
              <p className="text-xs">{comment.madeBy.email}</p>
              <div
                className={tw(
                  "bg-zinc-800",
                  "border border-zinc-500 rounded-lg",
                  "px-3 py-2"
                )}
              >
                {comment.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAuth && <AddCommentForm photoId={photoId ?? ""} />}
    </div>
  );
};

export default PhotoPage;
