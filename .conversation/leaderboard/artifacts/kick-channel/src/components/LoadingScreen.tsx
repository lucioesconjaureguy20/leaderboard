import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logoPath from "@assets/ChatGPT_Image_7_jun_2026,_16_06_27_1780859648982.png";

const DURATION_MS = 2400;

// This component handles its own progress animation and calls onDone() when
// the bar reaches 100%. The parent (App) controls mounting/unmounting via
// AnimatePresence, so this component just needs a motion root with an exit prop.
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [imgReady, setImgReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logoPath;
    img.onload = () => setImgReady(true);
    img.onerror = () => setImgReady(true);
  }, []);

  useEffect(() => {
    if (!imgReady) return;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const p = Math.min((now - start) / DURATION_MS, 1);
      setProgress(1 - Math.pow(1 - p, 2.5));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 200);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [imgReady, onDone]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-10 bg-background"
      style={{ pointerEvents: "none" }}
    >
      <motion.img
        src={logoPath}
        alt="Loading"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: imgReady ? 1 : 0, scale: imgReady ? 1 : 0.85 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-36 h-36 object-cover"
        style={{ objectPosition: "50% 30%" }}
      />
      <div className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)",
            boxShadow: "0 0 12px rgba(168,85,247,0.7)",
          }}
        />
      </div>
    </motion.div>
  );
}
