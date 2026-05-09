import { motion } from "framer-motion";

export const HeroSection = () => (
  <section className="relative -mx-6 flex min-h-[520px] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
    {/* Dot pattern overlay — like filter-dot from Sakura theme */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />

    {/* Large soft radial glows for depth */}
    <div
      className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: "radial-gradient(circle, rgba(0,113,227,0.15) 0%, transparent 70%)" }}
    />
    <div
      className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full"
      style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
    />

    {/* Content */}
    <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-400"
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          patchouli blog
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-400"
        >
          
        </motion.p>
      </motion.div>
    </div>
  </section>
);
