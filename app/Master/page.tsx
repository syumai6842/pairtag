"use client"
import { doc, setDoc, Timestamp } from "firebase/firestore";
import "../globals.css";
import { db } from "../config/firebaseConfig";

async function startGame(){
    //reset mission
    await setDoc(doc(db, "mission", "1"), {
        isCleared:false
    });
    await setDoc(doc(db, "mission", "2"), {
        isCleared:false
    });
    await setDoc(doc(db, "mission", "1"), {
        isCleared:true
    });

    //clear all data
    

    //set current time to property
    await setDoc(doc(db, "property", "default"), {
        startTime:Timestamp.now()
    });
}

export default function Master() {
    return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 active:animate-pulse"
        onClick={startGame}>
        ゲームスタート
      </button>
    </div>
    );
}
