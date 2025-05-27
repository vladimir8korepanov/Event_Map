import { NextResponse } from 'next/server';
import events from '@/../public/mock/events.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.toLowerCase() || '';
    
    const filteredEvents = query 
      ? events.filter(event => 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
        )
      : events;

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
        'Content-Type': 'application/json'
      }
    });
  }
}