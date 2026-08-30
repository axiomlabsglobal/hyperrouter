import Link from 'next/link';
import { LegalPageLayout } from '@/components/legal-page-layout';

export const metadata = {
  title: 'Privacy Notice — HyperRouter',
  description: 'How HyperRouter handles platform personal information.',
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      kind="privacy"
      eyebrow="Legal / Privacy"
      title="Privacy Notice"
      summary="This notice describes personal information processed through HyperRouter’s comparison and routing SaaS. It does not replace the privacy notices of third-party GPU computing providers you may visit."
      updatedAt="August 23, 2026"
    >
      <section>
        <h2>1. Who this notice covers</h2>
        <p>
          This Privacy Notice applies to personal information HyperRouter processes in connection with its website,
          comparison tools, product communications, and support interactions. HyperRouter acts as controller for its own platform operations where applicable.
          A third-party provider you visit or contract with acts under its own privacy notice and terms for its console, account, workloads, billing, and infrastructure operations.
        </p>
        <div className="legal-callout">
          <strong>Provider boundary.</strong> HyperRouter does not provision compute resources or operate provider infrastructure.
          Do not assume that a provider&apos;s data practices, data locations, or security commitments are reviewed, adopted, or guaranteed by HyperRouter.
        </div>
      </section>

      <section>
        <h2>2. Information we may process</h2>
        <p>The categories depend on how you use the Service and may include:</p>
        <ul>
          <li><strong>Service activity:</strong> search terms, selected filters, viewed comparisons, referral-link interactions, feature usage, and support requests.</li>
          <li><strong>Technical information:</strong> device and browser information, IP-derived network and approximate country information, security signals, and diagnostic logs generated when you access the Service.</li>
          <li><strong>Contact and account information:</strong> information you provide when you contact us, request a service, or use an account feature when available.</li>
          <li><strong>Preferences:</strong> for example, language preferences stored locally in your browser to remember your selection.</li>
          <li><strong>Transaction information:</strong> limited subscription or order-status information provided by the payment service used at checkout; payment-card details are handled by that payment service, not entered into HyperRouter&apos;s product interface.</li>
        </ul>
      </section>

      <section>
        <h2>3. How we use information</h2>
        <ul>
          <li>operate, secure, maintain, and improve the Service;</li>
          <li>respond to support, security, legal, and compliance requests;</li>
          <li>measure referral-link performance and prevent abuse, fraud, automated extraction, or security incidents;</li>
          <li>provide requested subscriptions, notices, or product communications; and</li>
          <li>comply with applicable legal obligations and enforce our <Link href="/terms">Terms of Service</Link>.</li>
        </ul>
        <p>
          Where the GDPR applies, our legal bases may include performance of a contract or steps requested before entering one,
          legitimate interests in securing and improving the Service, consent where required, and compliance with legal obligations.
          The appropriate basis depends on the specific processing activity.
        </p>
      </section>

      <section>
        <h2>4. Sharing and external links</h2>
        <p>
          We may share information with service providers that help operate the Service, professional advisers, authorities when legally required,
          and parties involved in a corporate transaction. We require service providers to handle information for authorized purposes and with appropriate safeguards.
        </p>
        <p>
          When you select a provider link, your browser connects directly to that provider&apos;s site. The provider may collect information independently,
          including through its own cookies, account flow, and console. Review that provider&apos;s privacy notice before submitting any information or provisioning resources.
        </p>
      </section>

      <section>
        <h2>5. International transfers and security</h2>
        <p>
          Information may be processed in countries other than the one in which you reside. Where required, we use a lawful transfer mechanism and supplementary safeguards appropriate to the transfer.
          We use administrative, technical, and organizational measures designed to protect information; however, no internet service or transmission can be guaranteed completely secure.
        </p>
      </section>

      <section>
        <h2>6. Retention</h2>
        <p>
          We retain information only for as long as reasonably necessary for the purposes described in this notice, including security, dispute resolution,
          recordkeeping, and legal-compliance needs. Retention periods vary by record type, sensitivity, and legal requirement. When information is no longer required,
          we delete, de-identify, or securely archive it in accordance with our retention controls.
        </p>
      </section>

      <section>
        <h2>7. Your privacy choices and rights</h2>
        <p>
          Depending on your location and applicable law, you may have rights to request access, correction, deletion, portability, restriction, objection,
          or withdrawal of consent. You may also have the right to complain to a relevant data-protection authority. We may need to verify your identity and may retain limited information to document or resolve your request.
        </p>
        <p>
          To make a request, email <a href="mailto:privacy@hyperrouter.com">privacy@hyperrouter.com</a> with the subject line “Privacy Request.”
          We will respond in accordance with applicable law.
        </p>
      </section>

      <section>
        <h2>8. Changes and contact</h2>
        <p>
          We may update this notice when our processing, Service, or legal obligations change. The revision date above identifies the latest version.
          For privacy questions, email <a href="mailto:privacy@hyperrouter.com">privacy@hyperrouter.com</a>. For provider or service-use rules, see our <Link href="/terms">Terms of Service</Link>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
