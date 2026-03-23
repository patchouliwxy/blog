export const HomeCompanion = () => (
  <aside className="hidden xl:flex xl:flex-col xl:items-center xl:gap-5 xl:pt-48">
    <div className="max-w-[170px] rounded-[1.25rem] border border-[#9f8366] bg-[#8a7764]/18 px-4 py-4 text-sm leading-7 text-[#e9d8c7] shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur">
      如果你想先快速了解这个站点，可以从最新文章开始往下翻。
    </div>

    <div className="relative h-48 w-32">
      <div className="absolute inset-x-5 bottom-0 h-10 rounded-full bg-black/45 blur-xl" />
      <div className="absolute left-4 top-2 h-8 w-8 rotate-[-18deg] rounded-t-full rounded-b-xl bg-[#2f2f31]" />
      <div className="absolute right-4 top-2 h-8 w-8 rotate-[18deg] rounded-t-full rounded-b-xl bg-[#2f2f31]" />
      <div className="absolute inset-x-3 bottom-2 top-6 rounded-[999px] bg-gradient-to-b from-[#4a4a4d] to-[#262628]" />
      <div className="absolute left-8 top-16 h-2 w-2 rounded-full bg-white/30" />
      <div className="absolute right-8 top-16 h-2 w-2 rounded-full bg-white/30" />
      <div className="absolute left-1/2 top-20 h-1.5 w-6 -translate-x-1/2 rounded-full bg-white/10" />
      <div className="absolute left-0 top-24 h-[2px] w-12 bg-white/12" />
      <div className="absolute right-0 top-24 h-[2px] w-12 bg-white/12" />
      <div className="absolute left-0 top-28 h-[2px] w-11 bg-white/10" />
      <div className="absolute right-0 top-28 h-[2px] w-11 bg-white/10" />
      <div className="absolute bottom-5 left-4 h-10 w-6 rounded-full bg-[#232325]" />
      <div className="absolute bottom-5 right-4 h-10 w-6 rounded-full bg-[#232325]" />
      <div className="absolute bottom-0 left-[-12px] h-5 w-24 rounded-full border-b-[6px] border-[#2c2c2e]" />
    </div>
  </aside>
);
