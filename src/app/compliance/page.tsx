import { ExternalLink } from 'lucide-react';
import { LegalPageLayout } from '@/components/legal-page-layout';

export const metadata = {
  title: 'Trade Compliance Notice — HyperRouter',
  description: 'Risk-based sanctions and export-control notice for HyperRouter.',
};

export default function CompliancePage() {
  return (
    <LegalPageLayout
      kind="compliance"
      eyebrow="Legal / Trade compliance"
      title="Trade Compliance Notice"
      summary="HyperRouter applies risk-based controls to protect its aggregation SaaS from sanctions, export-control, and abuse risks. This notice does not determine whether a transaction is legally permitted."
      updatedAt="August 23, 2026"
    >
      <section>
        <h2>1. Our role and risk-based controls</h2>
        <p>
          HyperRouter is an independent GPU computing aggregation SaaS. It does not own, operate, or provision underlying GPU infrastructure,
          and it does not make a legal determination for a third-party provider. We may nevertheless apply proportionate controls to access,
          accounts, outbound referrals, and paid features where we identify sanctions, export-control, fraud, or security risk.
        </p>
        <p>
          Controls may include risk-based geographic signals, screening of relevant counterparties where appropriate, device or network abuse signals,
          restrictions on access, record preservation, escalation, and cooperation with valid legal process. We do not publish a static list of permitted or prohibited locations because legal restrictions and risk assessments change.
        </p>
      </section>

      <section>
        <h2>2. Your responsibilities</h2>
        <p>By using the Service, you represent and agree that you will not:</p>
        <ul>
          <li>use the Service in violation of applicable economic sanctions, export controls, anti-money-laundering rules, or anti-circumvention laws;</li>
          <li>provide access to a sanctioned, restricted, or prohibited party, end user, end use, destination, or organization;</li>
          <li>misrepresent your location, identity, ownership, end user, intended use, or affiliation; or</li>
          <li>use the Service to identify, procure, or route resources for a prohibited military, proliferation, surveillance, cyber, or other restricted end use.</li>
        </ul>
        <p>
          You remain responsible for evaluating the laws applicable to your organization, users, intended workload, selected provider, origin of technology,
          and destination. Provider-specific restrictions may be stricter than HyperRouter&apos;s controls.
        </p>
      </section>

      <section>
        <h2>3. GPU compute and export controls</h2>
        <p>
          Certain advanced computing items, software, technology, cloud services, and end uses may be subject to export-control restrictions.
          Whether a particular transaction is controlled depends on facts including the item, provider, origin, destination, end user, and end use.
          You must obtain qualified legal advice and any required authorization before proceeding where a risk indicator exists.
        </p>
        <div className="legal-callout">
          <strong>No safe-harbor representation.</strong> A listing in HyperRouter, a successful search, or an available outbound link does not mean a transaction is permitted,
          licensed, or approved by HyperRouter, a provider, or a government authority.
        </div>
      </section>

      <section>
        <h2>4. Enforcement and reporting</h2>
        <p>
          We may delay, decline, restrict, suspend, or terminate access where we reasonably believe activity presents a legal, security, or abuse risk.
          We may request information reasonably necessary to assess risk, but are not required to complete an assessment or provide a reason where doing so could compromise security or legal obligations.
        </p>
        <p>
          To report a potential issue, contact <a href="mailto:compliance@hyperrouter.com">compliance@hyperrouter.com</a>.
          Do not include sensitive credentials, regulated data, or confidential workload content in an unencrypted email.
        </p>
      </section>

      <section>
        <h2>5. Reference resources</h2>
        <p>These public resources are provided for orientation only and are not legal advice:</p>
        <ul>
          <li><a href="https://ofac.treasury.gov/" target="_blank" rel="noopener noreferrer">U.S. Treasury OFAC sanctions programs <ExternalLink className="inline ml-1" size={12} /></a></li>
          <li><a href="https://www.bis.gov/regulations/ear" target="_blank" rel="noopener noreferrer">U.S. Bureau of Industry and Security — Export Administration Regulations <ExternalLink className="inline ml-1" size={12} /></a></li>
          <li><a href="https://ofac.treasury.gov/system/files/126/framework_ofac_cc.pdf" target="_blank" rel="noopener noreferrer">OFAC Framework for Compliance Commitments <ExternalLink className="inline ml-1" size={12} /></a></li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}
