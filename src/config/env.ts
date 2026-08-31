// Centralized environment access. Never hardcode production URLs or
// credentials elsewhere in the codebase — read them through here so there
// is exactly one place to audit for secrets/config.
//
// NEXT_PUBLIC_* variables are exposed to the browser bundle, so only
// non-sensitive values (like a public API base URL) belong here. Auth
// secrets, service tokens, and database credentials must live in
// server-only environment variables and never be prefixed NEXT_PUBLIC_.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
