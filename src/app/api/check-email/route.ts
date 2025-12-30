import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const { email } = body;
    
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Check if user exists in either collection (same as login logic)
    // First check 'website-users' collection (primary for website users)
    let user = await db.collection('website-users').findOne({ email: email.toLowerCase().trim() });
    let userSource = 'website-users';
    
    // If not found, check 'users' collection
    if (!user) {
      user = await db.collection('users').findOne({ email: email.toLowerCase().trim() });
      userSource = 'users';
    }
    
    if (!user) {
      return NextResponse.json({ 
        exists: false,
        message: 'Email not found in database'
      }, { status: 200 });
    }
    
    // User exists - return success (don't return sensitive data)
    return NextResponse.json({
      exists: true,
      email: user.email,
      name: user.name,
      source: userSource
    }, { status: 200 });
  } catch (error) {
    console.error('Check email error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      exists: false
    }, { status: 500 });
  }
}

