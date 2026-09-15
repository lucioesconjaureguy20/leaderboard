---
name: OpenAPI generator firewall
description: Why Orval must remain outside this workspace's dependency graph until a compatible replacement is selected.
---

Do not add Orval back to the workspace dependency graph unless a clean Replit publishing install confirms that the package is allowed.

**Why:** Replit's publishing package firewall returned HTTP 403 for multiple Orval versions before compilation began. Removing the package restored clean installs and production builds.

**How to apply:** Keep committed generated API clients validated by TypeScript. If API generation is needed again, use a firewall-approved generator and verify it with a clean frozen-lockfile install before publishing.