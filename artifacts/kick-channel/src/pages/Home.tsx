import logoPath from "@assets/ChatGPT_Image_7_jun_2026,_16_06_27_1780859648982.png";
import legendzLogo from "@assets/image_1789266343540.png";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiDiscord, SiKick, SiX } from "react-icons/si";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center gap-6"
      >
        {/* Logo */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 overflow-visible">
          <img src={logoPath} alt="Channel Logo" className="w-full h-full object-contain scale-[1.6]" />
        </div>

        {/* Hero stat */}
        <div className="space-y-1">
          <h1 className="text-5xl sm:text-6xl font-black text-primary tracking-tighter">$50,000+</h1>
          <p className="text-lg sm:text-2xl font-bold tracking-widest text-foreground uppercase">Given Away</p>
          <div className="inline-block px-4 py-1 mt-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold tracking-widest">
            TO CODE USERS
          </div>
        </div>

        {/* Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">

          {/* Legendz card */}
          <Card className="w-full max-w-sm bg-[#15192b] border-transparent">
            <CardContent className="p-3 sm:p-6 flex flex-col items-center gap-3">
              <div className="text-[9px] sm:text-sm font-bold text-muted-foreground tracking-widest uppercase text-center">
                Monthly Leaderboard
              </div>
              <img src={legendzLogo} alt="Legendz.io" className="h-5 sm:h-8 object-contain" style={{ mixBlendMode: "screen", opacity: 0.95 }} />
              <div className="text-2xl sm:text-4xl font-bold text-primary">$2,000</div>
              <div className="w-full flex flex-col gap-2">
                <Button
                  onClick={() => navigate("/stake")}
                  variant="outline"
                  className="w-full h-9 sm:h-12 text-[10px] sm:text-sm font-bold border-2 border-white/70 hover:bg-white/10 hover:text-white transition-all px-1"
                  data-testid="button-view-leaderboard"
                >
                  VIEW LEADERBOARD
                </Button>
                <a href="https://legendz.io?ref=MANTS7" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full h-9 sm:h-12 text-[10px] sm:text-sm font-bold bg-[#7c3aed] hover:bg-[#6d28d9] text-white border-none px-1" data-testid="button-signup-code">
                    SIGN UP WITH CODE MANTS7
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Winovo card */}
          <Card className="w-full bg-[#15192b] border-transparent">
            <CardContent className="p-3 sm:p-6 flex flex-col items-center gap-3">
              <div className="text-[9px] sm:text-sm font-bold text-muted-foreground tracking-widest uppercase text-center">
                Weekly Leaderboard
              </div>
              <div className="h-5 sm:h-8 flex items-center text-xl sm:text-2xl font-black italic tracking-tight text-white">
                WIN<span className="text-[#7c3aed]">OVO</span>
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-primary">$500</div>
              <div className="w-full flex flex-col gap-2">
                <Button
                  onClick={() => navigate("/winovo")}
                  variant="outline"
                  className="w-full h-9 sm:h-12 text-[10px] sm:text-sm font-bold border-2 border-white/70 hover:bg-white/10 hover:text-white transition-all px-1"
                  data-testid="button-view-winovo-leaderboard"
                >
                  VIEW LEADERBOARD
                </Button>
                <a href="https://winovo.io/?ref=mants7" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full h-9 sm:h-12 text-[10px] sm:text-sm font-bold bg-[#7c3aed] hover:bg-[#6d28d9] text-white border-none px-1">
                    SIGN UP WITH CODE MANTS7
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Socials */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Connect With Us</h3>
          <div className="flex gap-5 justify-center">
            <a href="https://discord.gg/WxSprRXHQ" target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#5865F2]/10 flex items-center justify-center border border-[#5865F2]/30 text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all hover:scale-110">
              <SiDiscord size={24} />
            </a>
            <a href="https://kick.com/mants7" target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#53FC18]/10 flex items-center justify-center border border-[#53FC18]/30 text-[#53FC18] hover:bg-[#53FC18] hover:text-black transition-all hover:scale-110">
              <SiKick size={24} />
            </a>
            <a href="https://x.com/mants7_" target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-all hover:scale-110">
              <SiX size={22} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
