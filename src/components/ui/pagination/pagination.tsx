import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { tw } from "../../../util/tw";
import Button from "../button/button";

type Props = {
  page: number;
  max: number;
  setPage: (page: number) => void;
};

/**
 * Pagination Component
 * @param page Current displayed page
 * @param max Total number of pages
 * @param setPage Handler to set the current page
 */
const Pagination: React.FC<Props> = ({ page, max, setPage }) => {
  return (
    <div className={tw("flex flex-row gap-4 items-center justify-center")}>
      {page > 1 && (
        <Button onClick={() => setPage(page - 1)}>
          <ChevronLeftIcon className="w-8 h-8" />
        </Button>
      )}
      {page > 3 && <Button onClick={() => setPage(1)}>1</Button>}
      {page > 4 && <EllipsisHorizontalIcon className="w-6 h-6" />}

      {Array(5)
        .fill("")
        .map((_, i) => {
          const pg = page + i - 2;
          if (pg < 1 || pg > max) return null;
          return (
            <Button
              key={pg}
              onClick={() => setPage(pg)}
              variant={pg === page ? "contained" : "plain"}
            >
              {pg}
            </Button>
          );
        })}

      {page < max - 3 && <EllipsisHorizontalIcon className="w-6 h-6" />}
      {page < max - 2 && <Button onClick={() => setPage(max)}>{max}</Button>}
      {page < max && (
        <Button onClick={() => setPage(page + 1)}>
          <ChevronRightIcon className="w-8 h-8" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
