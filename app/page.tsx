import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/firebaseConfig";

export default async function Home() {
  const QuerySnapshot = await getDocs(collection(db, "message"));
  const messages = QuerySnapshot.docs
    .map(doc => doc.data())
    .sort((a, b) => a.createdAt - b.createdAt)
    .map(data => data.text);

  console.log(messages);
  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}
