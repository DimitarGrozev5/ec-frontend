import { Controller, useForm } from "react-hook-form";
import { tw } from "../../../util/tw";
import Button from "../../ui/button/button";
import PasswordInput from "../../ui/input/password-input";
import TextInput from "../../ui/input/text-input";
import Link from "../../ui/link/link";
import Header2 from "../../ui/text/h2";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useLogin } from "../../../api/api";

type Props = {
  goToRegisterHandler: () => void;
};

const LoginForm_Schema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

type LoginForm = zod.infer<typeof LoginForm_Schema>;

const HomePageLoginForm: React.FC<Props> = ({ goToRegisterHandler }) => {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginForm_Schema),
  });

  const { isLoading, mutate: login } = useLogin();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        login(data);
      })}
      className={tw("w-full", "flex flex-col gap-4 items-stretch")}
    >
      <Header2 className="text-center">Login</Header2>

      <Controller
        name="email"
        control={control}
        render={({
          field: { value, onChange, onBlur },
          formState: { errors },
        }) => (
          <TextInput
            label="Email"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({
          field: { value, onChange, onBlur },
          formState: { errors },
        }) => (
          <PasswordInput
            label="Password"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      <Button variant="contained" loading={isLoading}>
        Login
      </Button>

      <Link onClick={goToRegisterHandler} className={"text-right"}>
        Don't have an account?
      </Link>
    </form>
  );
};

export default HomePageLoginForm;
