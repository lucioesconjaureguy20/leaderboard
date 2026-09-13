import avatarLogo from "@assets/ChatGPT_Image_7_jun_2026,_16_06_27_1780859193229.png";
import qzinoLogo from "@assets/qzino_1781017982877.png";
import { motion } from "framer-motion";

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
] as const;

export default function QzinoLeaderboard() {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Background logos */}
      {bgLogos.map((logo, i) => (
        <img
          key={i}
          src={qzinoLogo}
          alt=""
          aria-hidden="true"
          style={{
            position:   "absolute",
            top:        logo.top,
            left:       "left"  in logo ? (logo as { left: string }).left   : undefined,
            right:      "right" in logo ? (logo as { right: string }).right : undefined,
            width:      logo.size,
            opacity:    logo.opacity,
            transform:  `rotate(${logo.rotate}deg)`,
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
        {/* Header — logos + prize */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={avatarLogo}
              alt="Mants7"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            <span className="text-xl font-black text-white/50 leading-none self-center">×</span>
            <img
              src={qzinoLogo}
              alt="Qzino"
              className="h-8 sm:h-10 object-contain"
            />
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-primary mb-1">$*,***</h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-widest uppercase">
            Coming Soon
          </p>
        </div>

        {/* CTA top */}
        <div className="w-full max-w-xs mb-8">
          <a href="https://legendz.io?ref=MANTS7" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="w-full h-11 text-sm font-bold text-white rounded-md bg-[#7c3aed] hover:bg-[#6d28d9] transition-colors">
              SIGN UP WITH CODE MANTS7
            </button>
          </a>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 mb-10 w-full">
          {/* 2nd */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col items-center order-1"
          >
            <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center font-bold text-black text-xs mb-1.5">2</div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-muted bg-white/5 flex items-center justify-center">
              <span className="text-muted-foreground/30 text-xl font-black">?</span>
            </div>
            <div className="w-24 sm:w-32 h-32 sm:h-40 rounded-t-xl bg-card border-x border-t border-border flex flex-col items-center px-2 py-3 text-center">
              <div className="font-bold text-muted-foreground/40 text-xs sm:text-sm w-full text-center">TBD</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground/20 mt-0.5 mb-auto">—</div>
              <div className="font-black text-muted-foreground/30 text-sm mt-1">TBD</div>
            </div>
          </motion.div>

          {/* 1st */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col items-center order-2 z-10"
          >
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center font-bold text-black text-xs mb-1.5">1</div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-primary bg-white/5 flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.5)]">
              <span className="text-muted-foreground/30 text-2xl font-black">?</span>
            </div>
            <div className="w-24 sm:w-32 h-44 sm:h-52 rounded-t-xl border-x border-t border-primary/50 bg-gradient-to-t from-primary/10 to-card flex flex-col items-center px-2 py-3 text-center">
              <div className="font-bold text-muted-foreground/40 text-xs sm:text-sm w-full text-center">TBD</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground/20 mt-0.5 mb-auto">—</div>
              <div className="font-black text-muted-foreground/30 text-sm mt-1">TBD</div>
            </div>
          </motion.div>

          {/* 3rd */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col items-center order-3"
          >
            <div className="w-6 h-6 rounded-full bg-[#cd7f32] flex items-center justify-center font-bold text-black text-xs mb-1.5">3</div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-muted bg-white/5 flex items-center justify-center">
              <span className="text-muted-foreground/30 text-xl font-black">?</span>
            </div>
            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-t-xl bg-card border-x border-t border-border flex flex-col items-center px-2 py-3 text-center">
              <div className="font-bold text-muted-foreground/40 text-xs sm:text-sm w-full text-center">TBD</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground/20 mt-0.5 mb-auto">—</div>
              <div className="font-black text-muted-foreground/30 text-sm mt-1">TBD</div>
            </div>
          </motion.div>
        </div>

        {/* Countdown placeholder */}
        <div className="mb-8 text-center">
          <div className="flex gap-3 sm:gap-5 justify-center">
            {["--", "--", "--", "--"].map((v, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-card border border-border/40 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-muted-foreground/30">{v}</span>
                </div>
                <span className="text-[9px] sm:text-xs text-muted-foreground/40 tracking-widest uppercase mt-1">
                  {["DAYS", "HRS", "MIN", "SEC"][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground/40 text-xs tracking-widest uppercase mt-3">Coming Soon</p>
        </div>

        {/* Table placeholder */}
        <div className="w-full mb-8">
          <div className="rounded-lg border border-border/40 overflow-hidden relative">
            <table className="w-full text-sm opacity-30 pointer-events-none select-none">
              <thead>
                <tr className="border-b border-border/40 bg-white/[0.03]">
                  <th className="w-12 text-center text-xs font-bold text-muted-foreground py-3">#</th>
                  <th className="text-left text-xs font-bold text-muted-foreground py-3 pl-4">PLAYER</th>
                  <th className="hidden sm:table-cell text-right text-xs font-bold text-muted-foreground py-3 pr-4">WAGERED</th>
                  <th className="text-right text-xs font-bold text-primary py-3 pr-4">PRIZE</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-border/20">
                    <td className="text-center py-2.5 text-muted-foreground">{i + 4}</td>
                    <td className="py-2.5 pl-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/10" />
                        <div className="h-3 w-20 rounded bg-white/10" />
                      </div>
                    </td>
                    <td className="hidden sm:table-cell text-right py-2.5 pr-4">
                      <div className="h-3 w-24 rounded bg-white/10 ml-auto" />
                    </td>
                    <td className="text-right py-2.5 pr-4">
                      <div className="h-3 w-12 rounded bg-white/10 ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-black tracking-widest text-white/20 mb-1">COMING SOON</div>
                <p className="text-muted-foreground/40 text-xs">Leaderboard launching soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA bottom */}
        <div className="mb-4 w-full max-w-xs">
          <a href="https://legendz.io?ref=MANTS7" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="w-full h-11 text-sm font-black tracking-wider text-white rounded-md bg-[#7c3aed] hover:bg-[#6d28d9] transition-colors">
              SIGN UP WITH CODE MANTS7
            </button>
          </a>
        </div>
      </motion.div>
    </div>
    </div>
  );
}
