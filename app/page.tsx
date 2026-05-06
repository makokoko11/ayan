'use client';

import React, { useState, useEffect } from 'react';

const fontLink = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@900&display=swap";

// 10匹の猫の設定（画像内の位置）
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

export default function AayanSurvivalApp() {
  const [selectedCat, setSelectedCat] = useState<typeof CATS[0] | null>(null);
  const [logs, setLogs] = useState<{date: string, min: string, sec: string, dumb: string, grip: string}[]>([]);
  const [hp, setHp] = useState(100);
  const [isDead, setIsDead] = useState(false);
  
  // 入力用
  const [inMin, setInMin] = useState("");
  const [inSec, setInSec] = useState("");
  const [inDumb, setInDumb] = useState("");
  const [inGrip, setInGrip] = useState("");

  // --- スマホ（LocalStorage）からのデータ読み込み ---
  useEffect(() => {
    const savedLogs = localStorage.getItem('aayan_logs');
    const lastTime = localStorage.getItem('aayan_last_date');
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    
    // HPと生存判定（24時間放置で死亡）
    if (lastTime) {
      const diff = (new Date().getTime() - new Date(lastTime).getTime()) / (1000 * 60 * 60);
      const newHp = Math.max(0, 100 - Math.floor(diff * 4.16)); // 1時間ごとに約4%減少
      setHp(newHp);
      if (diff >= 24) setIsDead(true);
    }
  }, []);

  // --- 記録の保存 ---
  const handleSave = () => {
    if (!inMin && !inDumb && !inGrip) return;

    const newEntry = {
      date: new Date().toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      min: inMin, sec: inSec, dumb: inDumb, grip: inGrip
    };

    const updatedLogs = [newEntry, ...logs];
    setLogs(updatedLogs);
    setHp(100); // 記録したらHP全回復
    setIsDead(false);
    
    // スマホに保存
    localStorage.setItem('aayan_logs', JSON.stringify(updatedLogs));
    localStorage.setItem('aayan_last_date', new Date().toISOString());

    // 入力をクリア
    setInMin(""); setInSec(""); setInDumb(""); setInGrip("");
    alert("きろく完了！HPが回復したにゃ！");
  };

  if (!selectedCat) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#ff9ebb', fontFamily: '"Zen Maru Gothic", sans-serif', padding: '20px', textAlign: 'center', overflowY: 'auto' }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ color: 'white', textShadow: '2px 2px 0 #d46' }}>パートナーを選択</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '20px' }}>
          {CATS.map(cat => (
            <div key={cat.id} onClick={() => setSelectedCat(cat)} style={{ background: 'white', borderRadius: '15px', padding: '10px', cursor: 'pointer' }}>
              <div style={{ 
                width: '100px', height: '100px', margin: '0 auto',
                backgroundImage: 'url("/cats-lineup.png")', 
                backgroundSize: '500% 200%', backgroundPosition: cat.pos,
                borderRadius: '50%', border: '2px solid #eee'
              }} />
              <div style={{ fontWeight: 'bold', marginTop: '5px', fontSize: '14px' }}>{cat.name}</div>
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

      {/* タイトルバー */}
      <div style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.8)', borderBottom: '4px solid #ff4d8d', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: '18px', margin: 0, color: '#ff4d8d' }}>🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️</h1>
      </div>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        
        {/* HPゲージ */}
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '12px', borderRadius: '15px', marginBottom: '20px' }}>
          <div style={{ color: 'white', fontSize: '14px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
            <span>{selectedCat.name} の体力</span>
            <span>{isDead ? 'DEAD' : `${hp}%`}</span>
          </div>
          <div style={{ width: '100%', height: '15px', background: '#333', borderRadius: '10px', overflow: 'hidden', border: '1px solid #fff' }}>
            <div style={{ width: `${hp}%`, height: '100%', background: hp > 30 ? '#4caf50' : '#f44336', transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* キャラクター表示（背景透過処理） */}
        <div style={{ marginTop: '20px', position: 'relative', display: 'inline-block' }}>
          {isDead ? (
            <div style={{ fontSize: '100px', filter: 'grayscale(100%)' }}>🪦<br/><span style={{ fontSize: '20px', color: 'white', textShadow: '2px 2px 0 #000' }}>放置しすぎてお墓になったにゃ…</span></div>
          ) : (
            <div style={{ 
              width: '200px', height: '200px', // 正方形で固定
              backgroundImage: 'url("/cats-lineup.png")', 
              backgroundSize: '500% 200%', 
              backgroundPosition: selectedCat.pos,
              backgroundRepeat: 'no-repeat',
              // 白背景を透過させるための簡易マスク
              WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 75%)',
              maskImage: 'radial-gradient(circle, black 60%, transparent 75%)',
              filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))'
            }} />
          )}
        </div>

        {/* 保存された記録リスト */}
        <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '20px', padding: '15px', marginTop: '20px', textAlign: 'left' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #ddd', marginBottom: '10px' }}>📊 トレーニング履歴</div>
          <div style={{ maxHeight: '150px', overflowY: 'auto', fontSize: '12px' }}>
            {logs.length === 0 ? <p style={{ textAlign: 'center', color: '#999' }}>まだ記録がありません</p> : 
              <table style={{ width: '100%' }}>
                <tbody>
                  {logs.map((l, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '5px' }}>{l.date}</td>
                      <td>{l.min}:{l.sec}</td><td>💪{l.dumb}回</td><td>✊{l.grip}kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>

      {/* 入力パネル（下部固定） */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', padding: '15px', borderTop: '5px solid #ff4d8d', borderRadius: '30px 30px 0 0', zIndex: 200 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
          <div>
            <label style={{ fontSize: '10px', color: '#ff4d8d', fontWeight: 'bold' }}>⏱ タイム</label>
            <div style={{ display: 'flex', gap: '2px' }}>
              <input type="number" value={inMin} onChange={e => setInMin(e.target.value)} placeholder="分" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
              <input type="number" value={inSec} onChange={e => setInSec(e.target.value)} placeholder="秒" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '10px', color: '#4caf50', fontWeight: 'bold' }}>💪 ダンベル</label>
            <input type="number" value={inDumb} onChange={e => setInDumb(e.target.value)} placeholder="回" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
          <div>
            <label style={{ fontSize: '10px', color: '#2196f3', fontWeight: 'bold' }}>✊ 握力</label>
            <input type="number" value={inGrip} onChange={e => setInGrip(e.target.value)} placeholder="kg" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          </div>
        </div>
        <button onClick={handleSave} style={{ width: '100%', padding: '16px', background: '#ff4d8d', color: 'white', border: 'none', borderRadius: '40px', fontWeight: 'bold', fontSize: '18px' }}>
          きろくして回復！
        </button>
      </div>
    </main>
  );
}
