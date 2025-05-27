import { NextResponse } from 'next/server';
import eventsData from '@/../public/mock/events.json';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.toLowerCase() || '';
    
    const filteredEvents = query 
      ? eventsData.filter(event => 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
        )
      : eventsData;

    return new NextResponse(JSON.stringify(filteredEvents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch {
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}