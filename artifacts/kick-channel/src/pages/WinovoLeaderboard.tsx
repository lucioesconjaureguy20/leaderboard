import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Clock3, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import winovoLogo from "@assets/0_winovo_1789433375115.png";
import avatarLogo from "@assets/ChatGPT_Image_7_jun_2026,_16_06_27_1780859193229.png";

const WINOVO_REFERRAL_URL = "https://winovo.io/?ref=mants7";
const PAGE_SIZE = 27;

const bgLogos = [
  { top: "2%", left: "2%", size: 100, rotate: -15, opacity: 0.05 },
  { top: "3%", right: "3%", size: 120, rotate: 18, opacity: 0.04 },
  { top: "16%", left: "12%", size: 95, rotate: -8, opacity: 0.04 },
  { top: "20%", right: "10%", size: 105, rotate: 14, opacity: 0.04 },
  { top: "36%", left: "2%", size: 90, rotate: 10, opacity: 0.04 },
  { top: "42%", right: "3%", size: 110, rotate: -16, opacity: 0.04 },
  { top: "61%", left: "8%", size: 105, rotate: 16, opacity: 0.04 },
  { top: "68%", right: "10%", size: 95, rotate: -10, opacity: 0.04 },
  { top: "84%", left: "3%", size: 100, rotate: -18, opacity: 0.04 },
  { top: "90%", right: "4%", size: 110, rotate: 12, opacity: 0.04 },
];

type WinovoLeaderboardResponse = {
  status: "ok";
  creator: string | null;
  players: Array<{ name: string; pic: string | null; wagered: number }>;
  fetchedAt: string;
  competition: { startAt: string | null; endAt: string | null };
  prizes: Record<string, number> | null;
  prizePoolUsd: 500;
  eligibility: { canVerify: false; status: "pending_winovo_validation" };
};

async function getWinovoLeaderboard(): Promise<WinovoLeaderboardResponse> {
  const response = await fetch("/api/winovo/leaderboard", {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(body?.message || "No se pudo cargar el leaderboard de Winovo.");
  }

  return response.json() as Promise<WinovoLeaderboardResponse>;
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function WinovoLeaderboard() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["winovo-leaderboard"],
    queryFn: getWinovoLeaderboard,
    refetchInterval: 60_000,
    staleTime: 55_000,
    retry: 2,
  });

  const hasDates = Boolean(data?.competition.startAt && data?.competition.endAt);
  const endDate = data?.competition.endAt ? new Date(data.competition.endAt) : null;
  const topPlayers = (data?.players ?? []).slice(0, 3);
  const podiumPlayers = [topPlayers[1], topPlayers[0], topPlayers[2]].filter(Boolean);
  const tablePlayers = (data?.players ?? []).slice(3, visibleCount);
  const canLoadMore = Boolean(data && visibleCount < data.players.length);

  return (
    <div className="w-full relative overflow-hidden">
      {bgLogos.map((logo, index) => (
        <img
          key={index}
          src={winovoLogo}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: logo.top,
            left: "left" in logo ? logo.left : undefined,
            right: "right" in logo ? logo.right : undefined,
            width: logo.size,
            opacity: logo.opacity,
            transform: `rotate(${logo.rotate}deg)`,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src={avatarLogo}
                alt="Mants7"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover"
                style={{ objectPosition: "50% 30%", mixBlendMode: "screen" }}
              />
              <span className="text-xl font-black text-white/50">×</span>
              <img src={winovoLogo} alt="Winovo" className="h-8 sm:h-10 object-contain" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-primary mb-1">$500</h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-widest uppercase">
              $500 Weekly Wager Race
            </p>
          </div>

          <a href={WINOVO_REFERRAL_URL} target="_blank" rel="noopener noreferrer" className="w-full max-w-xs mb-8">
            <Button className="w-full h-11 text-sm font-bold text-white bg-[#7c3aed] hover:bg-[#6d28d9] border-none">
              SIGN UP WITH CODE MANTS7
            </Button>
          </a>

          {isLoading && (
            <div className="w-full min-h-72 flex flex-col items-center justify-center gap-3">
              <LoaderCircle className="w-7 h-7 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Cargando ranking real de Winovo…</p>
            </div>
          )}

          {error && (
            <div className="w-full min-h-64 rounded-xl border border-red-500/30 bg-red-500/5 flex flex-col items-center justify-center gap-3 px-6">
              <AlertCircle className="w-7 h-7 text-red-400" />
              <p className="font-bold">No se pudo cargar el ranking</p>
              <p className="text-sm text-muted-foreground text-center">{error.message}</p>
            </div>
          )}

          {data && !error && (
            <>
              {topPlayers.length > 0 ? (
                <div className="flex items-end justify-center gap-3 sm:gap-6 mb-10 w-full">
                  {podiumPlayers.map((player, index) => {
                    const rank = data.players.indexOf(player) + 1;
                    const isFirst = rank === 1;
                    const isSecond = rank === 2;
                    const prize = data.prizes?.[String(rank)];
                    return (
                      <motion.div
                        key={`${player.name}-${rank}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className={`flex flex-col items-center ${isFirst ? "order-2 z-10" : isSecond ? "order-1" : "order-3"}`}
                      >
                        <div className="flex flex-col items-center mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-black text-xs mb-1.5 shadow ${
                            isFirst ? "bg-primary" : isSecond ? "bg-slate-300" : "bg-[#cd7f32]"
                          }`}>
                            {rank}
                          </div>
                          <div className={`rounded-full border-4 overflow-hidden ${
                            isFirst
                              ? "w-16 h-16 sm:w-20 sm:h-20 border-primary shadow-[0_0_16px_rgba(168,85,247,0.5)]"
                              : "w-12 h-12 sm:w-16 sm:h-16 border-muted"
                          }`}>
                            {player.pic ? (
                              <img src={player.pic} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <img
                                src={avatarLogo}
                                alt=""
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "50% 30%", mixBlendMode: "screen" }}
                              />
                            )}
                          </div>
                        </div>
                        <div className={`w-24 sm:w-32 rounded-t-xl border-x border-t border-border flex flex-col items-center px-2 py-3 text-center ${
                          isFirst
                            ? "h-44 sm:h-52 border-primary/50 bg-gradient-to-t from-primary/10 to-card"
                            : isSecond ? "h-32 sm:h-40 bg-card" : "h-24 sm:h-32 bg-card"
                        }`}>
                          <div className="font-bold text-foreground text-xs sm:text-sm truncate w-full">{player.name}</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 mb-auto truncate w-full">
                            {formatCurrency(player.wagered)}
                          </div>
                          <div className="font-black text-primary text-sm sm:text-base mt-1">
                            {typeof prize === "number" ? formatCurrency(prize) : "Pending"}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-end justify-center gap-3 sm:gap-6 mb-10 w-full">
                  {[2, 1, 3].map((rank) => {
                    const isFirst = rank === 1;
                    const isSecond = rank === 2;
                    const prize = data.prizes?.[String(rank)];
                    return (
                      <motion.div
                        key={rank}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: rank * 0.1, duration: 0.4 }}
                        className={`flex flex-col items-center ${isFirst ? "order-2 z-10" : isSecond ? "order-1" : "order-3"}`}
                      >
                        <div className="flex flex-col items-center mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-black text-xs mb-1.5 shadow ${
                            isFirst ? "bg-primary" : isSecond ? "bg-slate-300" : "bg-[#cd7f32]"
                          }`}>
                            {rank}
                          </div>
                          <div className={`rounded-full border-4 flex items-center justify-center bg-card text-muted-foreground ${
                            isFirst
                              ? "w-16 h-16 sm:w-20 sm:h-20 border-primary shadow-[0_0_16px_rgba(168,85,247,0.35)]"
                              : "w-12 h-12 sm:w-16 sm:h-16 border-muted"
                          }`}>
                            <span className="text-xl font-bold">—</span>
                          </div>
                        </div>
                        <div className={`w-24 sm:w-32 rounded-t-xl border-x border-t border-border flex flex-col items-center px-2 py-3 text-center ${
                          isFirst
                            ? "h-44 sm:h-52 border-primary/50 bg-gradient-to-t from-primary/10 to-card"
                            : isSecond ? "h-32 sm:h-40 bg-card" : "h-24 sm:h-32 bg-card"
                        }`}>
                          <div className="font-bold text-muted-foreground text-xs sm:text-sm truncate w-full">Awaiting player</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground/60 mt-0.5 mb-auto">—</div>
                          <div className="font-black text-primary text-sm sm:text-base mt-1">
                            {typeof prize === "number" ? formatCurrency(prize) : "Pending"}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              <div className="mb-8 text-center">
                {endDate && endDate.getTime() > Date.now() ? (
                  <CountdownTimer targetDate={endDate} />
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <Clock3 className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-bold text-primary tracking-widest uppercase">Schedule Pending</span>
                    </div>
                    <p className="text-muted-foreground text-xs tracking-widest uppercase mt-3">
                      Fechas pendientes de confirmación por Winovo
                    </p>
                  </>
                )}
                {hasDates && data && (
                  <p className="text-muted-foreground text-xs tracking-widest uppercase mt-3">
                    {formatDate(data.competition.startAt!)} – {formatDate(data.competition.endAt!)}
                  </p>
                )}
              </div>

              <div className="w-full">
                <div className="flex justify-end mb-2">
                  <span className="text-[10px] text-muted-foreground/60 tracking-wide">
                    Updates every 60 sec{isFetching ? " · Updating…" : ""}
                  </span>
                </div>
                <div className="rounded-lg border border-border/40 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/40 hover:bg-transparent bg-white/[0.03]">
                        <TableHead className="w-12 text-center text-xs font-bold text-muted-foreground py-3">#</TableHead>
                        <TableHead className="text-xs font-bold text-muted-foreground py-3">PLAYER</TableHead>
                        <TableHead className="hidden sm:table-cell text-right text-xs font-bold text-muted-foreground py-3">WAGERED</TableHead>
                        <TableHead className="text-right text-xs font-bold text-primary py-3">PRIZE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tablePlayers.map((player) => {
                        const rank = data.players.indexOf(player) + 1;
                        const prize = data.prizes?.[String(rank)];
                        return (
                          <TableRow key={`${player.name}-${rank}`} className="border-border/20 hover:bg-white/5 transition-colors">
                            <TableCell className="text-center font-bold text-muted-foreground text-sm py-2.5">{rank}</TableCell>
                            <TableCell className="font-semibold py-2.5">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full overflow-hidden border border-border/50 shrink-0">
                                  {player.pic ? (
                                    <img src={player.pic} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <img
                                      src={avatarLogo}
                                      alt=""
                                      className="w-full h-full object-cover"
                                      style={{ objectPosition: "50% 30%", mixBlendMode: "screen" }}
                                    />
                                  )}
                                </span>
                                <span className="text-sm truncate">{player.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell text-right font-mono text-sm text-muted-foreground py-2.5">
                              {formatCurrency(player.wagered)}
                            </TableCell>
                            <TableCell className="text-right font-bold text-sm py-2.5 text-primary">
                              {typeof prize === "number" ? formatCurrency(prize) : "Pending"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {canLoadMore && (
                <Button
                  onClick={(event) => {
                    setVisibleCount((count) => count + PAGE_SIZE);
                    event.currentTarget.blur();
                  }}
                  variant="outline"
                  className="mt-5 px-8 text-sm border-border/50 hover:bg-white/5 text-foreground/60 hover:text-foreground"
                >
                  LOAD MORE
                </Button>
              )}

              <div className="mt-4 text-[11px] text-muted-foreground/70">
                $500 prize distribution · Top 5 paid
              </div>
            </>
          )}

          <div className="mt-8 mb-4 w-full max-w-xs">
            <a href={WINOVO_REFERRAL_URL} target="_blank" rel="noopener noreferrer">
              <Button className="w-full h-11 text-sm font-black tracking-wider text-white bg-[#7c3aed] hover:bg-[#6d28d9] border-none">
                SIGN UP WITH CODE MANTS7
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}