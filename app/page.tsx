'use client';

import React, { useState } from 'react';

const fontLink = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@900&display=swap";

export default function AayanApp() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  
  // 記録用データ（10日分表示）
  const [logs] = useState(Array.from({ length: 10 }, (_, i) => ({
    date: `5/${10 - i}`,
    grip: (22 + Math.random() * 3).toFixed(1),
    dumb: 20 + i
  })));

  if (!selectedCat) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#ff9ebb', fontFamily: '"Zen Maru Gothic", sans-serif' }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '30px' }}>相棒のネコを選んで！</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          {['🐱', '🐈‍⬛', '🐈', '🐾', '🐯', '🦁'].map(c => (
            <button key={c} onClick={() => setSelectedCat(c)} style={{ fontSize: '40px', background: 'white', border: 'none', borderRadius: '20px', padding: '15px', boxShadow: '0 5px 0 #e67eac' }}>{c}</button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main style={{
      width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto',
      fontFamily: '"Zen Maru Gothic", sans-serif',
      backgroundImage: 'url("/bg-track.png")', // ダウンロードした画像
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
      paddingBottom: '200px'
    }}>
      <link href={fontLink} rel="stylesheet" />

      {/* コンテンツエリア */}
      <div style={{ padding: '20px', position: 'relative', zIndex: 1 }}>
        
        {/* ステータスボード */}
        <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '25px', padding: '15px', border: '3px solid #ff4d8d', textAlign: 'center', backdropFilter: 'blur(5px)' }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }} className="jump">{selectedCat}</div>
          <div style={{ fontSize: '40px', fontWeight: '900', color: '#ffcc00', textShadow: '2px 2px 0 #000' }}>Lv. 15</div>
          <p style={{ margin: '5px 0', fontSize: '14px', fontWeight: 'bold' }}>🔥 800m目標: 3分10秒！</p>
        </div>

        {/* 10日間の記録履歴 */}
        <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '20px', marginTop: '15px', padding: '15px', border: '2px solid #ddd' }}>
          <h3 style={{ fontSize: '16px', textAlign: 'center', margin: '0 0 10px 0' }}>🗓️ 10日間のきろく</h3>
          <div style={{ maxHeight: '150px', overflowY: 'auto', fontSize: '14px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#eee', position: 'sticky', top: 0 }}>
                <tr><th>日付</th><th>握力</th><th>回数</th></tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '5px' }}>{l.date}</td>
                    <td style={{ color: '#ff4d8d', fontWeight: 'bold' }}>{l.grip}kg</td>
                    <td style={{ color: '#4caf50', fontWeight: 'bold' }}>{l.dumb}回</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 自己ベスト 10個 */}
        <div style={{ background: 'rgba(0,0,0,0.7)', color: 'yellow', borderRadius: '20px', marginTop: '15px', padding: '15px' }}>
          <h3 style={{ fontSize: '16px', textAlign: 'center', margin: '0 0 10px 0' }}>🏆 自己ベスト TOP10</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '12px' }}>
            {["3:08", "3:11", "3:15", "3:18", "3:20", "3:22", "3:25", "3:28", "3:30", "3:32"].map((t, i) => (
              <div key={i} style={{ borderBottom: '1px solid #555' }}>{i+1}位: {t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 固定入力フォーム */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', padding: '15px', borderTop: '5px solid #ff4d8d', borderRadius: '25px 25px 0 0' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input type="number" placeholder="分" style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '2px solid #ddd' }} />
          <input type="number" placeholder="秒" style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '2px solid #ddd' }} />
        </div>
        <button style={{ width: '100%', padding: '15px', background: '#ff4d8d', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold', fontSize: '18px' }}>
          きろく完了！
        </button>
      </div>

      <style>{`
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .jump { display: inline-block; animation: jump 2s infinite; }
      `}</style>
    </main>
  );
}
