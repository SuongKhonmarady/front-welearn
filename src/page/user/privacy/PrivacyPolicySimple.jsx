import { Helmet } from 'react-helmet-async';

const PrivacyPolicySimple = () => {
  return (
      <>
        <Helmet>
          <title>Privacy Policy - OpenScholarships</title>
          <meta name="description" content="Privacy Policy for OpenScholarships - How we collect, use, and protect your personal data and analytics information." />
          <meta name="robots" content="index, follow" />
        </Helmet>
        
        <div className="bg-gray-50 py-8 px-4 -mx-5 -mt-5 sm:py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#283d50] mb-4">Privacy Policy</h1>
                <p className="text-base sm:text-lg text-gray-600">
                  Your privacy matters to us. Learn how we protect your information.
                </p>
                <div className="mt-4 inline-block bg-blue-50 px-4 py-2 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>              {/* Quick Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
                  Quick Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-blue-800">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm sm:text-base">No user accounts required</span>
                    </div>
                    <div className="flex items-center text-blue-800">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm sm:text-base">Google Analytics with your consent</span>
                    </div>
                    <div className="flex items-center text-blue-800">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm sm:text-base">Data sourced from public websites</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-blue-800">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm sm:text-base">Cookie consent banner</span>
                    </div>                    <div className="flex items-center text-blue-800">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm sm:text-base">We don&apos;t sell your data</span>
                    </div>
                    <div className="flex items-center text-blue-800">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm sm:text-base">Full control over your privacy</span>
                    </div>
                  </div>
                </div>
              </div>              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6">
                  Introduction
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                    Welcome to <strong>OpenScholarships</strong> – your trusted platform for discovering scholarship opportunities. 
                    We are committed to protecting your privacy and being transparent about how we collect, use, and safeguard your information.
                  </p>                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    This Privacy Policy explains our practices when you visit <strong>openscholarships.me</strong> and use our scholarship recommendation services.
                    By using our website, you agree to the practices described in this policy.
                  </p>
                </div>
              </section>              {/* What We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6">
                  What Information We Collect
                </h2>
                
                {/* No Personal Data */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">
                    Good News: No Personal Information Required
                  </h3>
                  <p className="text-green-700 mb-3">
                    Our platform operates without requiring user registration or personal accounts. You can browse scholarships completely anonymously.
                  </p>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>We do NOT collect:</strong> Names, emails, phone numbers, addresses, or any personal identifiers unless you voluntarily contact us.
                    </p>
                  </div>
                </div>
  
                {/* Automatic Information */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Automatic Information Collection
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Like most websites, we automatically collect some technical information to improve our service:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        <span className="text-sm text-gray-700">Browser type and version</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        <span className="text-sm text-gray-700">Device information</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        <span className="text-sm text-gray-700">IP address (approximate location)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        <span className="text-sm text-gray-700">Pages visited</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        <span className="text-sm text-gray-700">Time spent on site</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        <span className="text-sm text-gray-700">Scholarship interactions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>              {/* Google Analytics */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6">
                  Google Analytics & Cookies
                </h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Your Choice Matters</h3>
                  <p className="text-blue-700 mb-4">
                    We use Google Analytics to understand how visitors use our site, but <strong>only with your permission</strong>.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">If You Accept Cookies:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Help us improve the website</li>
                        <li>• Show you popular scholarships</li>
                        <li>• Optimize search functionality</li>
                        <li>• Track scholarship trends</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">If You Decline Cookies:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Full website functionality remains</li>
                        <li>• No tracking or analytics</li>
                        <li>• Complete anonymity</li>
                        <li>• No data shared with Google</li>
                      </ul>
                    </div>
                  </div>
                </div>                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Change Your Mind Anytime
                  </h3>
                  <p className="text-yellow-700">
                    You can change your cookie preferences by clearing your browser data or contacting us. 
                    Your choice is saved and respected for future visits.
                  </p>
                </div>
              </section>              {/* How We Use Information */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6">
                  How We Use Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Improve Service</h3>
                    <p className="text-sm text-green-700">
                      Enhance search results, fix bugs, and optimize user experience
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Analytics</h3>
                    <p className="text-sm text-blue-700">
                      Understand popular scholarships and user preferences
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Maintenance</h3>
                    <p className="text-sm text-purple-700">
                      Monitor performance and ensure reliable service
                    </p>
                  </div>
                </div>
              </section>              {/* Data Protection */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6">
                  Your Data Protection
                </h2>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-4">
                    We Never Sell Your Data
                  </h3>
                  <p className="text-red-700 text-lg">
                    <strong>Promise:</strong> We do not sell, rent, or trade any information to third parties. 
                    Your data stays with us or is only shared with Google Analytics (with your consent).
                  </p>
                </div>
  
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">SSL Encryption</h4>
                    <p className="text-sm text-gray-600">Secure data transmission</p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">Secure Servers</h4>
                    <p className="text-sm text-gray-600">Protected infrastructure</p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">Regular Monitoring</h4>
                    <p className="text-sm text-gray-600">Continuous security checks</p>
                  </div>
                </div>
              </section>              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6">
                  Your Privacy Rights
                </h2>
                
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">You Have Full Control</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-3">You Can:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-purple-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Opt out of analytics tracking
                        </li>
                        <li className="flex items-center text-purple-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Request information about data collection
                        </li>
                        <li className="flex items-center text-purple-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Contact us with privacy concerns
                        </li>
                        <li className="flex items-center text-purple-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Use our site without any tracking
                        </li>
                      </ul>
                    </div>
                      <div>
                      <h4 className="font-semibold text-purple-800 mb-3">How To:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center text-purple-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Clear your browser cookies
                        </li>
                        <li className="flex items-center text-purple-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Email us: privacy@openscholarships.me
                        </li>
                        <li className="flex items-center text-purple-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Decline cookies on first visit
                        </li>
                        <li className="flex items-center text-purple-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Use private/incognito browsing
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>              {/* External Links */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6">
                  External Links & Applications
                </h2>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                      <p className="text-yellow-700">
                        Our website contains links to external scholarship applications and university websites. 
                        When you click these links, you&apos;re leaving our site.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Remember:</strong> Each external site has its own privacy policy. 
                      We recommend reviewing their policies before providing personal information for scholarship applications.
                    </p>
                  </div>
                </div>
              </section>              {/* Updates */}
              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6">
                  Policy Updates
                </h2>
                
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <p className="text-gray-700 mb-4">
                    We may update this Privacy Policy occasionally to reflect changes in our practices or legal requirements.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">Update the date above</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">Notify of major changes</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">Post updated policy here</span>
                    </div>
                  </div>
                </div></section>
            </div>
          </div>
        </div>
      </>
    );
};

export default PrivacyPolicySimple;
