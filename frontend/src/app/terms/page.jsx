import { getSiteUrl } from '@/lib/seo/site';

const SITE_URL = getSiteUrl();

export const metadata = {
  title: 'Terms of Service | NameVerse - Baby Names & Meanings',
  description: 'Read the terms of service for NameVerse. Understand the rules and guidelines for using our baby naming website and services.',
  keywords: 'terms of service, nameverse terms, baby names website terms, user agreement',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <a href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">Home</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 font-semibold">Terms of Service</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Last updated: March 28, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using NameVerse ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of our website at <a href={SITE_URL} className="text-indigo-600 hover:underline">{SITE_URL}</a> and any related services provided by NameVerse.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                NameVerse is a baby naming website that provides:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>A comprehensive database of baby names from various cultures and religions</li>
                <li>Detailed name meanings, origins, and pronunciations</li>
                <li>Numerology and lucky attributes associated with names</li>
                <li>Search and filtering functionality</li>
                <li>Articles and guides about baby naming</li>
                <li>User accounts for saving favorite names (if applicable)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use the service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate the company, employees, or other users</li>
                <li>In any way that infringes upon the rights of others</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use of the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The service and its original content, features, and functionality are and will remain the exclusive property of NameVerse and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of NameVerse.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Content and Data</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The name meanings, origins, and related information provided on NameVerse are for informational purposes only. While we strive for accuracy, we make no guarantees about the completeness or accuracy of the information.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The information provided should not be considered as professional advice for naming decisions. We recommend consulting with cultural or religious experts for important naming decisions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify, update, or remove any content at any time without prior notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Please review our <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>, which also governs your use of the service, to understand our practices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>The service will be uninterrupted, timely, secure, or error-free</li>
                <li>The results obtained from the use of the service will be accurate or reliable</li>
                <li>The quality of any products, services, or information obtained through the service will meet your expectations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In no event shall NameVerse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Your access to or use of or inability to access or use the service</li>
                <li>Any conduct or content of any third party on the service</li>
                <li>Any content obtained from the service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to defend, indemnify, and hold harmless NameVerse and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses arising from: (a) your use of and access to the service; (b) your violation of any term of these Terms; or (c) your violation of any third party right, including without limitation any copyright, property, or privacy right.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>By email: legal@nameverse.com</li>
                <li>By visiting our <a href="/about" className="text-indigo-600 hover:underline">About page</a></li>
                <li>Through our contact form on the website</li>
              </ul>
            </section>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Pages</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/privacy" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <h4 className="font-semibold text-gray-900">Privacy Policy</h4>
              <p className="text-sm text-gray-600 mt-1">Learn how we protect your data</p>
            </a>
            <a href="/about" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <h4 className="font-semibold text-gray-900">About Us</h4>
              <p className="text-sm text-gray-600 mt-1">Learn more about NameVerse</p>
            </a>
            <a href="/names" className="block p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <h4 className="font-semibold text-gray-900">Browse Names</h4>
              <p className="text-sm text-gray-600 mt-1">Explore our name database</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}