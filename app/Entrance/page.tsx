import "../globals.css";
export default function Entrance() {
  return (
    <div className="min-h-screen flex items-center justify-center translate-y-[-2vh]" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="flex items-center w-full whitespace-nowrap">
        <div className="h-[1px] bg-white w-[35vw]"></div>
        <h1 className="text-5xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:0.75px_white] mx-4">役職はどっち？</h1>
        <div className="h-[1px] bg-white w-[35vw]"></div>
      </div>
    </div>
  );
}

