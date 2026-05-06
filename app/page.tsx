'use client';

import React, { useState, useEffect } from 'react';

// --- あーやん専用 爆速ランナー育成アプリ 完全版 ---

export default function AayanGamePage() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgText, setMsgText] = useState("");

  // ベストタイム 10個
  const [bestTimes] = useState([
    "2:41", "2:45", "2:50", "2:55", "3:00", "3:05", "3:10", "3:15", "3:20", "3:25"
  ]);

  // トレーニング日誌（今日から10日前まで）
  const [trainingLogs] = useState(
    Array.from({ length: 10 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return {
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        grip: "",
        dumbbell: ""
      };
    })
  );

  // 送っていただいた画像のネコたちをイメージしたリスト
  const cats = [
    { id: 'shiro', emoji: '🐱', name: 'しろまる' },
    { id: 'kuro', emoji: '🐈‍⬛', name: 'くろすけ' },
    { id: 'mike', emoji: '🐈', name: 'みけラン' },
    { id: 'hachi', emoji: '🐾', name: 'ハチワレくん' },
    { id: 'tora', emoji: '🐯', name: 'とらまる' },
    { id: 'fuwa', emoji: '☁️', name: 'ふわにゃん' },
    { id: 'shyamu', emoji: '🕶️', name: 'シャムラン' },
    { id: 'speed', emoji: '⚡', name: 'スピードにゃん' },
    { id: 'mochi', emoji: '🍡', name: 'もちにゃん' },
    { id: 'yozora', emoji: '🌌', name: '夜空にゃん' }
  ];

  // SE再生の仕組み（実際の音声ファイルを配置すれば鳴ります）
  const playSound = (type: 'btn' | 'jump') => {
    console.log(`${type} sound played`);
    // const audio = new Audio(`/sounds/${type}.mp3`);
    // audio.play().catch(() => {}); 
  };

  const handleRecord = () => {
    if (!selectedCat) return;
    playSound('jump');
    setMsgText(`家のまわり2周、ナイスラン！`);
    setShowMsg(true);
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 300);

    setClickCount(prev => prev + 1);
    if (clickCount >= 2) {
      setIsFlipped(true);
      setMsgText("3分10秒切りが見えてきたにゃ！✨");
      setTimeout(() => { setIsFlipped(false); setClickCount(0); }, 1500);
    }
    setTimeout(() => setShowMsg(false), 2000);
  };

  // キャラ選択画面
  if (!selectedCat) {
    return (
      <div style={{
        width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#3aa655',
        fontFamily: '"M PLUS Rounded 1c", sans-serif', color: 'white', padding: '20px'
      }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px', textShadow: '2px 2px 0px #000' }}>あーやん、誰と走る？</h1>
        <p style={{ marginBottom: '30px' }}>目指せ800m 3分10秒以内！！！</p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
          {cats.map(cat => (
            <div key={cat.id} onClick={() => { setSelectedCat(cat.emoji); setSelectedName(cat.name); }} 
              style={{ padding: '15px', background: 'rgba(255,255,255,0.9)', borderRadius: '15px', cursor: 'pointer', textAlign: 'center', width: '100px', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: '50px' }}>{cat.emoji}</div>
              <div style={{ color: '#333', fontSize: '12px', fontWeight: 'bold' }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main style={{
      width: '100vw', height: '100vh', margin: 0, overflow: 'hidden',
      fontFamily: '"M PLUS Rounded 1c", sans-serif', color: 'white',
      background: 'linear-gradient(to bottom, #87CEEB 0%, #4CAF50 100%)', // 空と芝生
      position: 'relative'
    }}>
      
      {/* 陸上競技場風トラック */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '50%', width: '180%', height: '120%',
        border: '60px solid #d35400', borderRadius: '50%', transform: 'translateX(-50%) rotateX(75deg)',
        boxShadow: '0 0 0 10px white, 0 0 0 20px #d35400, 0 20px 50px rgba(0,0,0,0.5)', zIndex: 1
      }} />

      {/* ヘッダー：タイトルと目標 */}
      <div style={{ position: 'absolute', top: '15px', width: '100%', textAlign: 'center', zIndex: 10 }}>
        <h1 style={{ fontSize: '22px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', margin: 0 }}>
          🏃‍♀️ あーやん 爆速ランナーへの道 🏃‍♀️
          <span style={{ fontSize: '18px', color: '#FFEB3B', marginLeft: '15px', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '10px' }}>
            目指せ800m 3分10秒以内！！！
          </span>
        </h1>
      </div>

      {/* 左側：筋トレ日誌（10日分） */}
      <div style={{
        position: 'absolute', left: '20px', top: '80px', width: '240px', maxHeight: '60%',
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(15px)', borderRadius: '24px',
        padding: '15px', overflowY: 'auto', zIndex: 10, border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px', textAlign: 'center', fontSize: '14px', color: '#FFF' }}>🗓️ 筋トレ日誌</div>
        <table style={{ width: '100%', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
              <th style={{ padding: '5px' }}>日付</th>
              <th>握力</th>
              <th>ダンベル</th>
            </tr>
          </thead>
          <tbody>
            {trainingLogs.map((log, i) => (
              <tr key={i}>
                <td style={{ padding: '6px 0', textAlign: 'center' }}>{log.date}</td>
                <td><input type="number" style={{ width: '45px', border: 'none', borderRadius: '6px', textAlign: 'center', padding: '2px' }} placeholder="kg" /></td>
                <td><input type="number" style={{ width: '45px', border: 'none', borderRadius: '6px', textAlign: 'center', padding: '2px' }} placeholder="回" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 右側：ベストタイム（10個） */}
      <div style={{
        position: 'absolute', right: '20px', top: '80px', width: '180px',
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', borderRadius: '24px', padding: '15px', zIndex: 10, border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFD700', marginBottom: '10px', textAlign: 'center', letterSpacing: '1px' }}>🏆 BEST TIMES</div>
        {bestTimes.map((time, i) => (
          <div key={i} style={{ fontSize: '14px', display: 'flex', justifyContent: 'space-between', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{i + 1}位</span>
            <span style={{ fontWeight: 'bold' }}>{time}</span>
          </div>
        ))}
      </div>

      {/* 中央上部：特大レベル & HPゲージ */}
      <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}>
        <div style={{ fontSize: '80px', fontWeight: '900', color: '#FFD700', textShadow: '0 0 20px rgba(255,215,0,0.5)', lineHeight: 1 }}>Lv. 15</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '5px' }}>
          <span style={{ fontWeight: 'bold', color: '#ff4d4d', fontSize: '18px' }}>HP</span>
          <div style={{
            width: '350px', height: '28px', background: 'rgba(0,0,0,0.5)', borderRadius: '14px',
            padding: '4px', border: '3px solid #FFF', position: 'relative', overflow: 'hidden', boxShadow: '0 0 15px rgba(255,77,77,0.3)'
          }}>
            <div style={{
              width: '85%', height: '100%', borderRadius: '10px',
              background: 'linear-gradient(90deg, #ff4d4d 0%, #ff8a80 100%)',
              boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)'
            }} />
          </div>
        </div>
      </div>

      {/* メインキャラクター */}
      <div style={{
        position: 'absolute', bottom: '32%', left: '50%', transform: `translateX(-50%) translateY(${isJumping ? '-100px' : '0'})`,
        transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)', zIndex: 5, textAlign: 'center'
      }}>
        <div style={{
          fontSize: '180px', filter: 'drop-shadow(0 20px 10px rgba(0,0,0,0.3))',
          transform: isFlipped ? 'rotate(180deg)' : 'none', transition: 'transform 0.5s'
        }}>{selectedCat}</div>
        <div style={{
          width: '140px', height: '25px', background: 'rgba(0,0,0,0.2)', borderRadius: '50%',
          filter: 'blur(8px)', margin: '-20px auto 0', transform: isJumping ? 'scale(0.6)' : 'scale(1)', transition: '0.25s'
        }} />
        
        {/* フキダシメッセージ */}
        <div style={{
          position: 'absolute', top: '-40px', left: '100%', whiteSpace: 'nowrap',
          opacity: showMsg ? 1 : 0, transform: `scale(${showMsg ? 1 : 0.8})`, transition: '0.3s',
          background: 'white', color: '#333', padding: '12px 24px', borderRadius: '25px',
          fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}>
          {msgText}
        </div>
      </div>

      {/* 下部パネル：タイム入力 */}
      <div style={{
        position: 'absolute', bottom: 0, width: '100%', background: 'rgba(255,255,255,0.95)',
        padding: '25px', borderTop: '8px solid #FF4D4D', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '15px', zIndex: 100, boxShadow: '0 -10px 30px rgba(0,0,0,0.1)'
      }}>
        <div style={{ color: '#666', fontWeight: 'bold', fontSize: '18px' }}>🏁 家のまわり2周 タイムアタック記録 🏁</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', padding: '10px 20px', borderRadius: '15px' }}>
            <input type="number" placeholder="0" style={{ width: '60px', fontSize: '32px', background: 'transparent', border: 'none', textAlign: 'center', fontWeight: 'bold', outline: 'none' }} />
            <span style={{ fontSize: '20px', marginLeft: '5px', color: '#333' }}>分</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', padding: '10px 20px', borderRadius: '15px' }}>
            <input type="number" placeholder="00" style={{ width: '80px', fontSize: '32px', background: 'transparent', border: 'none', textAlign: 'center', fontWeight: 'bold', outline: 'none' }} />
            <span style={{ fontSize: '20px', marginLeft: '5px', color: '#333' }}>秒</span>
          </div>
          <button onClick={handleRecord} style={{
            padding: '15px 40px', background: 'linear-gradient(135deg, #FF6B6B 0%, #FF4D4D 100%)',
            color: 'white', border: 'none', borderRadius: '40px', fontSize: '22px', fontWeight: 'bold',
            cursor: 'pointer', boxShadow: '0 6px 0 #c24d4d', transition: '0.1s'
          }} onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(4px)', e.currentTarget.style.boxShadow = '0 2px 0 #c24d4d')}
             onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '0 6px 0 #c24d4d')}>
            記録するにゃ！
          </button>
        </div>
      </div>
    </main>
  );
}
