import Image from "next/image";
import { Eye } from "lucide-react";

export function SignInScreen() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a] px-6">
      <div className="w-full max-w-[420px]">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white">
            Welcome to <span className="text-[#ff6b45]">Grafino</span>
          </h1>
          <p className="mt-2 text-base text-neutral-500">
            Sign in to continue
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3.5 text-base text-neutral-500">
            Email address
          </div>
          <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3.5 text-base text-neutral-500">
            Password
            <Eye className="size-5 text-neutral-600" />
          </div>

          <div className="text-left text-sm text-neutral-300">
            Forgot Your Password?
          </div>

          <div className="mt-1 rounded-xl bg-neutral-100 py-3.5 text-center text-base font-medium text-neutral-900">
            Sign In
          </div>

          <div className="my-1.5 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-800" />
            <span className="text-xs text-neutral-600">OR</span>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>

          <div className="flex items-center justify-center gap-2.5 rounded-xl border border-neutral-800 py-3.5 text-center text-base font-medium text-neutral-200">
            <Image
              src="/Connectors/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="size-5"
            />
            Sign in with Google
          </div>

          <p className="mt-1 text-center text-sm text-neutral-500">
            New to our platform?{" "}
            <span className="font-medium text-neutral-200">
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
