import { NextRequest } from 'next/server';
import { getDatabaseInfo, checkDatabaseConnection } from '@/db/utils/dbUtils';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const isConnected = await checkDatabaseConnection();
    
    if (!isConnected) {
      return new Response(
        JSON.stringify({ 
          error: 'Database connection failed',
          connected: false 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const dbInfo = getDatabaseInfo();
    
    return new Response(
      JSON.stringify({
        message: 'Database information retrieved successfully',
        data: dbInfo,
        timestamp: new Date().toISOString(),
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Database info API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to retrieve database information',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}