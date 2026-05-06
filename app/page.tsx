'use client';

import React, { useState, useEffect, useRef } from 'react';

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

export default function AayanFinalApp() {
  const [selectedCat, setSelectedCat] = useState<typeof CATS[0] | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [hp, setHp] = useState(5); // 初期HPは5
  const [isMuted, setIsMuted] = useState(true);
  const [isPowerUp, setIsPowerUp] = useState(false); // 画像変化用
  
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const seRef = useRef<HTMLAudioElement | null>(null);

  const [inDumbell, setInDumbell] = useState("");
  const [inGrip, setInGrip] = useState("");
  const [inRunMin, setInRunMin] = useState("");
  const [inRunSec, setInRunSec] = useState("");

  // --- データの読み込み ---
  useEffect(() => {
    const savedCatId = localStorage.getItem('aayan_cat_id');
    const savedLogs = localStorage.getItem('aayan_logs');
    const savedHp = localStorage.getItem('aayan_hp');
    const lastDate = localStorage.getItem('aayan_last_date');

    if (savedCatId) {
      setSelectedCat(CATS.find(c => c.id === Number(savedCatId)) || null);
    }
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    
    // HPの計算（1日10減少）
    if (savedHp && lastDate) {
      const hoursPassed = (new Date().getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60);
      const daysPassed = hoursPassed / 24;
      const reduction = Math.floor(daysPassed * 10); 
      const currentHp = Math.max(0, Number(savedHp) - reduction);
      setHp(currentHp);
    } else if (savedHp) {
      setHp(Number(savedHp));
    }
  }, []);

  // --- 音声制御 ---
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.loop = true;
      if (!isMuted && selectedCat) bgmRef.current.play().catch(() => {});
      else bgmRef.current.pause();
    }
  }, [isMuted, selectedCat]);

  const handleSelectCat = (cat: typeof CATS[0]) => {
    setSelectedCat(cat);
    setHp(5); // 最初はHP5から
    setIsMuted(false);
    localStorage.setItem('aayan_cat_id', String(cat.id));
    localStorage.setItem('aayan_hp', "5");
    localStorage.setItem('aayan_last_date', new Date().toISOString());
  };

  const handleSave = () => {
    if (!inDumbell && !inGrip && (!inRunMin || !inRunSec)) return;

    // 画像変化演出
    setIsPowerUp(true);
    setTimeout(() => setIsPowerUp(false), 1000);

    const newHp = Math.min(100, hp + 10); // 入力でHP+10
    setHp(newHp);

    const newEntry = {
      date: new Date().toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      dumbell: inDumbell || "---",
      grip: inGrip || "---",
      run: (inRunMin && inRunSec) ? `${inRunMin}分${inRunSec}秒` : "---"
    };

    const updatedLogs = [newEntry, ...logs];
    setLogs(updatedLogs);

    // スマホに保存
    localStorage.setItem('aayan_logs', JSON.stringify(updatedLogs));
    localStorage.setItem('aayan_hp', String(newHp));
    localStorage.setItem('aayan_last_date', new Date().toISOString());

    if (seRef.current) {
      seRef.current.currentTime = 0;
      seRef.current.play().catch(() => {});
    }

    setInDumbell(""); setInGrip(""); setInRunMin(""); setInRunSec("");
  };

  if (!selectedCat) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#ff9ebb', fontFamily: '"Zen Maru Gothic", sans-serif', padding: '20px', textAlign: 'center' }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ color: 'white', textShadow: '2px 2px 0 #d46' }}>育てたい猫を選んでね！</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '20px' }}>
          {CATS.map(cat => (
            <div key={cat.id} onClick={() => handleSelectCat(cat)} style={{ background: 'white', borderRadius: '15px', padding: '10px' }}>
              <div style={{ width: '100px', height: '100px', margin: '0 auto', backgroundImage: 'url("/cats-lineup.png")', backgroundSize: '500% 200%', backgroundPosition: cat.pos }} />
              <div style={{ fontWeight: 'bold', marginTop: '5px' }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main style={{ width: '100vw', height: '100vh', fontFamily: '"Zen Maru Gothic", sans-serif', backgroundImage: 'url("/bg-track.png")', backgroundSize: 'cover', backgroundPosition: 'center', paddingBottom: '300px' }}>
      <link href={fontLink} rel="stylesheet" />
      <audio ref={bgmRef} src="/bgm.mp3" />
      <audio ref={seRef} src="/se.mp3" />

      <div style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.85)', borderBottom: '4px solid #ff4d8d', textAlign: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '16px', margin: 0, color: '#ff4d8d' }}>🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️</h1>
          <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: 'none', fontSize: '20px' }}>{isMuted ? '🔇' : '🔊'}</button>
        </div>
        <div style={{ fontSize: '11px', color: '#444', fontWeight: 'bold' }}>目指せ 800m 3分10秒台 / ジャベリック 20m</div>
      </div>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '15px', color: 'white', fontSize: '12px', marginBottom: '10px' }}>
          {selectedCat.name} HP {hp}%
          <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${hp}%`, height: '100%', background: hp > 20 ? '#4caf50' : '#f44336', transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* 猫の表示エリア：入力時に変化 */}
        <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {isPowerUp && <div style={{ position: 'absolute', fontSize: '120px', zIndex: 5 }}>✨</div>}
          <div style={{ 
            width: '160px', height: '160px', 
            backgroundImage: 'url("/cats-lineup.png")', 
            backgroundSize: '500% 200%', 
            backgroundPosition: selectedCat.pos,
            transform: isPowerUp ? 'scale(1.3) rotate(5deg)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }} />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '15px', padding: '10px', maxHeight: '100px', overflowY: 'auto' }}>
          <table style={{ width: '100%', fontSize: '10px' }}>
            <thead><tr style={{ borderBottom: '1px solid #eee' }}><th>日時</th><th>💪</th><th>✊</th><th>🏃‍♀️</th></tr></thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}><td>{l.date}</td><td>{l.dumbell}</td><td>{l.grip}</td><td>{l.run}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 入力パネル */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', padding: '15px', borderTop: '5px solid #ff4d8d', borderRadius: '25px 25px 0 0', boxShadow: '0 -5px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#e8f5e9', padding: '5px', borderRadius: '10px' }}>
            <span style={{ width: '30px' }}>💪</span>
            <input type="number" value={inDumbell} onChange={e => setInDumbell(e.target.value)} placeholder="ダンベル回数" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#e3f2fd', padding: '5px', borderRadius: '10px' }}>
            <span style={{ width: '30px' }}>✊</span>
            <input type="number" value={inGrip} onChange={e => setInGrip(e.target.value)} placeholder="握力(kg)" style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#fce4ec', padding: '5px', borderRadius: '10px' }}>
            <span style={{ width: '30px' }}>🏃‍♀️</span>
            <div style={{ display: 'flex', gap: '5px', flex: 1 }}>
              <input type="number" value={inRunMin} onChange={e => setInRunMin(e.target.value)} placeholder="分" style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <input type="number" value={inRunSec} onChange={e => setInRunSec(e.target.value)} placeholder="秒" style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
            </div>
          </div>
        </div>
        <button onClick={handleSave} style={{ width: '100%', padding: '15px', background: 'linear-gradient(#ff4d8d, #ff1a75)', color: 'white', borderRadius: '30px', fontWeight: 'bold', border: 'none' }}>特訓をきろくして回復！</button>
      </div>
    </main>
  );
}
