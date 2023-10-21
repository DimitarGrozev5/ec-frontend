import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { tw } from "../../../util/tw";
import Link from "../../ui/link/link";
import { useLogout } from "../../../api/api";

const ProfileMenu: React.FC = () => {
  const { mutate: logout } = useLogout();
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="">
        <UserCircleIcon className="w-10 h-10" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={tw(
            "absolute right-0 top-0 translate-y-10 z-40",
            "flex flex-col items-stretch",
            "p-2 min-w-[7rem]",
            "bg-zinc-700",
            "border border-zinc-600 rounded-md"
          )}
        >
          <Menu.Item>
            <Link to="/profile" className="text-right py-1">
              Profile
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/photos/add" className="text-right py-1">
              Add photo
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link onClick={() => logout()} className="text-right py-1">
              Logout
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
