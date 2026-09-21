function Register() {
  return (
    <div
      id="register"
      className="flex min-h-screen w-full items-center justify-center bg-(--color-background) p-(--space-md) font-(--font-family) text-(--color-text-primary)"
    >


      <form
        action=""
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
              name="fullname"
              type="text"
              placeholder="John Doe"
              required
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
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
              name="username"
              type="text"
              placeholder="johndoe123"
              required
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
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
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
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
              name="password"
              type="password"
              placeholder="********"
              required
              className="w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-light) p-(--space-md) text-(--font-size-md) text-(--color-text-primary) outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-(--color-text-muted) focus:border-(--color-primary) focus:shadow-[0_0_0_2px_rgb(99_102_241_/_0.2)]"
            />
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
