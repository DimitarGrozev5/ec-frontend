import { useCallback, useState } from "react";
import { tw } from "../../../util/tw";
import HomePageImages from "./home-page-images";
import HomePageLoginForm from "./login-form";
import HomePageRegisterForm from "./register-form";
import { useAuth } from "../../../contexts/auth/use-auth";

const HomePage: React.FC = () => {
  const { isAuth } = useAuth();

  // State to switch betweeen displaying Login and Register Form
  const [showLogin, setShowLogin] = useState(true);
  const goToLoginHandler = useCallback(() => {
    setShowLogin(true);
  }, []);
  const goToRegisterHandler = useCallback(() => {
    setShowLogin(false);
  }, []);

  return (
    <div
      className={tw(
        "flex-1 self-stretch",
        "flex flex-col items-stretch gap-5",
        "lg:flex-row"
      )}
    >
      <HomePageImages />

      {!isAuth && (
        <div
          className={tw(
            "relative self-center",
            "flex flex-col items-center justify-center",
            "min-h-screen",
            "px-4",
            "w-full",
            "md:w-[25rem]",
            "lg:min-w-[25rem]"
          )}
        >
          <div
            className={tw(
              "absolute inset-x-0 -top-20",
              "flex flex-row justify-center gap-3",
              "lg:hidden"
            )}
          >
            <a
              href="#login-anchor"
              onClick={goToLoginHandler}
              className={tw(
                "bg-zinc-800",
                "px-4 py-2",
                "rounded-full",
                "border border-zinc-700"
              )}
            >
              Login
            </a>
            <a
              href="#login-anchor"
              onClick={goToRegisterHandler}
              className={tw(
                "bg-zinc-800",
                "px-4 py-2",
                "rounded-full",
                "border border-zinc-700"
              )}
            >
              Register
            </a>
          </div>
          <div className="invisible" id="login-anchor"></div>

          {showLogin ? (
            <HomePageLoginForm goToRegisterHandler={goToRegisterHandler} />
          ) : (
            <HomePageRegisterForm goToLoginHandler={goToLoginHandler} />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
