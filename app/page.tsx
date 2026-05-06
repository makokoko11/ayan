'use client';

import React, { useState } from 'react';

const fontLink = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700;900&display=swap";

export default function AayanGamePage() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  
  // 入力用
  const [inputGrip, setInputGrip] = useState("");
  const [inputDumbbell, setInputDumbbell] = useState("");

  const logs = [
    { date: "5/6", grip: 22.5, dumbbell: 30 },
    { date: "5/5", grip: 21.0, dumbbell: 25 },
    { date: "5/4", grip: 23.1, dumbbell: 20 },
  ];

  const totalDumbbell = logs.reduce((sum, log) => sum + log.dumbbell, 0) + (Number(inputDumbbell) || 0);
  const maxGrip = Math.max(...logs.map(l => l.grip), Number(inputGrip) || 0);

  if (!selectedCat) {
    return (
      <div onClick={() => setSelectedCat('🐱')} style={{
        width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#87CEEB', fontFamily: '"Zen Maru Gothic", sans-serif', color: 'white'
      }}>
        <link href={fontLink} rel="stylesheet" />
        <h1>タップしてスタート！</h1>
      </div>
    );
  }

  return (
    <main style={{
      width: '100vw', height: '100vh', overflowX: 'hidden', position: 'relative',
      fontFamily: '"Zen Maru Gothic", sans-serif', color: '#333'
    }}>
      <link href={fontLink} rel="stylesheet" />

      {/* --- アニメ風 動く背景セット --- */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', zIndex: -1
      }}>
        {/* 流れる雲 */}
        <div className="cloud" style={{ top: '10%', left: '-20%' }}>☁️</div>
        <div className="cloud" style={{ top: '25%', left: '-50%', opacity: 0.6 }}>☁️</div>
        
        {/* 遠くの山 */}
        <div style={{
          position: 'absolute', bottom: '30%', width: '120%', height: '200px',
          background: '#81c784', borderRadius: '50% 50% 0 0', left: '-10%', filter: 'blur(2px)'
        }} />

        {/* 陸上トラック */}
        <div style={{
          position: 'absolute', bottom: 0, width: '100%', height: '40%',
          background: '#e57373', borderTop: '10px solid white'
        }}>
          {/* 白いライン */}
          <div style={{ width: '100%', height: '2px', background: 'white', marginTop: '40px' }} />
          <div style={{ width: '100%', height: '2px', background: 'white', marginTop: '40px' }} />
        </div>

        {/* 風になびく草（アニメーション） */}
        <div className="grass-container">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="grass" style={{ left: `${i * 12}%`, bottom: '35%' }}>🌿</div>
          ))}
        </div>
      </div>

      {/* --- アニメーションCSS --- */}
      <style>{`
        @keyframes flow {
          from { transform: translateX(0); }
          to { transform: translateX(120vw); }
        }
        @keyframes sway {
          0% { transform: rotate(-5deg); }
          50% { transform: rotate(10deg); }
          100% { transform: rotate(-5deg); }
        }
        .cloud {
          position: absolute; font-size: 80px;
          animation: flow 25s linear infinite;
        }
        .grass {
          position: absolute; font-size: 30px;
          animation: sway 3s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>

      {/* --- UIコンテンツ（スマホ縦用） --- */}
      <div style={{ padding: '20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '20px', color: '#fff', textShadow: '2px 2px 4px #000' }}>あーやん 爆速ランナーへの道</h1>
        <p style={{ color: '#fff', fontSize: '14px' }}>目指せ800m 3分10秒以内！！！</p>

        <div style={{ fontSize: '60px', color: '#ffcc00', margin: '10px 0', textShadow: '2px 2px 0 #000' }}>Lv. 15</div>
        
        {/* キャラクター */}
        <div style={{ fontSize: '100px', margin: '10px 0' }}>{selectedCat}</div>

        {/* 過去最高と合計 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '15px', minWidth: '100px' }}>
            <div style={{ fontSize: '10px' }}>握力最高</div>
            <div style={{ fontSize: '18px', color: '#ff4d8d' }}>{maxGrip}kg</div>
          </div>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '15px', minWidth: '100px' }}>
            <div style={{ fontSize: '10px' }}>ダンベル合計</div>
            <div style={{ fontSize: '18px', color: '#4caf50' }}>{totalDumbbell}回</div>
          </div>
        </div>

        {/* きろく（見るだけ） */}
        <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '20px', padding: '15px', fontSize: '13px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🗓️ トレーニングのきろく</div>
          {logs.map((log, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-around', borderBottom: '1px solid #ddd' }}>
              <span>{log.date}</span><span>{log.grip}kg</span><span>{log.dumbbell}回</span>
            </div>
          ))}
        </div>
      </div>

      {/* 入力パネル（固定） */}
      <div style={{
        position: 'fixed', bottom: 0, width: '100%', background: '#fff', padding: '15px',
        borderTop: '5px solid #ff4d8d', zIndex: 100
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <input type="number" placeholder="分" style={{ width: '50px', border: '1px solid #ddd' }} />
            <input type="number" placeholder="秒" style={{ width: '50px', border: '1px solid #ddd' }} />
            <input type="number" value={inputGrip} onChange={e => setInputGrip(e.target.value)} placeholder="握力" style={{ width: '50px', border: '1px solid #ddd' }} />
            <input type="number" value={inputDumbbell} onChange={e => setInputDumbbell(e.target.value)} placeholder="回数" style={{ width: '50px', border: '1px solid #ddd' }} />
          </div>
          <button style={{
            background: '#ff4d8d', color: '#fff', border: 'none', padding: '12px', borderRadius: '20px', fontWeight: 'bold'
          }}>きろくする！</button>
        </div>
      </div>
    </main>
  );
}
