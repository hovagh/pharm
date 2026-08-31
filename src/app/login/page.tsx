import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Sign in — HovaPharm" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <BrandMark className="mb-4 h-10 w-10" />
          <h1 className="text-lg font-semibold tracking-tight text-foreground">HovaPharm</h1>
          <p className="mt-1 text-sm text-muted">Your pharmacy, intelligently managed.</p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <form className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-foreground">
                Email or username
              </label>
              <input
                id="email"
                type="text"
                autoComplete="username"
                placeholder="j.mensah@hovapharm.com"
                className="h-10 w-full rounded-md border border-border-strong bg-surface px-3 text-sm text-foreground placeholder:text-subtle focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium text-foreground">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium text-primary-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="h-10 w-full rounded-md border border-border-strong bg-surface px-3 text-sm text-foreground placeholder:text-subtle focus:outline-none"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" className="h-3.5 w-3.5 rounded border-border-strong" />
              Keep me signed in on this device
            </label>

            <Button type="submit" className="w-full" size="lg">
              Sign in
            </Button>
          </form>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-subtle">
          <ShieldCheck className="h-3.5 w-3.5" />
          Access is logged and restricted to authorized pharmacy staff.
        </p>
      </div>
    </div>
  );
}
