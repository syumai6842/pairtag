import { db } from "./firebaseConfig";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";

async function GetLocation(): Promise<{ lat: number; lng: number; }[]> {
    // "locations" コレクションへの参照を取得
    const locationsRef = collection(db, "locations");
    const querySnapshot = await getDocs(locationsRef);
    
    // 取得したドキュメントをマッピングし、latとlngのプロパティを持つオブジェクトを生成
    const locations: { lat: number; lng: number }[] = querySnapshot.docs.map(doc => {
        const data = doc.data(); // 各ドキュメントのデータを取得
        return {
            lat: data.lat, // データからlatフィールドを取得
            lng: data.lng  // データからlngフィールドを取得
        };
    });

    return locations;
}

async function Getmessage(): Promise<string[]> {
    // "locations" コレクションへの参照を取得
    const messageRef = collection(db, "message");
    const querySnapshot = await getDocs(query(messageRef, orderBy("createdAt", "asc")));
    
    // 取得したドキュメントをマッピングし、latとlngのプロパティを持つオブジェクトを生成
    const locations: string[] = querySnapshot.docs.map(doc => {
        const data = doc.data(); // 各ドキュメントのデータを取得
        return data.text;
    });

    return locations;
}

async function SetLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // Firebaseの"locations"コレクションに位置情報を追加
                try {
                    const locationsRef = collection(db, "locations");
                    await addDoc(locationsRef, {
                        lat: latitude,
                        lng: longitude,
                    });
                    console.log("Location added to Firestore");
                } catch (error) {
                    console.error("Error adding location to Firestore: ", error);
                }
            },
            (error) => {
                console.error("Error getting current position: ", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}