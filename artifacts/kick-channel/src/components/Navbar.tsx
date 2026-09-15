import { Link, useLocation } from "wouter";
import logoPath from "@assets/ChatGPT_Image_7_jun_2026,_16_06_27_1780859648982.png";

export default function Navbar() {
  const [location] = useLocation();

  const linkClass = (path: string) =>
    `uppercase transition-colors font-medium tracking-wide text-sm ${
      location === path ? "text-primary" : "text-foreground/70 hover:text-primary"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/50 z-50 px-4 md:px-8 flex items-center justify-between">
      <Link href="/">
        <img src={logoPath} alt="Logo" className="h-12 w-12 rounded-full object-cover" style={{ objectPosition: "50% 30%" }} />
      </Link>

      <div className="flex items-center gap-6 md:gap-8">
        <Link href="/" className={linkClass("/")} data-testid="nav-home">Home</Link>
        <Link href="/legendz" className={linkClass("/legendz")} data-testid="nav-legendz">Legendz</Link>
        <Link href="/winovo" className={linkClass("/winovo")} data-testid="nav-winovo">Winovo</Link>
      </div>
    </nav>
  );
}
