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

export default function AayanLegacyApp() {
  const [selectedCat, setSelectedCat] = useState<typeof CATS[0] | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [hp, setHp] = useState(100);
  const [isDead, setIsDead] = useState(false);
  
  const [inMin, setInMin] = useState("");
  const [inSec, setInSec] = useState("");
  const [inDumb, setInDumb] = useState("");
  const [inGrip, setInGrip] = useState("");

  useEffect(() => {
    // 保存された猫を読み込む
    const savedCatId = localStorage.getItem('aayan_selected_cat_id');
    if (savedCatId) {
      const cat = CATS.find(c => c.id === Number(savedCatId));
      if (cat) setSelectedCat(cat);
    }

    const savedLogs = localStorage.getItem('aayan_logs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));

    const lastTime = localStorage.getItem('aayan_last_date');
    if (lastTime) {
      const diff = (new Date().getTime() - new Date(lastTime).getTime()) / (1000 * 60 * 60);
      const newHp = Math.max(0, 100 - Math.floor(diff * 4.16)); 
      setHp(newHp);
      if (diff >= 24) setIsDead(true);
    }
  }, []);

  const handleSelectCat = (cat: typeof CATS[0]) => {
    setSelectedCat(cat);
    localStorage.setItem('aayan_selected_cat_id', String(cat.id));
    localStorage.setItem('aayan_last_date', new Date().toISOString());
    setHp(100);
    setIsDead(false);
  };

  const handleSave = () => {
    const newEntry = {
      date: new Date().toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      time: `${inMin}:${inSec}`, dumb: inDumb, grip: inGrip
    };
    const updatedLogs = [newEntry, ...logs];
    setLogs(updatedLogs);
    setHp(100);
    localStorage.setItem('aayan_logs', JSON.stringify(updatedLogs));
    localStorage.setItem('aayan_last_date', new Date().toISOString());
    setInMin(""); setInSec(""); setInDumb(""); setInGrip("");
  };

  // 猫の選択画面（最初だけ）
  if (!selectedCat || (isDead && logs.length === 0)) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#ff9ebb', fontFamily: '"Zen Maru Gothic", sans-serif', padding: '20px', textAlign: 'center', overflowY: 'auto' }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ color: 'white', textShadow: '2px 2px 0 #d46' }}>運命のパートナーを選んで</h1>
        <p style={{ color: 'white', fontSize: '12px' }}>一度選んだら、お墓になるまで一緒だよ。</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '20px' }}>
          {CATS.map(cat => (
            <div key={cat.id} onClick={() => handleSelectCat(cat)} style={{ background: 'white', borderRadius: '15px', padding: '10px', cursor: 'pointer' }}>
              <div style={{ width: '100px', height: '100px', margin: '0 auto', backgroundImage: 'url("/cats-lineup.png")', backgroundSize: '500% 200%', backgroundPosition: cat.pos }} />
              <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main style={{ width: '100vw', height: '100vh', fontFamily: '"Zen Maru Gothic", sans-serif', backgroundImage: 'url("/bg-track.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <link href={fontLink} rel="stylesheet" />

      {/* タイトルとサブタイトル */}
      <div style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.85)', borderBottom: '4px solid #ff4d8d', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: '16px', margin: 0, color: '#ff4d8d' }}>🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️</h1>
        <div style={{ fontSize: '12px', color: '#444', fontWeight: 'bold', marginTop: '2px' }}>
          目指せ800m 3分10秒台 / ジャベリック 20m!
        </div>
      </div>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* HPゲージ */}
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '15px', marginBottom: '15px' }}>
          <div style={{ color: 'white', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span>{selectedCat.name}</span><span>{isDead ? 'DEAD' : `HP ${hp}%`}</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: '#333', borderRadius: '6px', border: '1px solid #fff', marginTop: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${hp}%`, height: '100%', background: hp > 30 ? '#4caf50' : '#f44336', transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* キャラ表示（透過済み画像を想定） */}
        <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isDead ? (
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '100px' }}>🪦</span>
              <button onClick={() => { localStorage.clear(); location.reload(); }} style={{ display: 'block', background: 'white', border: 'none', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>新しい猫とやり直す</button>
            </div>
          ) : (
            <div style={{ 
              width: '200px', height: '200px',
              backgroundImage: 'url("/cats-lineup.png")', 
              backgroundSize: '500% 200%', backgroundPosition: selectedCat.pos,
              backgroundRepeat: 'no-repeat',
              // 背景透過画像を使う場合は以下のように設定
              // backgroundImage: 'url("/selected-cat-transparent.png")', backgroundSize: 'contain'
            }} />
          )}
        </div>

        {/* 履歴表示 */}
        <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '20px', padding: '12px', marginTop: '10px', maxHeight: '140px', overflowY: 'auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', borderBottom: '1px solid #eee', marginBottom: '5px' }}>📊 トレーニング履歴</div>
          {logs.length === 0 ? <p style={{ fontSize: '11px', color: '#999' }}>まだ記録がないにゃ</p> : 
            <table style={{ width: '100%', fontSize: '11px' }}>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td>{l.date}</td><td>{l.time}</td><td>💪{l.dumb}回</td><td>✊{l.grip}kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>

      {/* 入力パネル */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', padding: '15px', borderTop: '5px solid #ff4d8d', borderRadius: '25px 25px 0 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginBottom: '10px' }}>
          <input type="number" value={inMin} onChange={e => setInMin(e.target.value)} placeholder="分" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="number" value={inSec} onChange={e => setInSec(e.target.value)} placeholder="秒" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="number" value={inDumb} onChange={e => setInDumb(e.target.value)} placeholder="ダンベル" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="number" value={inGrip} onChange={e => setInGrip(e.target.value)} placeholder="握力" style={{ width: '100%', gridColumn: 'span 3', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
        </div>
        <button onClick={handleSave} style={{ width: '100%', padding: '15px', background: '#ff4d8d', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold' }}>きろくして回復！</button>
      </div>
    </main>
  );
}
