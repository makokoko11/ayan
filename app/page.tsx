'use client';

import React, { useState } from 'react';

// Google Fontsから「Zen Maru Gothic」を読み込む設定（かわいい丸文字）
const fontLink = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700;900&display=swap";

export default function AayanGamePage() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  
  // 入力用ステート
  const [inputGrip, setInputGrip] = useState("");
  const [inputDumbbell, setInputDumbbell] = useState("");
  const [inputMin, setInputMin] = useState("");
  const [inputSec, setInputSec] = useState("");

  // 過去の記録（ダミーデータ）
  const [logs] = useState([
    { date: "5/6", grip: 22.5, dumbbell: 30 },
    { date: "5/5", grip: 21.0, dumbbell: 25 },
    { date: "5/4", grip: 23.1, dumbbell: 20 },
    { date: "5/3", grip: 20.5, dumbbell: 15 },
    { date: "5/2", grip: 22.0, dumbbell: 35 },
    { date: "5/1", grip: 19.8, dumbbell: 10 },
    { date: "4/30", grip: 21.5, dumbbell: 20 },
    { date: "4/29", grip: 22.8, dumbbell: 25 },
    { date: "4/28", grip: 20.0, dumbbell: 30 },
    { date: "4/27", grip: 18.5, dumbbell: 15 },
  ]);

  const [bestTimes] = useState([
    "3:11", "3:15", "3:18", "3:20", "3:22", "3:25", "3:28", "3:30", "3:32", "3:35"
  ]);

  // 計算処理
  const totalDumbbell = logs.reduce((sum, log) => sum + (Number(log.dumbbell) || 0), 0) + (Number(inputDumbbell) || 0);
  const maxGrip = Math.max(...logs.map(l => l.grip), Number(inputGrip) || 0);

  const cats = [
    { id: '1', emoji: '🐱' }, { id: '2', emoji: '🐈‍⬛' }, { id: '3', emoji: '🐈' },
    { id: '4', emoji: '🐾' }, { id: '5', emoji: '🐯' }
  ];

  if (!selectedCat) {
    return (
      <div style={{
        width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff9ebb',
        fontFamily: '"Zen Maru Gothic", sans-serif', color: 'white', textAlign: 'center', padding: '20px'
      }}>
        <link href={fontLink} rel="stylesheet" />
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>あーやん、どの子と走る？</h1>
        <p style={{ fontSize: '14px', marginBottom: '30px' }}>目指せ800m 3分10秒以内！！！</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          {cats.map(c => (
            <div key={c.id} onClick={() => setSelectedCat(c.emoji)} 
              style={{ fontSize: '50px', background: 'white', borderRadius: '20px', padding: '10px', cursor: 'pointer' }}>
              {c.emoji}
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
      background: 'linear-gradient(to bottom, #87CEEB, #f0f0f0)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '200px'
    }}>
      <link href={fontLink} rel="stylesheet" />

      {/* ヘッダー */}
      <div style={{ width: '100%', textAlign: 'center', padding: '20px 10px', background: 'rgba(255,255,255,0.5)' }}>
        <h1 style={{ fontSize: '20px', margin: 0, color: '#ff4d8d' }}>🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️</h1>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '5px' }}>目指せ800m 3分10秒以内！！！</div>
      </div>

      {/* ステータス */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', fontWeight: '900', color: '#ffcc00', textShadow: '2px 2px 0 #333' }}>Lv. 15</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontWeight: 'bold', color: '#ff4d4d' }}>体力</span>
          <div style={{ width: '200px', height: '20px', background: '#ccc', borderRadius: '10px', border: '2px solid #fff', position: 'relative' }}>
            <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #ff4d4d, #ff8080)', borderRadius: '8px' }} />
          </div>
        </div>
      </div>

      {/* キャラクター */}
      <div style={{ fontSize: '120px', margin: '20px 0' }}>{selectedCat}</div>

      {/* 過去の最高記録と合計 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', padding: '10px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 0 #ddd' }}>
          <div style={{ fontSize: '10px', color: '#888' }}>握力最高</div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#ff4d8d' }}>{maxGrip}kg</div>
        </div>
        <div style={{ background: '#fff', padding: '10px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 0 #ddd' }}>
          <div style={{ fontSize: '10px', color: '#888' }}>ダンベル合計</div>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#4caf50' }}>{totalDumbbell}回</div>
        </div>
      </div>

      {/* 記録（見るだけ） */}
      <div style={{ width: '90%', background: 'rgba(255,255,255,0.8)', borderRadius: '20px', padding: '15px', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>🗓️ トレーニングのきろく</div>
        <div style={{ maxHeight: '150px', overflowY: 'auto', fontSize: '13px' }}>
          <table style={{ width: '100%' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#eee' }}>
              <tr><th>日付</th><th>握力</th><th>ダンベル</th></tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td>{log.date}</td><td>{log.grip}kg</td><td>{log.dumbbell}回</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 自己ベスト */}
      <div style={{ width: '90%', background: '#333', color: '#fff', borderRadius: '20px', padding: '15px' }}>
        <div style={{ textAlign: 'center', color: '#ffcc00', marginBottom: '10px' }}>🏆 自己ベスト</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '12px' }}>
          {bestTimes.map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
              <span>{i + 1}位</span><span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 入力エリア（スマホ固定） */}
      <div style={{
        position: 'fixed', bottom: 0, width: '100%', background: '#fff',
        padding: '15px', borderTop: '5px solid #ff4d8d', zIndex: 100,
        boxShadow: '0 -5px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* タイム入力 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>タイム:</span>
            <input type="number" value={inputMin} onChange={(e) => setInputMin(e.target.value)} style={{ width: '45px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '5px' }} placeholder="分" />
            <input type="number" value={inputSec} onChange={(e) => setInputSec(e.target.value)} style={{ width: '45px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '5px' }} placeholder="秒" />
          </div>
          {/* 筋トレ入力 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>握力:</span>
              <input type="number" value={inputGrip} onChange={(e) => setInputGrip(e.target.value)} style={{ width: '50px', border: '1px solid #ddd', borderRadius: '5px' }} />
              <span style={{ fontSize: '10px' }}>kg</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>ダンベル:</span>
              <input type="number" value={inputDumbbell} onChange={(e) => setInputDumbbell(e.target.value)} style={{ width: '50px', border: '1px solid #ddd', borderRadius: '5px' }} />
              <span style={{ fontSize: '10px' }}>回</span>
            </div>
          </div>
          <button style={{
            width: '100%', padding: '12px', background: '#ff4d8d', color: '#fff',
            border: 'none', borderRadius: '25px', fontWeight: '900', fontSize: '18px'
          }} onClick={() => alert("記録しました！あーやん、ナイスラン！")}>
            きろくする！
          </button>
        </div>
      </div>
    </main>
  );
}
