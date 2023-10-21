import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../ui/pagination/pagination";
import { useGetUsers, useGetUsersCount } from "../../../api/api";
import { tw } from "../../../util/tw";
import Header2 from "../../ui/text/h2";
import UserCard from "../../common/user-card/user-card";

const UsersPage: React.FC = () => {
  const navigate = useNavigate();

  // Get page index from search params
  const { search } = useLocation();

  const page = useMemo(() => {
    const page = new URLSearchParams(search).get("page");
    return page === null ? 1 : parseInt(page);
  }, [search]);

  // Fetch users
  const { data: users, refetch } = useGetUsers({
    limit: 10,
    page,
    order: "desc",
    orderBy: "photosCount",
  });

  // Refresh users when page changes
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  // Calculate total number of pages
  const { data: photosCount, isLoading: loadingCount } = useGetUsersCount();
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
      <Header2>Users</Header2>
      <div
        className={tw(
          "self-stretch",
          "grid grid-cols-1 grid-flow-row gap-8",
          "sm:grid-cols-2",
          "md:grid-cols-3",
          "lg:w-[90vw] lg:self-center",
          "xl:w-[80vw]",
          "px-2"
        )}
      >
        {users?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <Pagination page={page} max={max} setPage={navigateToPage} />
    </>
  );
};

export default UsersPage;
