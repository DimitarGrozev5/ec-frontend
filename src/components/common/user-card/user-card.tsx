import { PhotoIcon, UserIcon } from "@heroicons/react/20/solid";
import { User } from "../../../api/api";
import { tw } from "../../../util/tw";

type Props = {
  user: User;
};

/**
 * Component that displays User email and number of uploaded photos
 * @param user User object
 */
const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div
      className={tw(
        "px-3 py-4",
        "bg-zinc-800 border border-zinc-500 rounded-lg",
        "flex flex-col items-stretch gap-2"
      )}
    >
      <div className="flex flex-row gap-2 items-center">
        <UserIcon className="w-6 h-6" />
        {user.email}
      </div>
      <div className="flex flex-row items-end gap-3">
        {user.photosCount === 0 && (
          <p className="italic text-sm">No photos added yet</p>
        )}
        {Array(user.photosCount)
          .fill("")
          .map((_, i) => (
            <PhotoIcon
              key={i}
              style={{
                width: `${1 + i * 0.1}rem`,
                height: `${1 + i * 0.1}rem`,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default UserCard;
