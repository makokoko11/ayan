'use client';

import React, { useState, useEffect } from 'react';

const fontLink = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@900&display=swap";

const CATS = [
  { id: 1, name: 'しろまる', pos: '0% 0%' },
  { id: 2, name: 'くろすけ', pos: '25% 0%' },
  { id: 3, name: 'みけラン', pos: '50% 0%' },
  { id: 4, name: 'ハチワレくん', pos: '75% 0%' },
  { id: 5, name: 'とらまる', pos: '100% 0%' },
  { id: 6, name: 'ふわにゃん', pos: '0% 100%' },
  { id: 7, name: 'シャムラン', pos: '25% 100%' },
  { id: 8, name: 'スピードにゃん', pos: '50% 100%' },
  { id: 9, name: 'もちにゃん', pos: '75% 100%' },
  { id: 10, name: '夜空にゃん', pos: '100% 100%' },
];

export default function AayanRPGApp() {
  const [selectedCat, setSelectedCat] = useState<typeof CATS[0] | null>(null);
  const [hp, setHp] = useState(85); // 初期HP
  const [lv, setLv] = useState(15);
  
  // 入力用
  const [inMin, setInMin] = useState("");
  const [inSec, setInSec] = useState("");
  const [inDumb, setInDumb] = useState("");
  const [inGrip, setInGrip] = useState("");

  const handleSave = () => {
    // 記録するとHPが回復してレベルが上がる演出
    setHp(prev => Math.min(prev + 15, 100)); 
    if (hp >= 90) setLv(prev => prev + 1);
    
    // SE再生（ファイルがある場合）
    new Audio('/se.mp3').play().catch(() => {});
    alert(`ナイス特訓！${selectedCat?.name}のレベルが上がったかも！？`);
  };

  if (!selectedCat) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#ff9ebb', fontFamily: '"Zen Maru Gothic", sans-serif', padding: '20px', textAlign: 'center', overflowY: 'auto' }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ color: 'white', textShadow: '2px 2px 0 #d46' }}>パートナーを選んで！</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '20px' }}>
          {CATS.map(cat => (
            <div key={cat.id} onClick={() => setSelectedCat(cat)} style={{ background: 'white', borderRadius: '15px', padding: '10px', boxShadow: '0 4px 0 #e67eac' }}>
              <div style={{ width: '110px', height: '110px', margin: '0 auto', backgroundImage: 'url("/cats-lineup.png")', backgroundSize: '500% 200%', backgroundPosition: cat.pos, backgroundRepeat: 'no-repeat' }} />
              <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main style={{
      width: '100vw', height: '100vh', overflowX: 'hidden',
      fontFamily: '"Zen Maru Gothic", sans-serif',
      backgroundImage: 'url("/bg-track.png")',
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
    }}>
      <link href={fontLink} rel="stylesheet" />

      {/* タイトル */}
      <div style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderBottom: '4px solid #ff4d8d', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: '18px', margin: 0, color: '#ff4d8d' }}>🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️</h1>
      </div>

      <div style={{ padding: '0 15px', textAlign: 'center' }}>
        
        {/* HPゲージエリア */}
        <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '20px', border: '2px solid #ffcc00' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
            <span style={{ color: '#ffcc00', fontWeight: '900', fontSize: '20px' }}>Lv.{lv}</span>
            <span style={{ color: 'white', fontSize: '12px' }}>HP {hp} / 100</span>
          </div>
          {/* ゲージ本体 */}
          <div style={{ width: '100%', height: '18px', background: '#333', borderRadius: '10px', border: '2px solid #fff', overflow: 'hidden' }}>
            <div style={{ 
              width: `${hp}%`, height: '100%', 
              background: hp > 30 ? 'linear-gradient(90deg, #4caf50, #8bc34a)' : 'linear-gradient(90deg, #f44336, #e91e63)',
              transition: 'width 0.5s ease-in-out'
            }} />
          </div>
        </div>

        {/* キャラクター */}
        <div style={{ marginTop: '30px' }}>
          <div style={{ 
            width: '200px', height: '200px', margin: '0 auto',
            backgroundImage: 'url("/cats-lineup.png")', 
            backgroundSize: '500% 200%', backgroundPosition: selectedCat.pos,
            filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.4))'
          }} className="jump" />
          <div style={{ color: 'white', textShadow: '2px 2px 4px #000', fontWeight: 'bold', fontSize: '20px', marginTop: '10px' }}>
             {selectedCat.name} 爆走中！
          </div>
        </div>
      </div>

      {/* 入力フォーム */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', padding: '15px', borderTop: '5px solid #ff4d8d', borderRadius: '30px 30px 0 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            <label style={{ fontSize: '10px', color: '#ff4d8d', display: 'block' }}>タイム</label>
            <div style={{ display: 'flex', gap: '2px' }}>
              <input type="number" value={inMin} onChange={e => setInMin(e.target.value)} placeholder="分" style={{ width: '100%', padding: '8px', border: '2px solid #ff4d8d', borderRadius: '8px' }} />
              <input type="number" value={inSec} onChange={e => setInSec(e.target.value)} placeholder="秒" style={{ width: '100%', padding: '8px', border: '2px solid #ff4d8d', borderRadius: '8px' }} />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <label style={{ fontSize: '10px', color: '#4caf50', display: 'block' }}>ダンベル</label>
            <input type="number" value={inDumb} onChange={e => setInDumb(e.target.value)} placeholder="回数" style={{ width: '100%', padding: '8px', border: '2px solid #4caf50', borderRadius: '8px' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <label style={{ fontSize: '10px', color: '#2196f3', display: 'block' }}>握力</label>
            <input type="number" value={inGrip} onChange={e => setInGrip(e.target.value)} placeholder="kg" style={{ width: '100%', padding: '8px', border: '2px solid #2196f3', borderRadius: '8px' }} />
          </div>
        </div>

        <button 
          onClick={handleSave}
          style={{ width: '100%', padding: '18px', background: 'linear-gradient(#ff4d8d, #ff1a75)', color: 'white', border: 'none', borderRadius: '40px', fontWeight: 'bold', fontSize: '20px', boxShadow: '0 5px 0 #b30047' }}>
          きろくして回復！
        </button>
      </div>

      <style>{`
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
        .jump { display: inline-block; animation: jump 2s infinite; }
      `}</style>
    </main>
  );
}
