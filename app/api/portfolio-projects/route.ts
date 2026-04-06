import { NextRequest, NextResponse } from 'next/server'
import { portfolio } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const item = portfolio.getById(id)
      if (!item) return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
      return NextResponse.json(item)
    }

    return NextResponse.json(portfolio.getAll())
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const item = portfolio.create(body)
    return NextResponse.json(item, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create portfolio item' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    const item = portfolio.update(id, updates)
    return NextResponse.json(item)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update portfolio item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    portfolio.delete(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete portfolio item' }, { status: 500 })
  }
}
