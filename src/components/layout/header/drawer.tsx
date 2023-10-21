import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NavigationLink from "./nav-link";
import { adimnNavLinks, navLinks } from "./nav-links";
import { tw } from "../../../util/tw";
import { useAuth } from "../../../contexts/auth/use-auth";

const Drawer: React.FC = () => {
  const { isAdmin } = useAuth();
  return (
    <Menu as="div" className="block md:hidden">
      <Menu.Button className="">
        <Bars3Icon className="w-8 h-8" aria-hidden="true" />
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
            "fixed inset-0 right-1/4 z-50",
            "bg-zinc-800",
            "px-6 pt-6",
            "flex flex-col gap-4"
          )}
        >
          <Menu.Item>
            <button>
              <XMarkIcon className="w-8 h-8 mt-3 ml-2" />
            </button>
          </Menu.Item>
          {navLinks.map((link) => (
            <Menu.Item key={link.to}>
              {({ close }) => (
                <NavigationLink to={link.to} onClick={close}>
                  {link.caption}
                </NavigationLink>
              )}
            </Menu.Item>
          ))}
          <div className="self-stretch border-b border-b-zinc-500" />
          {isAdmin &&
            adimnNavLinks.map((link) => (
              <Menu.Item key={link.to}>
                {({ close }) => (
                  <NavigationLink to={link.to} onClick={close}>
                    {link.caption}
                  </NavigationLink>
                )}
              </Menu.Item>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Drawer;
