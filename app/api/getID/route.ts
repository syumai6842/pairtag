import { db } from "@/app/config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest): NextResponse {
    // GET /api/users リクエストの処理
    console.log(request.json());
    return NextResponse.json({ message: "GET request is not " });
}

export async function POST(request: NextRequest): Promise<NextResponse<unknown>> {
    const { id } = await request.json();
    // POST /api/users リクエストの処理
    console.log(id);
    await addDoc(collection(db, "message"), {
        text: `ミッション${id}がクリアされました。\n一人解放されます`,
        createdAt: Date.now()
    });
    return NextResponse.json({ message: `Received ID: ${id}` });
}