import { NextRequest, NextResponse } from 'next/server';
import { pages } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const page = pages.getPage(slug);
      return page ? NextResponse.json(page) : NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const allPages = pages.getAll();
    return NextResponse.json(allPages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // If body is the whole pages object, update all
    if (body && typeof body === 'object' && !body.slug && !body.id) {
      const updated = pages.updateAll(body);
      return NextResponse.json(updated);
    }
    
    // Otherwise it's a single page update
    const { slug, ...content } = body;
    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    
    const updated = pages.updatePage(slug, content);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save pages' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  return POST(request); // Reuse POST logic for now
}
