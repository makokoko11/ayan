'use client';

import React, { useState } from 'react';

// かわいい丸文字フォント
const fontLink = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700;900&display=swap";

export default function AayanGamePage() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  
  // 入力用ステート
  const [inGrip, setInGrip] = useState("");
  const [inDumb, setInDumb] = useState("");
  const [inMin, setInMin] = useState("");
  const [inSec, setInSec] = useState("");

  // 過去10日分のデータ（表示専用）
  const [logs] = useState(
    Array.from({ length: 10 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return {
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        grip: (20 + Math.random() * 5).toFixed(1),
        dumbbell: Math.floor(Math.random() * 20) + 10
      };
    })
  );

  // 自己ベスト（10個）
  const [bestTimes] = useState([
    "3:08", "3:11", "3:15", "3:18", "3:20", "3:22", "3:25", "3:28", "3:30", "3:32"
  ]);

  // 集計
  const totalDumbbell = logs.reduce((sum, l) => sum + Number(l.dumbbell), 0) + (Number(inDumb) || 0);
  const maxGrip = Math.max(...logs.map(l => Number(l.grip)), Number(inGrip) || 0);

  if (!selectedCat) {
    return (
      <div style={{
        width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff9ebb',
        fontFamily: '"Zen Maru Gothic", sans-serif', color: 'white', padding: '20px', textAlign: 'center'
      }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ fontSize: '28px', marginBottom: '20px', textShadow: '2px 2px 0 #d46' }}>あーやん！<br/>どの子と練習する？</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          {['🐱', '🐈‍⬛', '🐈', '🐾', '🐯', '🦁'].map(c => (
            <div key={c} onClick={() => setSelectedCat(c)} 
              style={{ fontSize: '50px', background: 'white', borderRadius: '25px', padding: '15px', cursor: 'pointer', boxShadow: '0 8px 0 #e67eac' }}>
              {c}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main style={{
      width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto',
      fontFamily: '"Zen Maru Gothic", sans-serif', color: '#333',
      background: '#87CEEB', position: 'relative', paddingBottom: '220px'
    }}>
      <link href={fontLink} rel="stylesheet" />

      {/* --- こだわりのごちゃかわ競技場背景 --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden', background: 'linear-gradient(#87CEEB, #E0F7FA)' }}>
        {/* 動く雲 */}
        <div className="anime-cloud" style={{ top: '5%', left: '10%' }}>☁️</div>
        <div className="anime-cloud2" style={{ top: '15%', right: '10%' }}>☁️</div>
        
        {/* 遠くのスタジアム照明 */}
        <div style={{ position: 'absolute', bottom: '40%', left: '5%', width: '10px', height: '100px', background: '#999' }} />
        <div style={{ position: 'absolute', bottom: '53%', left: '2%', width: '30px', height: '20px', background: '#fff', borderRadius: '5px', boxShadow: '0 0 10px #fff' }} />
        
        {/* 観客席風のデコレーション */}
        <div style={{ position: 'absolute', bottom: '35%', width: '100%', height: '60px', background: '#5c6bc0', opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: '36%', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          {['🚩', '🎊', '✨', '🎈', '🚩'].map((e, i) => <span key={i} className="sway">{e}</span>)}
        </div>

        {/* リアルな陸上トラック（遠近感） */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-10%', width: '120%', height: '45%',
          background: '#d35400', borderTop: '8px solid #fff', transform: 'perspective(100px) rotateX(20deg)',
          boxShadow: 'inset 0 20px 50px rgba(0,0,0,0.3)'
        }}>
          {/* レーンの白線 */}
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.6)', marginTop: '45px' }} />
          ))}
        </div>
      </div>

      {/* --- メインコンテンツ --- */}
      <div style={{ position: 'relative', zIndex: 1, padding: '15px' }}>
        {/* タイトルと目標 */}
        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.8)', borderRadius: '20px', padding: '10px', border: '3px solid #ff4d8d' }}>
          <h1 style={{ fontSize: '18px', margin: 0, color: '#ff4d8d' }}>🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️</h1>
          <div style={{ fontSize: '14px', fontWeight: '900', color: '#333', marginTop: '5px' }}>
            🔥 目指せ800m 3分10秒以内！！！
          </div>
        </div>

        {/* レベルと体力ゲージ */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '65px', fontWeight: '900', color: '#ffcc00', textShadow: '3px 3px 0 #333, -1px -1px 0 #333' }}>Lv. 15</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '-10px' }}>
            <span style={{ fontWeight: '900', color: '#ff4d4d', fontSize: '20px' }}>HP</span>
            <div style={{ width: '220px', height: '24px', background: '#444', borderRadius: '12px', border: '3px solid #fff', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
              <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #ff4d4d, #ff8080)', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)' }} />
            </div>
          </div>
        </div>

        {/* キャラクター */}
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <div style={{ fontSize: '120px', filter: 'drop-shadow(0 10px 5px rgba(0,0,0,0.2))' }} className="jump">{selectedCat}</div>
        </div>

        {/* ステータスサマリー */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '15px', border: '3px solid #ff4d8d', flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#888' }}>握力最高</div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#ff4d8d' }}>{maxGrip}kg</div>
          </div>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '15px', border: '3px solid #4caf50', flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#888' }}>ダンベル合計</div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: '#4caf50' }}>{totalDumbbell}回</div>
          </div>
        </div>

        {/* 過去10日間の記録リスト */}
        <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '20px', padding: '15px', border: '2px solid #ddd', marginBottom: '15px' }}>
          <div style={{ textAlign: 'center', fontWeight: '900', marginBottom: '10px', fontSize: '15px' }}>🗓️ 10日間のきろく（見るだけ）</div>
          <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
            <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#eee', position: 'sticky', top: 0 }}>
                <tr><th style={{ padding: '5px' }}>日付</th><th>握力</th><th>ダンベル</th></tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 0' }}>{log.date}</td>
                    <td style={{ fontWeight: 'bold', color: '#ff4d8d' }}>{log.grip}kg</td>
                    <td style={{ fontWeight: 'bold', color: '#4caf50' }}>{log.dumbbell}回</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 自己ベストリスト */}
        <div style={{ background: '#333', color: '#fff', borderRadius: '20px', padding: '15px', border: '2px solid #ffcc00' }}>
          <div style={{ textAlign: 'center', color: '#ffcc00', fontWeight: '900', marginBottom: '8px' }}>🏆 自己ベスト</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
            {bestTimes.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0 5px', borderBottom: '1px solid #555' }}>
                <span style={{ color: '#aaa' }}>{i + 1}位</span><span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 下部固定：入力パネル --- */}
      <div style={{
        position: 'fixed', bottom: 0, width: '100%', background: 'rgba(255,255,255,0.95)',
        padding: '15px', borderTop: '6px solid #ff4d8d', zIndex: 100,
        boxShadow: '0 -10px 20px rgba(0,0,0,0.1)', borderRadius: '25px 25px 0 0'
      }}>
        <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: '900', marginBottom: '10px' }}>🏃‍♀️ 今日のトレーニングを入力！ 🏃‍♀️</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          {/* タイム入力 */}
          <div style={{ background: '#fff0f5', padding: '8px', borderRadius: '12px', display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '900' }}>タイム</span>
            <input type="number" value={inMin} onChange={e => setInMin(e.target.value)} style={{ width: '40px', textAlign: 'center', borderRadius: '5px', border: '1px solid #ff4d8d' }} placeholder="分" />
            <input type="number" value={inSec} onChange={e => setInSec(e.target.value)} style={{ width: '40px', textAlign: 'center', borderRadius: '5px', border: '1px solid #ff4d8d' }} placeholder="秒" />
          </div>
          {/* 筋トレ入力 */}
          <div style={{ background: '#f0fff0', padding: '8px', borderRadius: '12px', display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
            <input type="number" value={inGrip} onChange={e => setInGrip(e.target.value)} style={{ width: '45px', textAlign: 'center', borderRadius: '5px', border: '1px solid #4caf50' }} placeholder="握力" />
            <input type="number" value={inDumb} onChange={e => setInDumb(e.target.value)} style={{ width: '45px', textAlign: 'center', borderRadius: '5px', border: '1px solid #4caf50' }} placeholder="回数" />
          </div>
        </div>
        <button style={{
          width: '100%', padding: '15px', background: 'linear-gradient(#ff4d8d, #ff1a75)', color: '#fff',
          border: 'none', borderRadius: '30px', fontWeight: '900', fontSize: '20px', boxShadow: '0 6px 0 #b30047'
        }} onClick={() => alert("記録完了にゃ！あーやん、最高だにゃ！")}>
          きろくする！
        </button>
      </div>

      <style>{`
        @keyframes cloudFlow { from { transform: translateX(-100px); } to { transform: translateX(400px); } }
        @keyframes sway { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .anime-cloud { position: absolute; font-size: 50px; animation: cloudFlow 30s linear infinite; opacity: 0.7; }
        .anime-cloud2 { position: absolute; font-size: 40px; animation: cloudFlow 45s linear reverse infinite; opacity: 0.5; }
        .sway { display: inline-block; animation: sway 2s ease-in-out infinite; font-size: 20px; }
        .jump { display: inline-block; animation: jump 2s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
