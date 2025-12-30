import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-full mb-6 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Job Portal
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Coming Soon!
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <p className="text-lg text-gray-300 mb-6">
            We're working on bringing you the best job portal experience with:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Job Listings</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Company Profiles</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Application Tracking</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>HR Management</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
            <Link 
              href="/tutorials"
              className="px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Explore Tutorials
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Stay tuned for updates!</p>
        </div>
      </div>
    </div>
  );
}
