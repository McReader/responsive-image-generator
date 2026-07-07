import Link from "next/link";
import type {Metadata} from "next";
import {siteName} from "@/content/site";
import {
  LegalDocumentShell,
  LegalSection,
  legalBodyText,
  legalLinkClass,
} from "@/layouts/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Responsive Image Generator",
  description:
    "Terms for using Responsive Image Generator: a free, browser-based image tool. Your files stay on your device.",
};

const toc = [
  { id: "agreement", heading: "Agreement to these terms" },
  { id: "the-service", heading: "The service" },
  { id: "your-content", heading: "Your content and responsibility" },
  { id: "acceptable-use", heading: "Acceptable use" },
  { id: "intellectual-property", heading: "Intellectual property" },
  { id: "third-party-services", heading: "Third-party services" },
  { id: "disclaimers", heading: "Disclaimers and limitation of liability" },
  { id: "changes", heading: "Changes to these terms" },
  { id: "contact", heading: "Contact" },
] as const;

export default function TermsPage() {
  return (
    <LegalDocumentShell
      title="Terms of Service"
      lastUpdated="July 7, 2026"
      currentPath="/terms"
      toc={[...toc]}
      intro={
        <>
          <p className={legalBodyText}>
            These terms govern your use of {siteName} (the &ldquo;website&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing
            or using the website, you agree to these terms. If you do not agree, do
            not use the website.
          </p>
          <p className={legalBodyText}>
            For information about how we handle personal data, see our{" "}
            <Link href="/privacy" className={legalLinkClass}>
              Privacy Policy
            </Link>
            .
          </p>
        </>
      }
    >
      <LegalSection id="agreement" heading="Agreement to these terms">
        <p className={legalBodyText}>
          You must be able to form a binding contract to use this website. If you
          are using the website on behalf of an organization, you represent that you
          have authority to bind that organization to these terms.
        </p>
        <p className={legalBodyText}>
          We may update these terms from time to time. The &ldquo;Last updated&rdquo;
          date at the top of this page shows when they were last revised. Continued
          use after changes are posted constitutes acceptance of the updated terms,
          to the extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection id="the-service" heading="The service">
        <p className={legalBodyText}>
          {siteName} provides free, browser-based tools for resizing, converting,
          and generating responsive image markup. The tools run entirely in your
          web browser using WebAssembly. We do not operate a server-side image
          processing service as part of the core product.
        </p>
        <p className={legalBodyText}>
          The website is provided on an &ldquo;as available&rdquo; basis. We may
          modify, suspend, or discontinue any part of the website at any time
          without notice. We do not guarantee uninterrupted access, compatibility
          with every browser or device, or that output will meet your specific
          requirements.
        </p>
        <p className={legalBodyText}>
          You do not need an account to use the image tools. Optional features such
          as analytics or supporting the project through external links are
          described in our Privacy Policy and in the relevant sections below.
        </p>
      </LegalSection>

      <LegalSection id="your-content" heading="Your content and responsibility">
        <p className={legalBodyText}>
          You retain all rights to the images and other files you select for
          processing. We do not claim ownership of your content. Under normal
          operation, files you upload for processing are handled on your device
          and are not transmitted to our servers.
        </p>
        <p className={legalBodyText}>
          You are solely responsible for:
        </p>
        <ul
          className={`${legalBodyText} list-disc space-y-2 pl-5 marker:text-zinc-300 dark:marker:text-zinc-600`}
        >
          <li>ensuring you have the right to use, process, and distribute any images you upload;</li>
          <li>complying with applicable copyright, privacy, and other laws;</li>
          <li>reviewing output files and HTML snippets before using them in production;</li>
          <li>backing up your original files and exported results.</li>
        </ul>
        <p className={legalBodyText}>
          We do not review, monitor, or store the images you process. We cannot
          recover lost files or undo processing you perform in your browser.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" heading="Acceptable use">
        <p className={legalBodyText}>
          You agree not to use the website:
        </p>
        <ul
          className={`${legalBodyText} list-disc space-y-2 pl-5 marker:text-zinc-300 dark:marker:text-zinc-600`}
        >
          <li>in any way that violates applicable law or regulation;</li>
          <li>to process unlawful, infringing, or harmful content;</li>
          <li>to attempt to gain unauthorized access to our systems or interfere with the website&apos;s operation;</li>
          <li>to scrape, overload, or automate access in a way that degrades the service for others;</li>
          <li>to misrepresent your affiliation with us or imply endorsement without permission.</li>
        </ul>
        <p className={legalBodyText}>
          We may restrict or block access if we reasonably believe these terms have
          been violated, without limiting any other remedies available to us.
        </p>
      </LegalSection>

      <LegalSection id="intellectual-property" heading="Intellectual property">
        <p className={legalBodyText}>
          The website, including its design, code, branding, and documentation
          (excluding your content), is owned by us or our licensors and is
          protected by applicable intellectual property laws. These terms do not
          grant you any right to use our trademarks, logos, or branding except as
          needed to use the website in the ordinary course.
        </p>
        <p className={legalBodyText}>
          HTML snippets and file naming patterns generated by the tools are
          provided for your use in your own projects. You may use generated output
          freely, subject to your own rights in the underlying images and any
          third-party licenses that apply to them.
        </p>
      </LegalSection>

      <LegalSection id="third-party-services" heading="Third-party services">
        <p className={legalBodyText}>
          The website may link to or integrate with third-party services. For
          example:
        </p>
        <ul
          className={`${legalBodyText} list-disc space-y-2 pl-5 marker:text-zinc-300 dark:marker:text-zinc-600`}
        >
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
              Google Analytics
            </strong>
            , if enabled and only after you accept analytics cookies, as described
            in our Privacy Policy;
          </li>
          <li>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
              Buy Me a Coffee
            </strong>
            , an optional external link if you choose to support the project —
            payment and account data are handled entirely on their platform.
          </li>
        </ul>
        <p className={legalBodyText}>
          Third-party services are governed by their own terms and privacy
          policies. We are not responsible for third-party websites, services, or
          content. Your use of those services is at your own risk.
        </p>
      </LegalSection>

      <LegalSection id="disclaimers" heading="Disclaimers and limitation of liability">
        <p className={legalBodyText}>
          To the fullest extent permitted by law, the website and all tools are
          provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
          warranties of any kind, whether express, implied, or statutory,
          including implied warranties of merchantability, fitness for a particular
          purpose, and non-infringement.
        </p>
        <p className={legalBodyText}>
          We do not warrant that output images will be error-free, optimally
          compressed, or suitable for any specific use case. Image encoding
          quality, file size, and browser support may vary.
        </p>
        <p className={legalBodyText}>
          To the fullest extent permitted by law, we will not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          any loss of profits, data, or goodwill, arising from your use of the
          website. Our total liability for any claim relating to the website will
          not exceed the greater of (a) the amount you paid us to use the website
          in the twelve months before the claim, or (b) zero, since the core tools
          are provided free of charge.
        </p>
        <p className={legalBodyText}>
          Some jurisdictions do not allow certain disclaimers or limitations. In
          those cases, our liability is limited to the maximum extent permitted by
          applicable law.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="Changes to these terms">
        <p className={legalBodyText}>
          We may revise these terms when the website changes, when legal
          requirements change, or for other operational reasons. We will post the
          updated version on this page and update the &ldquo;Last updated&rdquo;
          date. We encourage you to review this page periodically.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="Contact">
        <p className={legalBodyText}>
          If you have questions about these terms, contact us at{" "}
          <a href="mailto:privacy@example.com" className={legalLinkClass}>
            privacy@example.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocumentShell>
  );
}
