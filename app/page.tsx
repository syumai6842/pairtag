<<<<<<< HEAD
import Image from "next/image";
import Test from "./test";
=======
>>>>>>> 9aa557f51fb4628cb98e3f5a9fbe62efbef3c537
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Test />
      <Test />
      <p className="absolute bottom-10 text-center">
        Hello{" "}
        <span className="text-yellow-500 text-2xl font-bold
          animate-pulse
          hover:opacity-0 hover:scale-95
          transition-all duration-500 ease-in-out
          [text-shadow:_0_0_10px_rgb(234_179_8_/_80%)]
          animate-[glow_1.5s_ease-in-out_infinite]">
          Fejiek Naoki
        </span>
      </p>
    </div>
  );
}
