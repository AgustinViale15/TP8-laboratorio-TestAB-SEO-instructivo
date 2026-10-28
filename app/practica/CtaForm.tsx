'use client';

import { handleConversionAction } from './actions';

export function CtaForm({ ctaText }: { ctaText: string }) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleConversionAction();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer' }}>
        {ctaText}
      </button>
    </form>
  );
}