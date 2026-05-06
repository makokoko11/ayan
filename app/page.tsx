"use client";
import { useState, useEffect } from 'react';

// データの種類を定義（ここを追加しました）
interface EventData {
  id: string;
  date: string;
  day: string;
  start: string;
  end: string;
  title: string;
  momStatus: string;
  assignment: string;
}

export default function Home() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const gasUrl = "https://script.google.com/macros/s/AKfycbwbXHFRRjF53XPE55sPv_ntNbDHw2YFi6xoLyLBXooieAMGqtoVjMC7JWA7Jkgappat/exec"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(gasUrl);
        const data = await res.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("データ取得失敗:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // エラーが出ていた部分を修正（eventIdとnameに種類を明記しました）
  const handleAssign = (eventId: string, name: string) => {
    setEvents(prev => prev.map(ev => ev.id === eventId ? { ...ev, assignment: name } : ev));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent mb-4"></div>
      <p className="font-bold text-gray-500">データを読み込み中...</p>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20 font-sans shadow-2xl text-gray-900">
      <header className="bg-blue-800 text-white p-6 sticky top-0 z-10 text-center shadow-lg">
        <h1 className="text-2xl font-black italic tracking-tighter">BEKKAI TRACK & FIELD</h1>
        <p className="text-[10px] opacity-80 mt-1">お迎え管理システム</p>
      </header>

      <div className="p-4 space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className={`p-4 flex justify-between items-center ${ev.assignment !== "未定" ? 'bg-blue-50' : 'bg-white'}`}>
              <div className="flex items-center gap-4">
                <div className="bg-white px-3 py-2 rounded-xl border-2 border-blue-100 text-center min-w-[60px]">
                  <div className="text-[10px] text-gray-400 font-bold">{ev.day}</div>
                  <div className="text-xl font-black text-blue-900 leading-tight">{ev.date}</div>
                </div>
                <div>
                  <div className="text-sm font-black line-clamp-1">{ev.title}</div>
                  <div className="text-[11px] font-bold text-gray-500 mt-1">🕒 {ev.start} 〜 {ev.end}</div>
                </div>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-md ${
                ev.assignment === "ママ" ? "bg-red-500 text-white" :
                ev.assignment === "パパ" ? "bg-blue-600 text-white" : 
                ev.assignment === "自転車" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"
              }`}>
                {ev.assignment}
              </span>
            </div>

            <div className="p-4 border-t border-gray-50">
              {ev.momStatus && (
                <div className="flex items-center gap-2 text-[11px] text-red-600 mb-4 bg-red-50 p-2.5 rounded-xl border border-red-100">
                  <span className="font-bold">ママ勤務：{ev.momStatus}</span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => handleAssign(ev.id, "パパ")} className={`py-3 rounded-xl text-xs font-black shadow-sm ${ev.assignment === "パパ" ? "bg-blue-600 text-white" : "bg-gray-50 text-blue-600 border border-blue-100"}`}>パパ</button>
                <button onClick={() => handleAssign(ev.id, "ママ")} className={`py-3 rounded-xl text-xs font-black shadow-sm ${ev.assignment === "ママ" ? "bg-red-500 text-white" : "bg-gray-50 text-red-500 border border-red-100"}`}>ママ</button>
                <button onClick={() => handleAssign(ev.id, "じい・ばば")} className="py-3 rounded-xl text-[10px] font-black border border-dashed border-gray-300 text-gray-400">じ・ば</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}