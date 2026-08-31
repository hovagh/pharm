import { Lock } from "lucide-react";

export function PermissionDenied({ module }: { module?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
        <Lock className="h-5 w-5 text-subtle" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">You don&apos;t have permission to view this{module ? ` ${module}` : ""}.</p>
        <p className="text-sm text-muted max-w-sm">Ask a branch manager or organization admin to grant you access.</p>
      </div>
    </div>
  );
}
