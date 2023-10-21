import { useGetPhotos, useGetUsers } from "../../../api/api";
import { getImgUrl } from "../../../util/get-img-url";
import { tw } from "../../../util/tw";
import UserCard from "../../common/user-card/user-card";
import Header2 from "../../ui/text/h2";
import Header3 from "../../ui/text/h3";

const AdminDashPage: React.FC = () => {
  // Fetch last 5 registered users
  const { data: users } = useGetUsers({
    limit: 5,
    page: 1,
    orderBy: "createdOn",
    order: "desc",
  });

  // Fetch last 5 uploaded photos
  const { data: photos } = useGetPhotos({
    limit: 5,
    page: 1,
    orderBy: "createdOn",
    order: "desc",
  });

  return (
    <div
      className={tw(
        "self-stretch px-2",
        "flex flex-col items-stretch gap-4",
        "lg:flex-row"
      )}
    >
      <div className={tw("flex flex-col items-stretch gap-4", "lg:flex-1")}>
        <Header2 center>Newest Users</Header2>
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className={tw("flex flex-col items-stretch gap-4", "lg:flex-1")}>
        <Header2 center>Newest Photos</Header2>
        {photos?.map((photo) => (
          <div
            key={photo.id}
            className={tw(
              "bg-contain bg-no-repeat bg-center",
              "min-h-[30vh] lg:min-h-[45vh]",
              "flex flex-col items-center justify-center"
            )}
            style={{
              backgroundImage: photo.url
                ? `url(${getImgUrl(photo.url)})`
                : "none",
            }}
          >
            <Header3 className={tw("p-2", "bg-black bg-opacity-50 rounded-lg")}>
              {photo.User.email}
            </Header3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashPage;
