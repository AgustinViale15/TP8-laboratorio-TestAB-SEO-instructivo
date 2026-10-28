'use server';

import { cookies } from 'next/headers';
import { db } from '../../lib/db';

export async function handleConversionAction() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get('visitor_id')?.value;
  const variant = cookieStore.get('variant')?.value as 'a' | 'b' | undefined;
  const hasConverted = cookieStore.get('has_converted')?.value;

  if (!visitorId || !variant || hasConverted) {
    return { success: false, reason: 'Ya convirtió o sesión inválida' };
  }

  db.recordConversion(variant);

  cookieStore.set('has_converted', 'true', {
    httpOnly: true,
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  });

  return { success: true };
}