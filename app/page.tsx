'use client';

import React, { useState, useEffect } from 'react';

export default function GamePage() {
  const [click, setClick] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const run = () => {
    if (isAnimating) return;

    const currentMin = min || "0";
    const currentSec = sec || "0";
    
    setMsgText(`${currentMin}分${currentSec}秒！おいしいにゃー！`);
    setShowMsg(true);
    
    setIsAnimating(true);
    setIsJumping(true);
    
    setTimeout(() => {
      setIsJumping(false);
    }, 300);

    const nextClick = click + 1;
    setClick(nextClick);

    if (nextClick >= 3) {
      setTimeout(() => {
        setIsFlipped(true);
        setMsgText("大満足だにゃーー！");
      }, 300);

      setTimeout(() => {
        setIsFlipped(false);
        setClick(0);
        setIsAnimating(false);
        setShowMsg(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
        setShowMsg(false);
      }, 1000);
    }
  };

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      fontFamily: "'Poppins', sans-serif",
      overflow: 'hidden',
      color: 'white',
      backgroundColor: '#222',
      position: 'relative',
      WebkitFontSmoothing: 'antialiased',
      background: 'radial-gradient(circle at 50% 100%, rgba(58, 166, 85, 0.5) 0%, rgba(30, 80, 40, 0.9) 100%)',
    }}>
      {/* 遠近感のあるトラック */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        width: '200%',
        height: '150%',
        border: '12px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '50%',
        transform: 'translateX(-50%) rotateX(60deg)',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1) inset',
      }} />

      {/* HUD Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 100,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#FF4D4D', color: 'white', fontWeight: 800, fontSize: '12px', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Lv. 5</div>
          <div style={{ width: '140px', height: '8px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg, #00C853 0%, #00E676 100%)' }} />
          </div>
        </div>
        <div style={{ textAlign: 'right', background: 'rgba(255, 255, 255, 0.1)', padding: '10px 15px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px' }}>BEST TIME</div>
          <div style={{ fontSize: '24px', fontWeight: 800 }}>2<span style={{ fontSize: '12px' }}>m</span> 41<span style={{ fontSize: '12px' }}>s</span></div>
        </div>
      </div>

      {/* Cat Container */}
      <div style={{
        position: 'absolute',
        bottom: '35%',
        left: '50%',
        transform: `translateX(-50%) translateY(${isJumping ? '-50px' : '0'})`,
        transition: 'transform 0.3s ease-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
      }}>
        <div style={{
          fontSize: '120px',
          lineHeight: 1,
          filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
          transform: isFlipped ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.3s',
        }}>🐱</div>
        <div style={{
          width: '80px',
          height: '20px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '50%',
          filter: 'blur(5px)',
          marginTop: '-10px',
          transform: isJumping ? 'scale(0.7)' : 'scale(1)',
          opacity: isJumping ? 0.5 : 1,
          transition: 'transform 0.3s, opacity 0.3s',
        }} />
      </div>

      {/* Message */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        width: '80%',
        textAlign: 'center',
        opacity: showMsg ? 1 : 0,
        transition: 'opacity 0.3s, transform 0.3s',
        zIndex: 5,
      }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 800,
          background: 'linear-gradient(to bottom, #fff, #eee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 10px rgba(0,0,0,0.5)',
        }}>{msgText}</div>
      </div>

      {/* Action Panel */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.1)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px 24px 0 0',
        padding: '25px',
        boxSizing: 'border-box',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', background: 'rgba(0, 0, 0, 0.2)', padding: '5px 15px', borderRadius: '12px' }}>
            <input 
              type="number" 
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="00" 
              style={{ width: '70px', background: 'transparent', border: 'none', color: 'white', fontSize: '40px', fontWeight: 800, textAlign: 'center', outline: 'none' }}
            />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>m</span>
          </div>
          <span style={{ fontSize: '30px', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>:</span>
          <div style={{ display: 'flex', alignItems: 'baseline', background: 'rgba(0, 0, 0, 0.2)', padding: '5px 15px', borderRadius: '12px' }}>
            <input 
              type="number" 
              value={sec}
              onChange={(e) => setSec(e.target.value)}
              placeholder="00" 
              style={{ width: '70px', background: 'transparent', border: 'none', color: 'white', fontSize: '40px', fontWeight: 800, textAlign: 'center', outline: 'none' }}
            />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>s</span>
          </div>
        </div>
        <button 
          onClick={run}
          style={{
            width: '100%',
            padding: '18px',
            border: 'none',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF4D4D 100%)',
            color: 'white',
            fontSize: '18px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 77, 77, 0.4)',
          }}
        >
          RECORD TIME
        </button>
      </div>
    </main>
  );
}
