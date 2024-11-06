import { db } from "./firebaseConfig";
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";

export async function GetLocation(): Promise<{ lat: number; lng: number; }[]> {
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

export async function GetMission(): Promise<boolean[]> {
    // "locations" コレクションへの参照を取得
    const messageRef = collection(db, "mission");
    const querySnapshot = await getDocs(messageRef);
    
    // 取得したドキュメントをマッピングし、latとlngのプロパティを持つオブジェクトを生成
    const missions: boolean[] = querySnapshot.docs.sort((a, b) => parseInt(a.id) - parseInt(b.id)).map(doc => {
        const data = doc.data(); // 各ドキュメントのデータを取得
        return data.isCleared;
    });

    return missions;
}

export async function SetLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const deviceId = await getLocalIP(); // ローカルIPアドレスを取得してdeviceIdとして使用

                // Firebaseの"locations"コレクションに位置情報を更新
                try {
                    const locationsRef = doc(db, "locations", deviceId);
                    await setDoc(locationsRef, {
                        lat: latitude,
                        lng: longitude,
                    }, { merge: true });
                    console.log("Location updated in Firestore");
                } catch (error) {
                    console.error("Error updating location in Firestore: ", error);
                }
            },
            (error) => {
                console.error("Error getting current position: ", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

async function getLocalIP(): Promise<string> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.ipify.org?format=json", true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response.ip); // IPアドレスを返す
            } else {
                reject("Unable to fetch IP address");
            }
        };
        xhr.onerror = () => reject("Network error");
        xhr.send();
    });
}