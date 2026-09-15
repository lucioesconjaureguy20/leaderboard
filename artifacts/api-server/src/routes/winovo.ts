import { Router, type IRouter } from "express";

const router: IRouter = Router();
const WINOVO_USERS_URL = "https://winovo.io/api/creator/users";
const CACHE_TTL_MS = 55_000;

type WinovoPlayer = {
  name: string;
  pic: string | null;
  wagered: number;
};

type CachedLeaderboard = {
  status: "ok";
  creator: string | null;
  players: WinovoPlayer[];
  fetchedAt: string;
  competition: {
    startAt: string | null;
    endAt: string | null;
  };
  prizes: Record<string, number> | null;
  prizePoolUsd: 500;
  eligibility: {
    canVerify: false;
    status: "pending_winovo_validation";
  };
};

let cache: { expiresAt: number; value: CachedLeaderboard } | null = null;
let inFlight: Promise<CachedLeaderboard> | null = null;

function readOptionalDate(name: string): string | null {
  const value = process.env[name]?.trim();
  if (!value) return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${name} must be a valid ISO date`);
  }

  return parsed.toISOString();
}

function readOptionalPrizes(): Record<string, number> | null {
  const raw = process.env["WINOVO_PRIZES_JSON"]?.trim();
  if (!raw) return null;

  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("WINOVO_PRIZES_JSON must be a JSON object");
  }

  const prizes: Record<string, number> = {};
  for (const [rank, amount] of Object.entries(parsed)) {
    const rankNumber = Number(rank);
    if (!Number.isInteger(rankNumber) || rankNumber < 1 || typeof amount !== "number" || amount < 0) {
      throw new Error("WINOVO_PRIZES_JSON contains an invalid rank or amount");
    }
    prizes[String(rankNumber)] = amount;
  }

  return prizes;
}

async function fetchLeaderboard(): Promise<CachedLeaderboard> {
  const apiKey = process.env["WINOVO_API_KEY"]?.trim();
  if (!apiKey) {
    throw new Error("WINOVO_API_KEY is not configured");
  }

  const response = await fetch(WINOVO_USERS_URL, {
    headers: {
      accept: "application/json",
      "x-creator-auth": apiKey,
    },
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    throw new Error(`Winovo API returned HTTP ${response.status}`);
  }

  const body: unknown = await response.json();
  if (!body || typeof body !== "object") {
    throw new Error("Winovo API returned an invalid response");
  }

  const source = body as { status?: unknown; creator?: unknown; data?: unknown };
  if (source.status !== "ok" || !Array.isArray(source.data)) {
    throw new Error("Winovo API returned an unexpected response");
  }

  const players = source.data
    .flatMap((entry): WinovoPlayer[] => {
      if (!entry || typeof entry !== "object") return [];
      const player = entry as { name?: unknown; pic?: unknown; wagered?: unknown };
      const wagered = Number(player.wagered);
      if (typeof player.name !== "string" || !player.name.trim() || !Number.isFinite(wagered) || wagered < 0) {
        return [];
      }

      return [{
        name: player.name.trim(),
        pic: typeof player.pic === "string" && /^https?:\/\//.test(player.pic) ? player.pic : null,
        wagered,
      }];
    })
    .sort((a, b) => b.wagered - a.wagered);

  return {
    status: "ok",
    creator: typeof source.creator === "string" ? source.creator : null,
    players,
    fetchedAt: new Date().toISOString(),
    competition: {
      startAt: readOptionalDate("WINOVO_RACE_START_AT"),
      endAt: readOptionalDate("WINOVO_RACE_END_AT"),
    },
    prizes: readOptionalPrizes(),
    prizePoolUsd: 500,
    eligibility: {
      canVerify: false,
      status: "pending_winovo_validation",
    },
  };
}

router.get("/winovo/leaderboard", async (_req, res) => {
  try {
    const now = Date.now();
    if (cache && cache.expiresAt > now) {
      res.json(cache.value);
      return;
    }

    inFlight ??= fetchLeaderboard().finally(() => {
      inFlight = null;
    });

    const value = await inFlight;
    cache = { value, expiresAt: now + CACHE_TTL_MS };
    res.json(value);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Winovo API error";
    const status = message === "WINOVO_API_KEY is not configured" ? 503 : 502;
    res.status(status).json({
      status: "error",
      message: status === 503
        ? "Winovo integration is not configured."
        : "Winovo leaderboard is temporarily unavailable.",
    });
  }
});

export default router;