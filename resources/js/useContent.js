import { usePage } from '@inertiajs/react';

// Public-site content (services, projects, contact info...) shared from the
// database via HandleInertiaRequests. Shape mirrors the old site.js exports.
export function useContent() {
  return usePage().props.content || {};
}
