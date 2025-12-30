import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function DELETE(_request: NextRequest) {
  try {
    console.log('🧹 Starting test users cleanup...');
    
    const db = await connectDB();
    
    // Find test users by email patterns
    const testUsers = await db.collection('users').find({
      $or: [
        { email: { $regex: /test/i } },
        { email: { $regex: /example\.com$/i } },
        { email: { $regex: /company\.com$/i } },
        { email: { $regex: /fixtest/i } },
        { email: { $regex: /resumetest/i } }
      ]
    }).toArray();
    
    console.log(`Found ${testUsers.length} test users to remove`);
    
    if (testUsers.length === 0) {
      return NextResponse.json({ 
        message: 'No test users found to remove',
        removed: {
          users: 0,
          applications: 0,
          jobs: 0
        }
      });
    }
    
    // Get user IDs for cleanup
    const userIds = testUsers.map(user => user._id);
    const userIdStrings = testUsers.map(user => user._id.toString());
    
    // Remove applications from these users
    const applicationsResult = await db.collection('applications').deleteMany({
      $or: [
        { userId: { $in: userIds } },
        { userId: { $in: userIdStrings } }
      ]
    });
    
    // Remove jobs posted by these users
    const jobsResult = await db.collection('jobs').deleteMany({
      $or: [
        { postedBy: { $in: userIds } },
        { postedBy: { $in: userIdStrings } }
      ]
    });
    
    // Remove the test users
    const usersResult = await db.collection('users').deleteMany({
      _id: { $in: userIds }
    });
    
    const removedUsers = testUsers.map(user => ({
      name: user.name,
      email: user.email,
      role: user.role
    }));
    
    console.log(`✅ Cleanup completed: ${usersResult.deletedCount} users, ${applicationsResult.deletedCount} applications, ${jobsResult.deletedCount} jobs removed`);
    
    return NextResponse.json({
      message: 'Test users cleanup completed successfully',
      removed: {
        users: usersResult.deletedCount,
        applications: applicationsResult.deletedCount,
        jobs: jobsResult.deletedCount
      },
      removedUsers: removedUsers
    });
    
  } catch (error) {
    console.error('❌ Cleanup error:', error);
    return NextResponse.json({
      error: 'Failed to cleanup test users',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
