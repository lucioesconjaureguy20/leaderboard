import legendzLogo from "@assets/image_1789266343540.png";
import avatarLogo from "@assets/ChatGPT_Image_7_jun_2026,_16_06_27_1780859193229.png";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ─── Seeded RNG (LCG) ────────────────────────────────────────────────────────
function makeRng(seed: number) {
  let s = ((seed ^ 0xCAFEBABE) >>> 0) || 1;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

// ─── August 2026 race config ─────────────────────────────────────────────────
const RACE_START_MS = new Date("2026-08-01T00:00:00Z").getTime();

const RANK_TARGETS: number[] = [
  // A realistic one-month curve: top 1 starts around $45k and falls steadily.
  45_000, 41_000, 37_000, 30_000, 24_000,
  20_000, 17_000, 14_000, 12_000, 10_000,
  ...Array.from({ length: 90 }, (_, i) =>
    Math.round(10_000 * Math.pow(0.95, i + 1))
  ),
];

const TICK_MS = 5 * 60 * 1000;
const PLAYER_OFFSETS: number[] = Array.from({ length: 100 }, (_, i) => {
  const rng = makeRng(i * 2023 + 55);
  return Math.floor(rng() * 300) * 1000;
});

function computeWager(rank: number, nowMs: number): number {
  const target = RANK_TARGETS[rank - 1] ?? 50_000;
  const rng = makeRng(rank * 77_777);
  const avgDaily = target / 22.5;

  const elapsedMs = Math.max(0, nowMs - RACE_START_MS);
  const daysFull  = Math.min(Math.floor(elapsedMs / 86_400_000), 30);

  let total = 0;
  for (let d = 0; d < daysFull; d++) {
    const played = rng() > 0.25;
    const v      = rng();
    if (played) total += avgDaily * (0.3 + v * 1.4);
  }

  const offsetMs   = PLAYER_OFFSETS[rank - 1];
  const todayMs    = elapsedMs % 86_400_000;
  const adjustedMs = Math.max(0, todayMs - offsetMs);
  const ticks      = Math.floor(adjustedMs / TICK_MS);
  const isActive   = rng() > 0.3;
  const todayV     = rng();
  if (isActive && daysFull < 30 && ticks > 0) {
    const ticksPerDay = 86_400_000 / TICK_MS;
    const tickRate    = (avgDaily * (0.4 + todayV * 1.2)) / ticksPerDay;
    total += ticks * tickRate;
  }

  return Math.max(0, Math.round(total * 100) / 100);
}

// ─── Static data ─────────────────────────────────────────────────────────────
const bgLogos = [
  { top: "2%",  left: "2%",   size: 100, rotate: -15, opacity: 0.06 },
  { top: "2%",  right: "3%",  size: 120, rotate: 20,  opacity: 0.05 },
  { top: "8%",  left: "42%",  size: 85,  rotate: -10, opacity: 0.05 },
  { top: "16%", left: "15%",  size: 90,  rotate: -8,  opacity: 0.05 },
  { top: "18%", right: "12%", size: 95,  rotate: 18,  opacity: 0.05 },
  { top: "28%", left: "-2%",  size: 85,  rotate: 10,  opacity: 0.05 },
  { top: "30%", right: "6%",  size: 110, rotate: -18, opacity: 0.05 },
  { top: "38%", left: "36%",  size: 95,  rotate: -22, opacity: 0.05 },
  { top: "46%", left: "8%",   size: 100, rotate: 15,  opacity: 0.05 },
  { top: "50%", right: "2%",  size: 80,  rotate: -10, opacity: 0.05 },
  { top: "58%", left: "52%",  size: 90,  rotate: 8,   opacity: 0.05 },
  { top: "64%", left: "4%",   size: 85,  rotate: 20,  opacity: 0.05 },
  { top: "70%", right: "14%", size: 100, rotate: -12, opacity: 0.05 },
  { top: "78%", left: "28%",  size: 110, rotate: -20, opacity: 0.05 },
  { top: "86%", left: "6%",   size: 90,  rotate: 5,   opacity: 0.05 },
  { top: "90%", right: "6%",  size: 95,  rotate: -25, opacity: 0.05 },
];

const prizes: Record<number, string> = {
  1: "$800", 2: "$400", 3: "$250",
  4: "$175", 5: "$125", 6: "$100", 7: "$75",
  8: "$50", 9: "$15", 10: "$10",
};

const PLAYER_NAMES: string[] = [
  "K9**",
  "ic*******",
  "To****",
  "Lu******","Di*****","Fu***","Si*****","Mo******","Ri****","Ka*******",
  "Ja***","Ma*****","Ty******","Br***","Co*****","Xe******","Na****","El*******",
  "Zo***","Da*****","Re******","Sl****","Vi*****","De*******","Ha***","Ni*****",
  "Ky******","To****","Sa*****","Ax*******","No***","Le*****","Fe******","Gu****",
  "Bl*******","Ce*****","Tr***","Ve******","Mi*****","Ra****","Jo*******","Pe***",
  "Be*****","Fl******","Gh****","Hu*****","Ig*******","Je***","Kr*****","Lu******",
  "Me****","Ob*****","Pr*******","Qu***","Ro*****","St******","Ta****","Ud*****",
  "Wa*******","Xe***","Ya*****","Ze******","Al****","Ba*******","Ca***","Do*****",
  "Em******","Fa****","Gi*****","He*******","Ir***","Jy*****","Ki******","Lo****",
  "Mu*****","Ne*******","Or***","Pa*****","Qi******","Ru****","Sk*****","Ti*******",
  "Ur***","Vo*****","Wi******","Xy****","Yu*****","Zi*******","Ab***","Bo*****",
  "Cy******","Du****","Ev*****","Fi*******","Gr***","Ho*****","In******","Jk****",
  "Kl*****","Lx*******","Ny***",
];

// Previous month has a different roster — some familiar faces, many new ones
const PREV_PLAYER_NAMES: string[] = [
  "K9**",        // rank 1 same (consistent top wagerer)
  "Zx*******",   // rank 2 different
  "To****",      // rank 3 same
  "Di*****","Wr******","Nh***","Pl*****","Ka*******","Bx****","Si*****",
  "Oc***","Th*****","Ry******","Mo******","Wv***","Lk*****","Dj******","Fu***",
  "Gs***","Vn*****","Xt******","Cm****","Bf*****","Pw*******","Ar***","Ej*****",
  "Hk******","Mn****","Ri****","Qz*******","Xu***","Tv*****","Fe******","Ck****",
  "Bp*******","Dw*****","Jh***","Am******","Ks*****","Ru****","Wy*******","Ce***",
  "Ln*****","Gt******","Ph****","Sb*****","Nv*******","Kj***","Ty******","Dq******",
  "Rw****","Mf*****","Bh*******","Vp***","Aj*****","Lu******","Xn******","Ot****",
  "Ma*****","Yz*******","Hb***","Dk*****","Sc******","Ep****","Wr*****","Nd*******",
  "Fl***","Tz*****","Av******","Br***","Gs****","Jm*****","Co*****","Xk*******",
  "Ht***","Pn*****","Yl******","Dm****","Fw*****","Re******","Bk*******","Cx***",
  "Sv*****","Nj******","Ag****","Lp*****","Wh*******","Tq***","Km*****","Zo***",
  "Dp******","Er****","Ib*****","Rn*******","Qj***","Uf*****","Wc******","Yb****",
  "Hd*****","Jv*******","Pk***",
];

function formatWager(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── Previous month (July 1 – August 1, 2026) ─────────────────────────────────
// Final wagers ≈ 88–98 % of RANK_TARGETS so results look natural
const PREV_MULTIPLIERS = [0.985, 0.962, 0.969, 0.939, 0.927, 0.919, 0.908, 0.904, 0.906, 0.951,
  0.91, 0.89, 0.92, 0.88, 0.93, 0.87, 0.90, 0.91, 0.89, 0.92,
  0.88, 0.91, 0.87, 0.90, 0.93, 0.89, 0.91, 0.88, 0.92, 0.90];

function computePrevWager(rank: number): number {
  const target = RANK_TARGETS[rank - 1] ?? 50_000;
  const mult   = PREV_MULTIPLIERS[(rank - 1) % PREV_MULTIPLIERS.length];
  const rng    = makeRng(rank * 31337);
  const jitter = 0.97 + rng() * 0.06;
  return Math.round(target * mult * jitter * 100) / 100;
}

const PREV_TOP3_META = [
  { rank: 2, user: "Zx*******", prize: "$400", color: "bg-slate-300" },
  { rank: 1, user: "K9**",      prize: "$800", color: "bg-primary"   },
  { rank: 3, user: "To****",    prize: "$250", color: "bg-[#cd7f32]" },
];

const PAGE_SIZE  = 27;
const TOTAL_ROWS = 97;

const TOP3_META = [
  { rank: 2, user: "ic*******", prize: "$400", color: "bg-slate-300" },
  { rank: 1, user: "K9**",      prize: "$800", color: "bg-primary"   },
  { rank: 3, user: "To****",    prize: "$250", color: "bg-[#cd7f32]" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Leaderboard() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [showPrev, setShowPrev] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Current month data
  const currTop3 = TOP3_META.map((p) => ({
    ...p,
    wager: formatWager(computeWager(p.rank, nowMs)),
  }));
  const currRawRows = Array.from({ length: TOTAL_ROWS }, (_, i) => {
    const rank = i + 4;
    return { name: PLAYER_NAMES[rank - 1] ?? `Pl${rank}****`, wagerAmount: computeWager(rank, nowMs) };
  }).sort((a, b) => b.wagerAmount - a.wagerAmount);
  const currAllRows = currRawRows.map((r, i) => ({
    rank: i + 4, user: r.name, wager: formatWager(r.wagerAmount),
    prize: prizes[i + 4] ?? "—", hasPrize: i + 4 <= 10,
  }));

  // Previous month data (static final results)
  const prevTop3 = PREV_TOP3_META.map((p) => ({
    ...p,
    wager: formatWager(computePrevWager(p.rank)),
  }));
  const prevAllRows = Array.from({ length: TOTAL_ROWS }, (_, i) => {
    const rank = i + 4;
    return { rank, user: PREV_PLAYER_NAMES[rank - 1] ?? `Pl${rank}****`,
      wager: formatWager(computePrevWager(rank)), prize: prizes[rank] ?? "—", hasPrize: rank <= 10 };
  });

  // Active data (switches on toggle)
  const activeTop3  = showPrev ? prevTop3    : currTop3;
  const activeAllRows = showPrev ? prevAllRows : currAllRows;
  const visibleRows = activeAllRows.slice(0, Math.min(visibleCount, TOTAL_ROWS));
  const canLoadMore = visibleCount < TOTAL_ROWS;

  return (
    <div className="w-full relative overflow-hidden">
      {/* Background logos */}
      {bgLogos.map((logo, i) => (
        <img
          key={i}
          src={legendzLogo}
          alt=""
          aria-hidden="true"
          style={{
            position:  "absolute",
            top:       logo.top,
            left:      "left"  in logo ? (logo as { left: string }).left   : undefined,
            right:     "right" in logo ? (logo as { right: string }).right : undefined,
            width:     logo.size,
            opacity:   logo.opacity,
            transform: `rotate(${logo.rotate}deg)`,
            mixBlendMode: "screen",
            pointerEvents: "none",
            userSelect:    "none",
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
          {/* ── Header ── */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src={avatarLogo}
                alt="Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover"
                style={{ objectPosition: "50% 30%", mixBlendMode: "screen" }}
              />
              <span className="text-xl font-black text-white/50">×</span>
              <img
                src={legendzLogo}
                alt="Legendz.io"
                className="h-8 sm:h-10 object-contain"
                style={{ mixBlendMode: "screen", opacity: 0.95 }}
              />
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-primary mb-1">$2,000</h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-widest uppercase">
               {showPrev ? "July 1 – August 1, 2026 · Final Results" : "August 1 – September 8, 2026 · Final Results"}
            </p>
          </div>

          {/* ── CTA top ── */}
          <a
            href="https://legendz.io?ref=MANTS7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs mb-8"
          >
            <Button className="w-full h-11 text-sm font-bold text-white bg-[#7c3aed] hover:bg-[#6d28d9] border-none">
              SIGN UP WITH CODE MANTS7
            </Button>
          </a>

          {/* ── Animated content block (switches on prev/current toggle) ── */}
          <AnimatePresence mode="wait">
          <motion.div
            key={showPrev ? "prev" : "curr"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center"
          >

          {/* ── Podium ── */}
          <div className="flex items-end justify-center gap-3 sm:gap-6 mb-10 w-full">
            {activeTop3.map((player) => {
              const isFirst  = player.rank === 1;
              const isSecond = player.rank === 2;
              return (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: player.rank * 0.1, duration: 0.4 }}
                  className={`flex flex-col items-center ${isFirst ? "order-2 z-10" : isSecond ? "order-1" : "order-3"}`}
                >
                  {/* Avatar + rank badge */}
                  <div className="flex flex-col items-center mb-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-black text-xs mb-1.5 ${player.color} shadow`}>
                      {player.rank}
                    </div>
                    <div className={`rounded-full border-4 overflow-hidden
                      ${isFirst
                        ? "w-16 h-16 sm:w-20 sm:h-20 border-primary shadow-[0_0_16px_rgba(168,85,247,0.5)]"
                        : "w-12 h-12 sm:w-16 sm:h-16 border-muted"}`}
                    >
                      <img
                        src={avatarLogo}
                        alt="avatar"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "50% 30%", mixBlendMode: "screen" }}
                      />
                    </div>
                  </div>

                  {/* Podium block */}
                  <div className={`w-24 sm:w-32 rounded-t-xl border-x border-t border-border flex flex-col items-center px-2 py-3 text-center
                    ${isFirst
                      ? "h-44 sm:h-52 border-primary/50 bg-gradient-to-t from-primary/10 to-card"
                      : isSecond
                      ? "h-32 sm:h-40 bg-card"
                      : "h-24 sm:h-32 bg-card"}`}
                  >
                    <div className="font-bold text-foreground text-xs sm:text-sm truncate w-full text-center">
                      {player.user}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 mb-auto truncate w-full text-center">
                      {player.wager}
                    </div>
                    <div className="font-black text-primary text-sm sm:text-base mt-1">
                      {player.prize}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Final results / toggle ── */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-1">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Final Results</span>
            </div>
            <p className="text-muted-foreground text-xs tracking-widest uppercase mt-2">
              {showPrev ? "July 1 – August 1, 2026" : "Ended September 8, 2026"}
            </p>
            <button
              onClick={() => { setShowPrev((p) => !p); setVisibleCount(PAGE_SIZE); }}
              className="mt-4 px-5 h-9 text-xs font-bold border-2 border-white/70 rounded-md hover:bg-white/10 hover:text-white transition-all text-foreground/80"
            >
              {showPrev ? "← VIEW CURRENT LEADERBOARD" : "VIEW PREVIOUS LEADERBOARD"}
            </button>
          </div>

          {/* ── Table ── */}
          <div className="w-full">
            <div className="flex justify-end mb-2">
              <span className="text-[10px] text-muted-foreground/60 tracking-wide">
                Updates every 5 min
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
                  {visibleRows.map((row) => (
                    <TableRow
                      key={row.rank}
                      className="border-border/20 hover:bg-white/5 transition-colors"
                      data-testid={`row-player-${row.rank}`}
                    >
                      <TableCell className="text-center font-bold text-muted-foreground text-sm py-2.5">
                        {row.rank}
                      </TableCell>
                      <TableCell className="font-semibold py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full overflow-hidden border border-border/50 shrink-0">
                            <img
                              src={avatarLogo}
                              alt="avatar"
                              className="w-full h-full object-cover"
                              style={{ objectPosition: "50% 30%", mixBlendMode: "screen" }}
                            />
                          </span>
                          <span className="text-sm truncate">{row.user}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right font-mono text-sm text-muted-foreground py-2.5">
                        {row.wager}
                      </TableCell>
                      <TableCell className={`text-right font-bold text-sm py-2.5 ${row.hasPrize ? "text-primary" : "text-muted-foreground/40"}`}>
                        {row.prize}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ── Load more ── */}
          {canLoadMore && (
            <Button
              onClick={(e) => { setVisibleCount((c) => c + PAGE_SIZE); e.currentTarget.blur(); }}
              variant="outline"
              className="mt-5 px-8 text-sm border-border/50 hover:bg-white/5 text-foreground/60 hover:text-foreground"
              data-testid="button-load-more"
            >
              LOAD MORE
            </Button>
          )}

          </motion.div>
          </AnimatePresence>

          {/* ── CTA bottom ── */}
          <div className="mt-8 mb-4 w-full max-w-xs">
            <a href="https://legendz.io?ref=MANTS7" target="_blank" rel="noopener noreferrer">
              <Button
                className="w-full h-11 text-sm font-black tracking-wider text-white bg-[#7c3aed] hover:bg-[#6d28d9] border-none"
                data-testid="button-signup-bottom"
              >
                SIGN UP WITH CODE MANTS7
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
