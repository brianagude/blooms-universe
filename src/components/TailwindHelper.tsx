export const TailwindHelper = () => {
  return (
    <div className="fixed bottom-20 left-4 z-50 bg-black text-white px-3 py-1 rounded-full font-mono text-sm pointer-events-none">
      <div className="sm:hidden">xs (&lt;640px)</div>
      <div className="hidden sm:block md:hidden">sm (640px+)</div>
      <div className="hidden md:block lg:hidden">md (768px+)</div>
      <div className="hidden lg:block xl:hidden">lg (1024px+)</div>
      <div className="hidden xl:block 2xl:hidden">xl (1280px+)</div>
      <div className="hidden 2xl:block">2xl (1536px+)</div>
    </div>
  );
};
