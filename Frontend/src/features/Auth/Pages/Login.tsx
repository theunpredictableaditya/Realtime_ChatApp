import { useNavigate, Link } from "react-router-dom";
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
      className="flex min-h-screen w-full items-center justify-center bg-background p-md font-sans text-text-primary"
    >
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-100 flex-col gap-lg rounded-lg bg-surface p-xl shadow-lg"
      >
        <div className="text-center">
          <h1 className="mb-xs text-xl font-semibold">
            Welcome Back
          </h1>
          <p className="text-sm text-text-secondary">
            Log in to your account.
          </p>
        </div>

        <div>
          <div className="flex min-h-20 flex-col gap-xs">
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-secondary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className="w-full rounded-md border border-border bg-surface-light p-md text-md text-text-primary outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_2px_rgb(99_102_241/0.2)]"
            />
            {errors.email?.message && <FieldError error={errors.email.message}/>}
          </div>

          <div className="flex min-h-20 flex-col gap-xs">
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-secondary"
              >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="********"
              className="w-full rounded-md border border-border bg-surface-light p-md text-md text-text-primary outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-text-muted focus:border-primary focus:shadow-[0_0_0_2px_rgb(99_102_241/0.2)]"
              />

            {errors.password?.message && <FieldError error={errors.password.message}/>}
          </div>

          <div className="min-h-20">
            <button
              type="submit"
              className="mt-sm w-full rounded-md bg-primary p-md text-md font-semibold text-white transition-colors duration-150 hover:bg-primary-hover active:scale-[0.98]"
            >
              Log In
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            to="/"
            className="font-medium text-primary transition-colors duration-150 hover:text-primary-hover hover:underline"
          >
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
