import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Clock3, LoaderCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WINOVO_REFERRAL_URL = "https://winovo.io/?ref=mants7";

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
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["winovo-leaderboard"],
    queryFn: getWinovoLeaderboard,
    refetchInterval: 60_000,
    staleTime: 55_000,
    retry: 2,
  });

  const hasDates = Boolean(data?.competition.startAt && data?.competition.endAt);
  const endDate = data?.competition.endAt ? new Date(data.competition.endAt) : null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 text-3xl sm:text-4xl font-black italic tracking-tight text-white">
          WIN<span className="text-[#7c3aed]">OVO</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-primary">$500</h1>
        <p className="mt-1 text-lg sm:text-2xl font-bold uppercase tracking-widest">Weekly Wager Race</p>

        <div className="mt-4 min-h-10 flex items-center justify-center">
          {hasDates && data ? (
            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
              {formatDate(data.competition.startAt!)} – {formatDate(data.competition.endAt!)}
            </p>
          ) : (
            <p className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Clock3 className="w-4 h-4" />
              Fechas pendientes de confirmación por Winovo
            </p>
          )}
        </div>

        {endDate && endDate.getTime() > Date.now() && (
          <div className="mt-6">
            <CountdownTimer targetDate={endDate} />
          </div>
        )}

        <a href={WINOVO_REFERRAL_URL} target="_blank" rel="noopener noreferrer" className="w-full max-w-xs mt-6">
          <Button className="w-full h-11 font-bold text-white bg-[#7c3aed] hover:bg-[#6d28d9] border-none">
            SIGN UP WITH CODE MANTS7
          </Button>
        </a>

        <div className="w-full mt-8 rounded-xl border border-primary/25 bg-primary/[0.06] p-4 text-left">
          <p className="font-bold text-sm text-foreground">
            Condición para recibir el premio
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Para recibir el premio, tus depósitos deben superar el importe del premio correspondiente a tu posición.
            Si depositaste menos que ese importe, el premio queda anulado.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/75">
            La igualdad exacta y el período de depósitos no están definidos. La elegibilidad queda pendiente de
            validación por Winovo y no se descalifica automáticamente a ningún jugador.
          </p>
        </div>

        <div className="w-full mt-8">
          {isLoading && (
            <div className="min-h-56 rounded-xl border border-border/40 bg-card flex flex-col items-center justify-center gap-3">
              <LoaderCircle className="w-7 h-7 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Cargando ranking real de Winovo…</p>
            </div>
          )}

          {error && (
            <div className="min-h-56 rounded-xl border border-red-500/30 bg-red-500/5 flex flex-col items-center justify-center gap-3 px-6">
              <AlertCircle className="w-7 h-7 text-red-400" />
              <p className="font-bold">No se pudo cargar el ranking</p>
              <p className="text-sm text-muted-foreground text-center">{error.message}</p>
            </div>
          )}

          {data && !error && data.players.length === 0 && (
            <div className="min-h-56 rounded-xl border border-border/40 bg-card flex flex-col items-center justify-center gap-3 px-6">
              <Trophy className="w-7 h-7 text-primary" />
              <p className="font-bold">Todavía no hay jugadores en el ranking</p>
              <p className="text-sm text-muted-foreground">Los datos aparecerán cuando Winovo reporte wagers.</p>
            </div>
          )}

          {data && !error && data.players.length > 0 && (
            <div className="rounded-xl border border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/[0.03] hover:bg-white/[0.03]">
                    <TableHead className="w-16 text-center">#</TableHead>
                    <TableHead>PLAYER</TableHead>
                    <TableHead className="text-right">WAGERED</TableHead>
                    <TableHead className="text-right">PRIZE</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.players.map((player, index) => {
                    const rank = index + 1;
                    const prize = data.prizes?.[String(rank)];
                    return (
                      <TableRow key={`${player.name}-${rank}`} className="border-border/25">
                        <TableCell className="text-center font-bold text-primary">{rank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {player.pic ? (
                              <img src={player.pic} alt="" className="w-8 h-8 rounded-full object-cover bg-muted" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                                {player.name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <span className="font-semibold">{player.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">
                          {formatCurrency(player.wagered)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-primary">
                          {typeof prize === "number" ? formatCurrency(prize) : "Pending"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {data && (
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-[11px] text-muted-foreground/70">
              <span>Actualización automática cada 60 segundos{isFetching ? " · Actualizando…" : ""}</span>
              <span>Premios por posición pendientes de confirmación</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}