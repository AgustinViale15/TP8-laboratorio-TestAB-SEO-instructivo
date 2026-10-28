import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hashVisitorId } from './lib/experiment';
import { db } from './lib/db';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;

  if (url.searchParams.has('preview')) {
    return response;
  }

  let visitorId = request.cookies.get('visitor_id')?.value;
  let variant = request.cookies.get('variant')?.value as 'a' | 'b' | undefined;

  if (!visitorId || !variant) {
    visitorId = crypto.randomUUID();
    variant = hashVisitorId(visitorId);

    const cookieOptions = {
      httpOnly: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
      sameSite: 'lax' as const,
    };

    response.cookies.set('visitor_id', visitorId, cookieOptions);
    response.cookies.set('variant', variant, cookieOptions);
  }

  const sessionImpression = request.cookies.get('session_impression')?.value;
  if (!sessionImpression) {
    db.recordImpression(variant);

    response.cookies.set('session_impression', '1', {
      httpOnly: true,
      path: '/',
      maxAge: 30 * 60,
      sameSite: 'lax',
    });
  }

  return response;
}
