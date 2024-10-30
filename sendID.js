const fetch = require('node-fetch'); // node-fetchをインポート

// APIにIDを送信する関数
async function sendId(id) {
  try {
    const response = await fetch('http://localhost:3000/api/getID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // IDをJSON形式で送信
    });

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (response.ok) {
        console.log(`成功: ${data.message}`); // 成功メッセージを表示
      } else {
        console.error(`エラー: ${data.error}`); // エラーメッセージを表示
      }
    } else {
      console.error('エラー: JSON形式のレスポンスではありません');
    }
  } catch (error) {
    console.error(`通信エラー: ${error.message}`); // ネットワークエラーの処理
  }
}

// スクリプトを実行する
const id = '12345'; // 送信するID
sendId(id);
