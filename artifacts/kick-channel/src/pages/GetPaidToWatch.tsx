import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Tv, Coins } from "lucide-react";

export default function GetPaidToWatch() {
  const steps = [
    {
      num: 1,
      icon: <UserPlus className="w-8 h-8 text-primary" />,
      title: "Join Kick",
      desc: "Create your free account on Kick.com and follow the channel."
    },
    {
      num: 2,
      icon: <Tv className="w-8 h-8 text-primary" />,
      title: "Watch Live",
      desc: "Tune in to the stream and actively watch. The longer you stay, the more you earn."
    },
    {
      num: 3,
      icon: <Coins className="w-8 h-8 text-primary" />,
      title: "Earn Rewards",
      desc: "Collect your rewards automatically as you watch. Redeem for prizes."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
          GET PAID TO WATCH
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          Viewers earn rewards just by watching the stream on Kick. The longer you watch, the more you earn. Support the channel and get rewarded for your time.
        </p>

        <div className="grid md:grid-cols-3 gap-6 w-full mb-16 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border z-0"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              <Card className="bg-card border-border h-full hover:border-primary/50 transition-all hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.2)] mb-6 relative">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center border-4 border-card">
                      {step.num}
                    </div>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button 
          size="lg" 
          className="h-16 px-12 text-xl font-bold bg-[#53FC18] hover:bg-[#45d912] text-black shadow-[0_0_20px_rgba(83,252,24,0.4)] border-none mb-6 rounded-full"
          onClick={() => window.open('https://kick.com', '_blank')}
        >
          WATCH ON KICK
        </Button>
        <p className="text-sm text-muted-foreground tracking-wide font-medium">
          * Rewards refresh daily. Must be logged in to earn.
        </p>
      </motion.div>
    </div>
  );
}
