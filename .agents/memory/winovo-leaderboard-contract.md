---
name: Winovo leaderboard contract
description: Documented limits of Winovo's creator leaderboard API and how missing competition metadata is handled.
---

Winovo's documented creator endpoint provides referred users with name, picture, and wagered amount, but does not provide competition dates, prize distribution, deposit totals, or eligibility.

**Why:** Publishing invented dates, prizes, or automated eligibility decisions would misrepresent the casino's rules and the API's actual data.

**How to apply:** Keep dates and prize distribution explicitly configurable and display them as pending until Winovo confirms them. Treat deposit-based prize eligibility as pending manual validation unless Winovo adds documented fields for it.