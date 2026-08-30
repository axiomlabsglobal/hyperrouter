import Link from 'next/link';
import { LegalPageLayout } from '@/components/legal-page-layout';

export const metadata = {
  title: 'Terms of Service — HyperRouter',
  description: 'Terms governing the HyperRouter GPU computing aggregation SaaS.',
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      kind="terms"
      eyebrow="Legal / Platform terms"
      title="Terms of Service"
      summary="These terms explain HyperRouter’s role as an independent GPU computing aggregation SaaS, the boundary between our platform and third-party providers, and the rules for using the Service."
      updatedAt="August 23, 2026"
    >
      <section>
        <h2>1. Agreement and scope</h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern access to and use of HyperRouter&apos;s websites,
          comparison tools, alerts, APIs, and related services (collectively, the &quot;Service&quot;). By using
          the Service, you agree to these Terms and our <Link href="/privacy">Privacy Notice</Link>.
          If you use the Service for an organization, you represent that you are authorized to bind that organization.
        </p>
        <div className="legal-callout">
          <strong>Important service boundary.</strong> HyperRouter is a software platform that indexes, compares,
          and routes users to third-party GPU computing providers. HyperRouter does not own, operate, manage,
          lease, or provision the underlying compute infrastructure, and it does not provide energy, ESS, or power-infrastructure services.
        </div>
      </section>

      <section>
        <h2>2. Third-party providers and external transactions</h2>
        <p>
          A provider&apos;s console, ordering flow, service level agreement, privacy notice, technical controls,
          billing, and support are governed by that provider&apos;s own terms. When you follow an outbound link,
          you leave HyperRouter and any provisioning or purchase occurs directly between you and that provider.
        </p>
        <ul>
          <li>Verify final pricing, availability, region, data-handling terms, service levels, and all egress, storage, support, tax, or other charges before provisioning.</li>
          <li>Do not submit credentials, customer data, or workload content to a provider unless you have independently assessed that provider and have authority to do so.</li>
          <li>Provider names, logos, and brands are used for identification only and remain the property of their respective owners. HyperRouter is not affiliated with, endorsed by, or sponsored by a provider unless expressly stated in writing.</li>
        </ul>
      </section>

      <section>
        <h2>3. Information, estimates, and ranking</h2>
        <p>
          Prices, availability, hardware specifications, regions, and compliance information displayed in the
          Service are informational estimates derived from provider APIs, public sources, and other permitted data sources.
          They may be delayed, incomplete, inaccurate, or unavailable. They are not an offer to sell compute resources,
          a quote, a guarantee of capacity, or a representation that a provider will accept a transaction.
        </p>
        <p>
          HyperRouter may rank results using criteria such as price, availability, configuration, region, and relevance.
          Paid placement or a commercial relationship, where present, will be identified as promoted or sponsored.
          Referral fees do not change the requirement to label paid placement clearly.
        </p>
      </section>

      <section>
        <h2>4. Acceptable use</h2>
        <p>You must not use the Service, or attempt to use a provider reached through it, to:</p>
        <ul>
          <li>violate law, export-control restrictions, economic sanctions, intellectual-property rights, privacy rights, or another party&apos;s contractual rights;</li>
          <li>create or distribute malware, conduct unauthorized access, interfere with systems, evade security or geographic controls, or misuse credentials;</li>
          <li>generate unlawful, deceptive, non-consensual, or infringing content, including unlawful synthetic media or deepfakes;</li>
          <li>conduct unauthorized cryptocurrency mining, fraud, abuse, or activity that materially harms a provider, HyperRouter, or another user; or</li>
          <li>scrape or extract the Service at scale, interfere with rate limits, reverse engineer protected functionality, or misrepresent your identity or affiliation.</li>
        </ul>
        <p>
          We may investigate suspected misuse, restrict or suspend access, preserve relevant records, and report or cooperate
          with lawful requests where appropriate. Enforcement is risk-based and does not limit our ability to act immediately for security, sanctions, or legal reasons.
        </p>
      </section>

      <section>
        <h2>5. Compliance responsibilities</h2>
        <p>
          You are responsible for determining whether your use, intended workload, end users, destination, and selected provider comply with applicable law.
          This includes obtaining necessary authorizations and complying with sanctions, export controls, data-protection requirements, and sector-specific obligations.
          HyperRouter may apply risk-based screening and access controls, but these controls are not a legal determination or a substitute for your compliance program.
        </p>
        <p>
          Additional information is available in our <Link href="/compliance">Trade Compliance Notice</Link>.
        </p>
      </section>

      <section>
        <h2>6. Subscriptions and payments</h2>
        <p>
          Paid features, if offered, are described at checkout or in the applicable order form. Payment processing is handled by the payment provider presented during checkout;
          HyperRouter does not receive your full payment-card number. Fees, renewal, cancellation, taxes, and refunds are governed by the applicable checkout terms and any mandatory consumer rights.
        </p>
      </section>

      <section>
        <h2>7. Intellectual property and feedback</h2>
        <p>
          The Service, including its software, design, data compilation, and trademarks, is owned by HyperRouter or its licensors and is protected by applicable law.
          Subject to these Terms, HyperRouter grants you a limited, revocable, non-transferable right to use the Service for its intended purpose. Feedback may be used without restriction or compensation, provided we do not identify you as its source without permission.
        </p>
      </section>

      <section>
        <h2>8. Disclaimers and limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, the Service is provided &quot;as is&quot; and &quot;as available.&quot;
          HyperRouter disclaims warranties regarding the Service and third-party provider information, including accuracy, timeliness, merchantability, fitness for a particular purpose, non-infringement, continuous availability, and security.
        </p>
        <p>
          HyperRouter is not responsible for third-party provider acts or omissions, final billing, workload interruption, data loss, security incidents, service levels, or external transactions.
          Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited, including liability where mandatory law provides otherwise.
        </p>
      </section>

      <section>
        <h2>9. Changes, termination, and contact</h2>
        <p>
          We may modify the Service or these Terms to reflect operational, security, legal, or business changes. Material changes will be posted with an updated revision date and, where required, additional notice.
          You may stop using the Service at any time. We may suspend or terminate access as permitted by law and these Terms.
        </p>
        <p>
          Questions or legal notices may be sent to <a href="mailto:legal@hyperrouter.com">legal@hyperrouter.com</a>.
          These Terms are governed by the law identified in the applicable order form or, absent an order form, the law designated in a legally effective notice provided by HyperRouter, subject to mandatory local law.
        </p>
      </section>
    </LegalPageLayout>
  );
}
