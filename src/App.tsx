/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Maximize, ArrowRightLeft, Copy, Check, RotateCcw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PYEONG_TO_M2 = 3.305785;

export default function App() {
  const [pyeong, setPyeong] = useState<string>('');
  const [m2, setM2] = useState<string>('');
  
  const [copiedPyeong, setCopiedPyeong] = useState(false);
  const [copiedM2, setCopiedM2] = useState(false);

  const [isReversed, setIsReversed] = useState(false);

  // Pyeong Logic
  const handlePyeongChange = (val: string) => {
    setPyeong(val);
    if (val === '' || isNaN(Number(val))) {
      setM2('');
    } else {
      setM2((Number(val) * PYEONG_TO_M2).toFixed(2));
    }
  };

  const handleM2Change = (val: string) => {
    setM2(val);
    if (val === '' || isNaN(Number(val))) {
      setPyeong('');
    } else {
      setPyeong((Number(val) / PYEONG_TO_M2).toFixed(2));
    }
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const copyToClipboard = (text: string, type: 'pyeong' | 'm2') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'pyeong') {
      setCopiedPyeong(true);
      setTimeout(() => setCopiedPyeong(false), 2000);
    } else {
      setCopiedM2(true);
      setTimeout(() => setCopiedM2(false), 2000);
    }
  };

  const resetPyeong = () => {
    setPyeong('');
    setM2('');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 pb-20">
      <div className="max-w-xl mx-auto px-5 pt-12 md:pt-20">
        <header className="mb-10 px-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            간편 변환기
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-[#191F28] leading-tight"
          >
            복잡한 계산은 빼고,<br />
            <span className="text-[#3182F6]">정확함</span>만 담았습니다.
          </motion.h1>
        </header>

        <main className="space-y-6">
          {/* Pyeong Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-[#333D4B]">계산기</h2>
              <button 
                onClick={resetPyeong}
                className="p-2 text-[#8B95A1] hover:bg-[#F2F4F6] rounded-full transition-colors"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            <div className="flex flex-col">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={isReversed ? 'm2-first' : 'pyeong-first'}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-end px-1">
                    <span className="text-sm font-medium text-[#4E5968]">
                      {isReversed ? '제곱미터 (m²)' : '평수'}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(isReversed ? m2 : pyeong, isReversed ? 'm2' : 'pyeong')}
                      className="text-xs font-semibold text-[#3182F6] hover:bg-blue-50 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      {(isReversed ? copiedM2 : copiedPyeong) ? <><Check size={12} /> 복사됨</> : <><Copy size={12} /> 복사하기</>}
                    </button>
                  </div>
                  <div className="relative group">
                    <input
                      type="number"
                      value={isReversed ? m2 : pyeong}
                      onChange={(e) => isReversed ? handleM2Change(e.target.value) : handlePyeongChange(e.target.value)}
                      placeholder="0"
                      className="w-full bg-[#F9FAFB] border-none rounded-2xl px-6 py-5 text-2xl font-bold text-[#191F28] focus:ring-2 focus:ring-[#3182F6]/10 transition-all outline-none placeholder:text-[#D1D6DB]"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-lg font-medium text-[#8B95A1]">{isReversed ? 'm²' : '평'}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  key="swap-button"
                  layout
                  className="flex justify-center py-4"
                >
                  <button 
                    onClick={toggleReverse}
                    className="w-12 h-12 bg-[#F2F4F6] hover:bg-[#EBEEF1] rounded-full flex items-center justify-center text-[#3182F6] shadow-sm transition-all active:scale-95 group"
                    title="순서 바꾸기"
                  >
                    <motion.div
                      animate={{ rotate: isReversed ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <ArrowRightLeft size={20} className="rotate-90" />
                    </motion.div>
                  </button>
                </motion.div>

                <motion.div 
                  key={isReversed ? 'pyeong-second' : 'm2-second'}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-end px-1">
                    <span className="text-sm font-medium text-[#4E5968]">
                      {isReversed ? '평수' : '제곱미터 (m²)'}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(isReversed ? pyeong : m2, isReversed ? 'pyeong' : 'm2')}
                      className="text-xs font-semibold text-[#3182F6] hover:bg-blue-50 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      {(isReversed ? copiedPyeong : copiedM2) ? <><Check size={12} /> 복사됨</> : <><Copy size={12} /> 복사하기</>}
                    </button>
                  </div>
                  <div className="relative group">
                    <input
                      type="number"
                      value={isReversed ? pyeong : m2}
                      onChange={(e) => isReversed ? handlePyeongChange(e.target.value) : handleM2Change(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#F9FAFB] border-none rounded-2xl px-6 py-5 text-2xl font-bold text-[#191F28] focus:ring-2 focus:ring-[#3182F6]/10 transition-all outline-none placeholder:text-[#D1D6DB]"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-lg font-medium text-[#8B95A1]">{isReversed ? '평' : 'm²'}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F2F4F6]">
              <div className="flex items-start gap-3 text-[#6B7684]">
                <div className="mt-1 p-1 bg-[#F2F4F6] rounded-md text-[#8B95A1]">
                  <Maximize size={14} />
                </div>
                <p className="text-sm leading-relaxed">
                  1평은 약 <span className="text-[#333D4B] font-semibold">3.3058m²</span>입니다.<br />
                  아파트나 토지 면적을 계산할 때 사용하세요.
                </p>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="mt-16 text-center space-y-4">
          <div className="flex justify-center gap-6 text-sm font-medium text-[#8B95A1]">
            <a href="#" className="hover:text-[#4E5968] transition-colors">이용약관</a>
            <a href="#" className="hover:text-[#4E5968] transition-colors">개인정보처리방침</a>
          </div>
          <p className="text-xs text-[#ADB5BD]">
            &copy; {new Date().getFullYear()} Unit Converter. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
