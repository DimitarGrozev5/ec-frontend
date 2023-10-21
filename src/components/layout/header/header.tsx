import { tw } from "../../../util/tw";
import Header1 from "../../ui/text/h1";
import NavigationLink from "./nav-link";
import { adimnNavLinks, navLinks } from "./nav-links";
import Drawer from "./drawer";
import { useAuth } from "../../../contexts/auth/use-auth";
import ProfileMenu from "./profile-menu";

const Header: React.FC = () => {
  const { isAuth, isAdmin } = useAuth();
  return (
    <header
      className={tw(
        "border border-black",
        "flex flex-row justify-between items-center gap-4",
        "h-28 px-8",
        "bg-black"
      )}
    >
      <Drawer />

      <Header1>PhotoAPP</Header1>

      <nav className={tw("hidden md:block")}>
        <ul className={tw("flex flex-row gap-8 items-center justify-between")}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavigationLink to={link.to}>{link.caption}</NavigationLink>
            </li>
          ))}
          <div
            className={tw("self-stretch", "border-l border-l-zinc-500")}
          ></div>
          {isAdmin &&
            adimnNavLinks.map((link) => (
              <li key={link.to}>
                <NavigationLink to={link.to}>{link.caption}</NavigationLink>
              </li>
            ))}
        </ul>
      </nav>

      <div>{isAuth && <ProfileMenu />}</div>
    </header>
  );
};

export default Header;
