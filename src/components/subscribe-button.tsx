"use client";

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { ComplianceModal } from './compliance-modal';

export function SubscribeButton({ tier }: { tier: 'pro' | 'enterprise' }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInitialClick = () => {
    if (status === 'unauthenticated') {
      signIn('google', { callbackUrl: '/pricing' });
      return;
    }
    
    if (localStorage.getItem('hyperrouter_compliance') === 'true') {
      handleSubscribe();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubscribe = async () => {
    setIsModalOpen(false);
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier })
      });
      
      const data = await res.json();
      
      // 2. 프론트엔드 에러 핸들링 및 테스트 우회
      if (data.error === "Payment keys missing" && data.dummyUrl) {
        alert("결제 시스템 키가 설정되지 않아 임시 테스트 모드로 진행합니다.");
        window.location.href = data.dummyUrl;
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || 'Failed to initialize checkout.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={handleInitialClick} 
        disabled={loading || status === 'loading'}
        className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-[#e0e0e0] transition-colors disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
      <ComplianceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleSubscribe} 
        providerName="HyperRouter (Subscription)" 
      />
    </>
  );
}
