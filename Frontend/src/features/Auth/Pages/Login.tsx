import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import FieldError from "../Components/FieldError";
import { useAuth } from "../Hooks/useAuth";
import type { UserAuthResponse } from "../../../types";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.email("Invalid Email Format!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters!")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      "Must contain uppercase, lowercase, number, and special character",
    ),
});

const Login = () => {
  
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({resolver: zodResolver(schema)})

  const onSubmit = async(data: any) => {
(async () => {
      try {
        const response: UserAuthResponse = await handleLogin(data);

        if(response){
          toast.success(
            "Account LoggedIn Successfully!",
            {
              duration: 2000,
              position: "top-center",
            },
          );
        }

        setTimeout(() => {
          navigate("/chats");
        }, 1500);
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    })();
  }

  return (
    <div
      id="login"
      className="flex min-h-screen w-full items-center justify-center bg-(--color-background) p-(--space-md) font-(--font-family) text-(--color-text-primary)"
    >
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-100 flex-col gap-(--space-lg) rounded-(--radius-lg) bg-(--color-surface) p-(--space-xl) shadow-(--shadow-lg)"
      >
        <div className="text-center">
          <h1 className="mb-(--space-xs) text-(--font-size-xl) font-semibold">
            Welcome Back
          </h1>
          <p className="text-(--font-size-sm) text-(--color-text-secondary)">
            Log in to your account.
          </p>
        </div>

        <div>
          <div className="flex min-h-20 flex-col gap-(--space-xs)">
            <label
              htmlFor="email"
              className="text-(--font-size-sm) font-medium text-(--color-text-secondary)"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
            {errors.email?.message && <FieldError error={errors.email.message}/>}
          </div>

          <div className="flex min-h-20 flex-col gap-(--space-xs)">
            <label
              htmlFor="password"
              className="text-(--font-size-sm) font-medium text-(--color-text-secondary)"
              >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="********"
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
              />

            {errors.password?.message && <FieldError error={errors.password.message}/>}
          </div>

          <div className="min-h-20">
            <button
              type="submit"
              className="mt-(--space-sm) w-full rounded-(--radius-md) bg-(--color-primary) p-(--space-md) text-(--font-size-md) font-semibold text-white transition-colors duration-150 hover:bg-(--color-primary-hover) active:scale-[0.98]"
            >
              Log In
            </button>
          </div>
        </div>

        <div className="text-center text-(--font-size-sm) text-(--color-text-secondary)">
          Don&apos;t have an account?{" "}
          <a
            href="/"
            className="font-medium text-(--color-primary) transition-colors duration-150 hover:text-(--color-primary-hover) hover:underline"
          >
            Create one
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
