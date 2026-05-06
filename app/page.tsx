'use client';

import React, { useState } from 'react';

// かわいい丸文字フォント
const fontLink = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@900&display=swap";

export default function AayanFinalApp() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  
  // 今日の入力用
  const [inGrip, setInGrip] = useState("");
  const [inDumb, setInDumb] = useState("");

  // 10日分の記録（見るだけ）
  const [logs] = useState(Array.from({ length: 10 }, (_, i) => ({
    date: `5/${10 - i}`,
    grip: (21 + Math.random() * 4).toFixed(1),
    dumb: 15 + i * 2
  })));

  // 自己ベスト
  const bestTimes = ["3:08", "3:11", "3:15", "3:18", "3:20", "3:22", "3:25", "3:28", "3:30", "3:32"];

  if (!selectedCat) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#ff9ebb', fontFamily: '"Zen Maru Gothic", sans-serif' }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '30px', textAlign: 'center' }}>あーやん！<br/>一緒に走るネコを選んで！</h1>
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
      fontFamily: '"Zen Maru Gothic", sans-serif', color: '#333',
      backgroundImage: 'url("/bg-track.png")', // ダウンロードした画像
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
      paddingBottom: '220px'
    }}>
      <link href={fontLink} rel="stylesheet" />

      {/* 1. タイトル（最上部） */}
      <div style={{ width: '100%', padding: '15px 10px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(5px)', borderBottom: '4px solid #ff4d8d', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: '18px', margin: 0, color: '#ff4d8d' }}>🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️</h1>
        <div style={{ fontSize: '15px', fontWeight: '900', color: '#333' }}>目指せ800m 3分10秒以内！！！</div>
      </div>

      <div style={{ padding: '0 15px', position: 'relative', zIndex: 1 }}>
        
        {/* 2. レベル表示（背景なし・透過） */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '65px', fontWeight: '900', color: '#ffcc00', textShadow: '3px 3px 0 #333, -2px -2px 0 #333' }}>Lv. 15</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '-10px' }}>
            <span style={{ fontWeight: '900', color: '#ff4d4d', fontSize: '18px', textShadow: '1px 1px 2px #fff' }}>体力</span>
            <div style={{ width: '180px', height: '20px', background: 'rgba(0,0,0,0.5)', borderRadius: '10px', border: '2px solid #fff', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #ff4d4d, #ff8080)' }} />
            </div>
          </div>
        </div>

        {/* 3. キャラクター（背景なし・直接イラストの上に浮く） */}
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <div style={{ fontSize: '140px', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.4))' }} className="character-jump">{selectedCat}</div>
        </div>

        {/* 4. 10日間の記録履歴（半透明で背景を活かす） */}
        <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '20px', padding: '15px', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', marginBottom: '15px' }}>
          <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '14px', marginBottom: '8px' }}>🗓️ 10日間のきろく（見るだけ）</div>
          <div style={{ maxHeight: '130px', overflowY: 'auto' }}>
            <table style={{ width: '100%', fontSize: '13px' }}>
              <thead style={{ background: 'rgba(0,0,0,0.05)', position: 'sticky', top: 0 }}>
                <tr><th>日付</th><th>握力</th><th>回数</th></tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} style={{ textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td style={{ padding: '6px 0' }}>{l.date}</td>
                    <td style={{ color: '#ff4d8d', fontWeight: 'bold' }}>{l.grip}kg</td>
                    <td style={{ color: '#4caf50', fontWeight: 'bold' }}>{l.dumb}回</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. 自己ベスト（半透明） */}
        <div style={{ background: 'rgba(0,0,0,0.6)', color: '#ffcc00', borderRadius: '20px', padding: '15px', backdropFilter: 'blur(4px)' }}>
          <div style={{ textAlign: 'center', fontWeight: '900', marginBottom: '8px', fontSize: '14px' }}>🏆 自己ベスト</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '12px' }}>
            {bestTimes.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: '#ccc' }}>{i + 1}位</span><span style={{ color: '#fff', fontWeight: 'bold' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. 固定入力フォーム（スマホ操作用） */}
      <div style={{
        position: 'fixed', bottom: 0, width: '100%', background: 'rgba(255,255,255,0.95)',
        padding: '15px', borderTop: '5px solid #ff4d8d', zIndex: 100, borderRadius: '25px 25px 0 0',
        boxShadow: '0 -5px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" placeholder="分" style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #ddd', fontSize: '16px' }} />
            <input type="number" placeholder="秒" style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #ddd', fontSize: '16px' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" value={inGrip} onChange={e => setInGrip(e.target.value)} placeholder="握力(kg)" style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '2px solid #ddd' }} />
            <input type="number" value={inDumb} onChange={e => setInDumb(e.target.value)} placeholder="ダンベル(回)" style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '2px solid #ddd' }} />
          </div>
          <button style={{
            width: '100%', padding: '15px', background: 'linear-gradient(#ff4d8d, #ff1a75)', color: 'white',
            border: 'none', borderRadius: '30px', fontWeight: '900', fontSize: '20px', boxShadow: '0 4px 0 #b30047'
          }}>
            きろく完了！
          </button>
        </div>
      </div>

      <style>{`
        @keyframes characterJump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
        .character-jump { display: inline-block; animation: characterJump 2s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
