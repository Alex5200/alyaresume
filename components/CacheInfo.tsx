'use client';

import { useState, useEffect } from 'react';

interface CacheInfo {
  lastFetch: string;
  fetchTime: number;
  cacheHit: boolean;
  source: 'api' | 'localStorage' | 'edge';
}

export default function CacheInfo() {
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показываем только в разработке
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      
      // Отслеживаем запросы к API
      const originalFetch = window.fetch;
      let fetchStartTime = 0;
      
      window.fetch = async (...args) => {
        const [url, options] = args;
        
        if (typeof url === 'string' && url.includes('/api/portfolio')) {
          fetchStartTime = Date.now();
          
          try {
            const response = await originalFetch(...args);
            const fetchTime = Date.now() - fetchStartTime;
            
            // Проверяем заголовки кеширования
            const cacheControl = response.headers.get('cache-control');
            const isFromCache = cacheControl?.includes('max-age') || false;
            
            setCacheInfo({
              lastFetch: new Date().toLocaleTimeString(),
              fetchTime,
              cacheHit: isFromCache,
              source: url.includes('portfolio-s3') ? 'api' : 'edge'
            });
            
            return response;
          } catch (error) {
            console.error('Cache tracking error:', error);
            return originalFetch(...args);
          }
        }
        
        return originalFetch(...args);
      };
      
      return () => {
        window.fetch = originalFetch;
      };
    }
  }, []);

  if (!isVisible || !cacheInfo) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '200px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>🔄 Cache Info</div>
      <div>📅 {cacheInfo.lastFetch}</div>
      <div>⚡ {cacheInfo.fetchTime}ms</div>
      <div>📦 Source: {cacheInfo.source}</div>
      <div style={{ 
        color: cacheInfo.cacheHit ? '#4ade80' : '#f87171',
        marginTop: '5px'
      }}>
        {cacheInfo.cacheHit ? '✅ Cached' : '🌐 Fresh'}
      </div>
    </div>
  );
}
