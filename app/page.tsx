'use client';

import React, { useState } from 'react';

const fontLink = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@900&display=swap";

export default function AayanTrackApp() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  
  // 入力用ステート
  const [inMin, setInMin] = useState("");
  const [inSec, setInSec] = useState("");
  const [inDumb, setInDumb] = useState("");
  const [inGrip, setInGrip] = useState("");

  // 過去10日分のデータ（仮の初期値）
  const [logs] = useState(Array.from({ length: 10 }, (_, i) => ({
    date: `5/${10 - i}`,
    grip: (22 + Math.random() * 2).toFixed(1),
    dumb: 20 + i
  })));

  // --- 入力値と過去ログを合わせた「現在のリアルタイム記録」を計算 ---
  const currentMaxGrip = Math.max(...logs.map(l => Number(l.grip)), Number(inGrip) || 0);
  const currentTotalDumb = logs.reduce((sum, l) => sum + Number(l.dumb), 0) + (Number(inDumb) || 0);

  // 音楽再生用の関数
  const playSE = () => {
    const audio = new Audio('/se.mp3'); // publicフォルダのse.mp3
    audio.play().catch(() => console.log("SE再生エラー：ファイルを確認してね"));
  };

  if (!selectedCat) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#ff9ebb', fontFamily: '"Zen Maru Gothic", sans-serif' }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ color: 'white' }}>相棒を選んでね！</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '20px' }}>
          {['🐱', '🐈‍⬛', '🐈', '🐾', '🐯', '🦁'].map(c => (
            <button key={c} onClick={() => setSelectedCat(c)} style={{ fontSize: '40px', background: 'white', border: 'none', borderRadius: '20px', padding: '15px' }}>{c}</button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main style={{
      width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto',
      fontFamily: '"Zen Maru Gothic", sans-serif',
      backgroundImage: 'url("/bg-track.png")',
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
      paddingBottom: '240px'
    }}>
      <link href={fontLink} rel="stylesheet" />

      {/* タイトル */}
      <div style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderBottom: '4px solid #ff4d8d', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: '18px', margin: 0, color: '#ff4d8d' }}>🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️</h1>
      </div>

      <div style={{ padding: '0 15px' }}>
        {/* ステータス（ここが入力に合わせて動きます） */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '15px', textAlign: 'center', border: '2px solid #ff4d8d' }}>
            <div style={{ fontSize: '10px' }}>最高握力</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff4d8d' }}>{currentMaxGrip}kg</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '15px', textAlign: 'center', border: '2px solid #4caf50' }}>
            <div style={{ fontSize: '10px' }}>ダンベル合計</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4caf50' }}>{currentTotalDumb}回</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div style={{ fontSize: '120px' }} className="jump">{selectedCat}</div>
        </div>

        {/* 過去ログ */}
        <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '20px', padding: '15px', marginTop: '10px' }}>
          <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>🗓️ 過去10日のきろく</div>
          <div style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '12px' }}>
            <table style={{ width: '100%' }}>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '4px' }}>{l.date}</td><td>{l.grip}kg</td><td>{l.dumb}回</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- 入力パネル：ここを使いやすく直しました --- */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', padding: '15px', borderTop: '5px solid #ff4d8d', borderRadius: '30px 30px 0 0', boxShadow: '0 -5px 15px rgba(0,0,0,0.2)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '15px' }}>
          {/* タイム入力 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#666' }}>⏱️ タイム</label>
            <div style={{ display: 'flex', gap: '2px' }}>
              <input type="number" value={inMin} onChange={e => setInMin(e.target.value)} placeholder="分" style={{ width: '100%', padding: '8px', border: '2px solid #ff4d8d', borderRadius: '8px' }} />
              <input type="number" value={inSec} onChange={e => setInSec(e.target.value)} placeholder="秒" style={{ width: '100%', padding: '8px', border: '2px solid #ff4d8d', borderRadius: '8px' }} />
            </div>
          </div>
          {/* ダンベル入力 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#666' }}>💪 ダンベル</label>
            <input type="number" value={inDumb} onChange={e => setInDumb(e.target.value)} placeholder="回数" style={{ padding: '8px', border: '2px solid #4caf50', borderRadius: '8px' }} />
          </div>
          {/* 握力入力 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#666' }}>✊ 握力</label>
            <input type="number" value={inGrip} onChange={e => setInGrip(e.target.value)} placeholder="kg" style={{ padding: '8px', border: '2px solid #2196f3', borderRadius: '8px' }} />
          </div>
        </div>

        <button 
          onClick={() => { playSE(); alert("きろく完了にゃ！"); }}
          style={{ width: '100%', padding: '18px', background: 'linear-gradient(#ff4d8d, #ff1a75)', color: 'white', border: 'none', borderRadius: '40px', fontWeight: 'bold', fontSize: '20px', boxShadow: '0 5px 0 #b30047' }}>
          きろくする！
        </button>
      </div>

      <style>{`
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25px); } }
        .jump { display: inline-block; animation: jump 2s infinite; }
      `}</style>
    </main>
  );
}
