export default function handler(req: { method: string; body: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: string; }): void; new(): any; }; }; }) {
    if (req.method === 'POST') {
        const { id } = req.body; // POSTデータからIDを取得
        if (id) {
        res.status(200).json({ message: `Received ID: ${id}` });
        } else {
        res.status(400).json({ error: 'ID is required' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' }); // POST以外を拒否
    }
}