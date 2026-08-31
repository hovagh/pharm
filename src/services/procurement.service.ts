// procurement.service.ts
// Typed API boundary. The frontend never queries a database directly (see
// architecture rule in the project brief, section 39). Every function here
// is a thin, typed wrapper around a call to the backend API layer.
//
// During frontend development, screens read from local mock data
// (see /src/lib/mock-data) so UI can be built and reviewed before the
// backend contract is final. Swap the implementation body for a real
// fetch() against the API once the corresponding endpoint exists —
// callers elsewhere in the app do not need to change.

import { API_BASE_URL } from "@/config/env";

const RESOURCE_PATH = "/procurement";

function url(path = "") {
  return `${API_BASE_URL}${RESOURCE_PATH}${path}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url(path), {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`procurementService request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const procurementService = {
  baseUrl: url(),
  request,
};
