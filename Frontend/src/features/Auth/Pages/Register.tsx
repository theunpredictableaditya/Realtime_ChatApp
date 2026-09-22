import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FieldError from "../Components/FieldError";
import { useAuth } from "../Hooks/useAuth";
import type { UserAuthResponse } from "../../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const schema = z.object({
  fullname: z.string().trim().min(1, "Fullname is Required!"),
  username: z
    .string()
    .trim()
    .min(1, "Username is Required")
    .max(12, "Username length must be less than 12")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z.email("Invalid Email Format!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters!")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      "Must contain uppercase, lowercase, number, and special character",
    ),
});

function Register() {
  const navigate = useNavigate();
  const { user, handleRegister } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    ;(async () => {
      try {
        const response: UserAuthResponse = await handleRegister(data);
        
        if(user){
          toast.success("Account Registered Successfully!", {
            duration: 2000,
            position: 'top-center'
          })

          setTimeout(() => {
            navigate("/login")
          }, 1500)
        }
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    })();
  };

  return (
    <div
      id="register"
      className="flex min-h-screen w-full items-center justify-center bg-(--color-background) p-(--space-md) font-(--font-family) text-(--color-text-primary)"
    >
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-100 flex-col gap-(--space-lg) rounded-(--radius-lg) bg-(--color-surface) p-(--space-xl) shadow-(--shadow-lg)"
      >
        <div className="text-center">
          <h1 className="mb-(--space-xs) text-(--font-size-xl) font-semibold">
            Create an Account
          </h1>
          <p className="text-(--font-size-sm) text-(--color-text-secondary)">
            Join us today to get started.
          </p>
        </div>

        <div>
          <div className="flex min-h-20 flex-col gap-(--space-xs)">
            <label
              htmlFor="fullname"
              className="text-(--font-size-sm) font-medium text-(--color-text-secondary)"
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="John Doe"
              {...register("fullname")}
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
            {errors.fullname?.message && (
              <FieldError error={errors.fullname.message} />
            )}
          </div>

          <div className="flex min-h-20 flex-col gap-(--space-xs)">
            <label
              htmlFor="username"
              className="text-(--font-size-sm) font-medium text-(--color-text-secondary)"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="johndoe123"
              {...register("username")}
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
            {errors.username?.message && (
              <FieldError error={errors.username.message} />
            )}
          </div>

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
              placeholder="john@example.com"
              {...register("email")}
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
            {errors.email?.message && (
              <FieldError error={errors.email.message} />
            )}
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
              placeholder="********"
              {...register("password")}
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
            {errors.password?.message && (
              <FieldError error={errors.password.message} />
            )}
          </div>

          <button
            type="submit"
            className="mt-(--space-sm) w-full rounded-(--radius-md) bg-(--color-primary) p-(--space-md) text-(--font-size-md) font-semibold text-white transition-colors duration-150 hover:bg-(--color-primary-hover) active:scale-[0.98]"
          >
            Register
          </button>
        </div>

        <div className="text-center text-(--font-size-sm) text-(--color-text-secondary)">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-(--color-primary) transition-colors duration-150 hover:text-(--color-primary-hover) hover:underline"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
