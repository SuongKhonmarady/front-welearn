import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - OpenScholarships</title>
        <meta name="description" content="Privacy Policy for OpenScholarships - How we collect, use, and protect your personal data and analytics information." />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-[#283d50] mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">1. Introduction</h2>              <p className="text-gray-700 leading-relaxed mb-4">
                OpenScholarships (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website openscholarships.me and use our scholarship recommendation services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our website, you consent to the data practices described in this Privacy Policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide</h3>
              <p className="text-gray-700 mb-4">
                Currently, our website operates as a scholarship information platform without user registration. We may collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Search queries when you browse scholarships</li>
                <li>Contact information if you reach out to us directly</li>
                <li>Feedback or survey responses (if provided voluntarily)</li>
              </ul>
              <p className="text-gray-700 mb-4 text-sm italic">
                Note: We do not currently require account registration or collect personal information for user accounts.
              </p>              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Information Collected Automatically</h3>
              <p className="text-gray-700 mb-4">
                When you browse our scholarship database, we automatically collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>IP address and approximate location</li>
                <li>Browser type, version, and device information</li>
                <li>Pages visited and time spent browsing scholarships</li>
                <li>Referring website or search engine</li>
                <li>Scholarship viewing patterns and preferences</li>
                <li>Click interactions with scholarship links</li>
              </ul>
            </section>

            {/* Google Analytics */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">3. Google Analytics and Cookies</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Google Analytics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use Google Analytics to understand how visitors interact with our website. Google Analytics collects information such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Pages you visit and time spent on each page</li>
                <li>How you arrived at our website</li>
                <li>Your approximate geographic location</li>
                <li>Your device and browser information</li>
                <li>Scholarship viewing and interaction patterns</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Cookie Consent</h3>              <p className="text-gray-700 leading-relaxed mb-4">
                We respect your privacy choices. When you first visit our website, you&rsquo;ll see a cookie consent banner where you can:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Accept:</strong> Allow Google Analytics to track your website usage</li>
                <li><strong>Decline:</strong> Disable analytics tracking (basic functionality remains)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your choice is remembered for future visits. You can change your preference by clearing your browser data.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Custom Analytics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We track specific scholarship-related interactions to improve our service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Scholarship views and popularity</li>
                <li>Search queries and filter usage</li>
                <li>Chatbot interactions and questions</li>
                <li>External link clicks to scholarship applications</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">4. How We Use Your Information</h2>              <p className="text-gray-700 leading-relaxed mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Provide and improve our scholarship recommendation service</li>
                <li>Understand which scholarships are most popular and relevant</li>
                <li>Optimize website performance and user experience</li>
                <li>Analyze browsing patterns to enhance our scholarship database</li>
                <li>Improve search functionality and filtering options</li>
                <li>Ensure website security and prevent abuse</li>
                <li>Respond to inquiries if you contact us directly</li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-sm italic">
                Since we don&rsquo;t require user accounts, we cannot send personalized communications or store individual preferences.
              </p>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">5. Information Sharing and Disclosure</h2>              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information in these limited circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Google Analytics:</strong> Anonymous usage data is shared with Google for analytics purposes</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Service Providers:</strong> With trusted partners who help operate our website (under strict confidentiality)</li>
                <li><strong>Scholarship Providers:</strong> When you click external links, you&rsquo;re subject to their privacy policies</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">6. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure hosting and regular security updates</li>
                <li>Limited access to personal information</li>
                <li>Regular monitoring for security threats</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">7. Your Privacy Rights</h2>              <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Know what information we collect about your browsing activity</li>
                <li>Request information about data we may have collected</li>
                <li>Disable analytics tracking via cookie consent settings</li>
                <li>Clear your browser data to reset tracking preferences</li>
                <li>Contact us with any privacy-related questions</li>
                <li>Request deletion of any data we may have collected</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Note:</strong> Since we don&rsquo;t require user accounts, most data we collect is anonymous and automatically expires. You can always browse our scholarship database without accepting cookies.
              </p>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us at privacy@openscholarships.me
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">8. Third-Party Links</h2>              <p className="text-gray-700 leading-relaxed mb-4">
                Our website contains links to external scholarship applications and university websites. We are not responsible for the privacy practices of these third-party sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">9. Children&rsquo;s Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our service is intended for students 13 years and older. We do not knowingly collect personal information from children under 13. If we discover that we have collected information from a child under 13, we will delete it immediately.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">10. International Users</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are accessing our website from outside the United States, please note that your information may be transferred to, stored, and processed in the United States. By using our service, you consent to this transfer.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For European Union users, we comply with GDPR requirements and provide additional protections for your personal data.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">11. Changes to This Privacy Policy</h2>              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#283d50] mb-4">12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@openscholarships.me</p>
                <p className="text-gray-700 mb-2"><strong>Website:</strong> https://openscholarships.me</p>
                <p className="text-gray-700"><strong>Address:</strong> OpenScholarships Privacy Team</p>
              </div>
            </section>

            {/* Quick Summary */}            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-[#283d50] mb-4">📋 Quick Summary</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We provide scholarship information without requiring user registration</li>
                <li>We use Google Analytics to improve our scholarship database and website</li>
                <li>You can accept or decline cookie tracking - full functionality either way</li>
                <li>We don&rsquo;t collect personal information or require accounts</li>
                <li>All scholarship data is scraped from public sources</li>
                <li>You have full control over your privacy settings</li>
                <li>Contact us anytime with privacy questions</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
