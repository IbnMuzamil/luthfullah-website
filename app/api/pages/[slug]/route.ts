import { NextRequest, NextResponse } from 'next/server';
import { pages } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const page = await pages.getPage(slug);
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    return NextResponse.json(page);
  } catch (error) {
    console.error(`Error fetching page ${params?.slug}:`, error);
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}
