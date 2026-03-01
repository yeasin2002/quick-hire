import { LoginForm } from "@/feature/auth";

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8FD] h-screen flex items-center ">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(920px_420px_at_6%_-10%,#E3E5FF_0%,transparent_62%)] "
      />

      <div className="mx-auto w-full max-w-435 px-4 py-10 sm:px-8 sm:py-14 lg:px-16 xl:px-24 xl:py-16">
        <div className="mx-auto w-full max-w-135 rounded-2xl border border-[#D6DDEB] bg-white p-6 shadow-[0_18px_48px_rgba(37,50,75,0.08)] sm:p-8 ">
          <p className="text-sm font-medium tracking-[0.04em] text-[#7C8493] uppercase">
            Welcome Back
          </p>
          <h1 className="mt-2 text-[34px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay sm:text-[42px]">
            Login
          </h1>
          <p className="mt-3 text-[16px] leading-[1.45] text-[#515B6F] font-epilogue">
            Sign in to continue to your dashboard.
          </p>

          <LoginForm />
        </div>
      </div>
    </section>
  );
}
