import { Controller, useForm } from "react-hook-form";
import { tw } from "../../../util/tw";
import Button from "../../ui/button/button";
import PasswordInput from "../../ui/input/password-input";
import TextInput from "../../ui/input/text-input";
import Link from "../../ui/link/link";
import Header2 from "../../ui/text/h2";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useRegister } from "../../../api/api";

type Props = {
  goToLoginHandler: () => void;
};

const RegisterForm_Schema = zod
  .object({
    email: zod.string().min(1, "Please enter an email").email(),
    password: zod.string().min(6, "Password must be at least 6 characters"),
    rePassword: zod.string().min(6, "Password must be at least 6 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.rePassword) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ["rePassword"],
        message: "Passwords don't match",
      });
    }
  });

type RegisterForm = zod.infer<typeof RegisterForm_Schema>;

const HomePageRegisterForm: React.FC<Props> = ({ goToLoginHandler }) => {
  const { control, handleSubmit } = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(RegisterForm_Schema),
  });

  const { isLoading, mutate: register } = useRegister(() => {
    goToLoginHandler();
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        register(data);
      })}
      className={tw("w-full", "flex flex-col gap-4 items-stretch")}
    >
      <Header2 className="text-center">Register</Header2>

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
      <Controller
        name="rePassword"
        control={control}
        render={({
          field: { value, onChange, onBlur },
          formState: { errors },
        }) => (
          <PasswordInput
            label="Repeat password"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.rePassword?.message}
          />
        )}
      />

      <Button variant="contained" loading={isLoading}>
        Register
      </Button>

      <Link onClick={goToLoginHandler} className={"text-right"}>
        Already have an account?
      </Link>
    </form>
  );
};

export default HomePageRegisterForm;
