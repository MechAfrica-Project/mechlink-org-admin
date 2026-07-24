import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { loginAction } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-void px-gutter">
      <div className="w-full max-w-[420px]">
        <div className="mb-10 flex flex-col items-center text-center">
          <Logo className="mb-6" />
          <h1 className="text-2xl font-bold text-cloud tracking-tight">Admin sign in</h1>
          <p className="text-silver mt-2">Sign in to manage the MechLink site.</p>
        </div>

        <form action={loginAction} className="flex flex-col gap-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              Invalid email or password.
            </p>
          )}

          <div>
            <label className="text-sm font-bold tracking-wide uppercase text-slate block mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full bg-carbon border border-white/10 rounded-xl px-6 py-4 text-cloud focus:outline-none focus:border-cloud/50 focus:ring-1 focus:ring-cloud/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
            />
          </div>

          <div>
            <label className="text-sm font-bold tracking-wide uppercase text-slate block mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-carbon border border-white/10 rounded-xl px-6 py-4 text-cloud focus:outline-none focus:border-cloud/50 focus:ring-1 focus:ring-cloud/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
            />
          </div>

          <Button type="submit" className="mt-2 w-full justify-center">
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
}
