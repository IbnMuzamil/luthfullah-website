import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/db';

export async function GET() {
  try {
    const data = config.get();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading site config:', error);
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid config data' }, { status: 400 });
    }

    const updated = config.update(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating site config:', error);
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
