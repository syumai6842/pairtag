<<<<<<< HEAD
<<<<<<< HEAD
import Image from "next/image";
import Test from "./test";
=======
>>>>>>> 9aa557f51fb4628cb98e3f5a9fbe62efbef3c537
export default function Home() {
=======
import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/firebaseConfig";

export default async function Home() {
  const QuerySnapshot = await getDocs(collection(db, "message"));
  const messages = QuerySnapshot.docs
    .map(doc => doc.data())
    .sort((a, b) => a.createdAt - b.createdAt)
    .map(data => data.text);

  console.log(messages);
>>>>>>> 3c0d3b01228ca0c00fceec96728d57fe8782b0ea
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
