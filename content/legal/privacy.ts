import type {LegalPageContent} from "./types";
import type {Metadata} from "next";

export const privacyContent: LegalPageContent = {
  title: "Privacy Policy",
  lastUpdated: "June 30, 2026",
  intro: [
    [
      "This privacy policy explains how Responsive Image Generator (\"we\", \"us\", or \"our\") collects, uses, and protects information when you use this website.",
    ],
    [
      "Responsive Image Generator is a browser-based tool: any images you upload are processed entirely on your device using WebAssembly and are never sent to our servers. This policy covers the limited information collected by the website itself, such as analytics data, not the images you process with the tool.",
    ],
  ],
  sections: [
    {
      id: "contact-information",
      heading: "Contact information",
      blocks: [
        {
          type: "paragraph",
          content: [
            "If you have questions about this policy or want to exercise any of the rights described below, you can reach us at:",
          ],
        },
        {
          type: "fields",
          items: [
            {
              label: "Email",
              value: [{ text: "privacy@example.com", href: "mailto:privacy@example.com" }],
            },
          ],
        },
      ],
    },
    {
      id: "types-of-data-collected",
      heading: "Types of data collected",
      blocks: [
        {
          type: "paragraph",
          content: [
            "We try to collect as little data as possible. The types of data this website may collect, directly or through third-party services, include:",
          ],
        },
        {
          type: "list",
          items: [
            ["Usage data, such as pages visited, browser type, device type, and approximate location derived from your IP address"],
            ["Trackers, such as cookies or similar technologies used by analytics providers"],
          ],
        },
        {
          type: "paragraph",
          content: [
            "We do not collect your name, email address, or any images you upload. Files you select for processing stay on your device at all times and are never transmitted to us or to any third party.",
          ],
        },
      ],
    },
    {
      id: "mode-and-place-of-processing",
      heading: "Mode and place of processing your data",
      blocks: [
        { type: "subheading", text: "Methods of processing" },
        {
          type: "paragraph",
          content: [
            "We take appropriate technical and organizational measures to prevent unauthorized access, disclosure, alteration, or destruction of data. Processing is carried out using computers and IT tools, following procedures strictly related to the purposes indicated in this document.",
          ],
        },
        { type: "subheading", text: "Place of processing" },
        {
          type: "paragraph",
          content: [
            "Data is processed where we and our third-party service providers operate. Where a provider is located outside your country (for example, the United States), data transfers rely on the appropriate safeguards offered by that provider, such as Standard Contractual Clauses.",
          ],
        },
        { type: "subheading", text: "Retention" },
        {
          type: "paragraph",
          content: [
            "Unless stated otherwise, data is kept only for as long as required for the purpose it was collected for, following the retention settings of the relevant service provider, or longer if required by law.",
          ],
        },
      ],
    },
    {
      id: "detailed-processing-information",
      heading: "Detailed information on the processing of your data",
      blocks: [
        {
          type: "paragraph",
          content: [
            "Below is a list of the third-party services that may process data on our behalf. We only add a service here once it is actually in use on this website.",
          ],
        },
        { type: "subheading", text: "Analytics" },
        {
          type: "paragraph",
          content: [
            "The service in this section allows us to monitor and analyze web traffic and understand how visitors use this website.",
          ],
        },
        { type: "subheading", text: "Google Analytics (Google LLC)" },
        {
          type: "paragraph",
          content: [
            "Google Analytics is a web analytics service provided by Google LLC (\"Google\"). Google uses the data collected to track and examine the use of this website and to prepare reports on its activity. To understand Google's use of data, consult ",
            { text: "Google's partner policy", href: "https://policies.google.com/technologies/partner-sites" },
            " and their ",
            { text: "Business data page", href: "https://business.safety.google/privacy/" },
            ".",
          ],
        },
        {
          type: "fields",
          items: [
            { label: "Personal data processed", value: ["Trackers; usage data"] },
            { label: "Place of processing", value: ["United States"] },
            {
              label: "Privacy policy",
              value: [{ text: "business.safety.google/privacy", href: "https://business.safety.google/privacy/" }],
            },
            {
              label: "Opt-out",
              value: [{ text: "Google Analytics opt-out browser add-on", href: "https://tools.google.com/dlpage/gaoptout" }],
            },
          ],
        },
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      blocks: [
        {
          type: "paragraph",
          content: ["Regardless of where you live, you can ask us to do any of the following with your data, to the extent it applies:"],
        },
        {
          type: "list",
          items: [
            [{ bold: "Withdraw your consent" }, " at any time, where processing is based on consent."],
            [{ bold: "Object" }, " to processing carried out on a legal basis other than consent."],
            [{ bold: "Access" }, " the data we hold about you and request a copy of it."],
            [{ bold: "Rectify" }, " inaccurate data and have it updated or corrected."],
            [{ bold: "Restrict" }, " how we process your data."],
            [{ bold: "Erase" }, " your data, where there is no legitimate reason for us to keep it."],
            [{ bold: "Port" }, " your data to another provider, in a structured and commonly used format."],
            [{ bold: "Lodge a complaint" }, " with your local data protection authority."],
          ],
        },
        { type: "subheading", text: "How to exercise these rights" },
        {
          type: "paragraph",
          content: [
            "Send your request using the contact details at the top of this document. Requests are free of charge and we aim to respond as early as possible, and in any case within the timeframe required by applicable law.",
          ],
        },
        {
          type: "paragraph",
          content: [
            "These rights are available to all visitors, regardless of location. If the law that applies to you — for example the GDPR (EU/EEA), the UK GDPR, the CCPA (California), the LGPD (Brazil), or the FADP (Switzerland) — grants additional rights, we honor those too; just mention your location when contacting us.",
          ],
        },
      ],
    },
    {
      id: "additional-information",
      heading: "Additional information about data collection and processing",
      blocks: [
        { type: "subheading", text: "Legal action" },
        {
          type: "paragraph",
          content: [
            "Your data may be used by us for legal purposes in court or in the stages leading to possible legal action arising from improper use of this website or the related services.",
          ],
        },
        { type: "subheading", text: "Server and hosting logs" },
        {
          type: "paragraph",
          content: [
            "For operation, security, and maintenance purposes, this website and its hosting provider may automatically collect basic technical logs (such as IP address and request timestamps), separate from the analytics service described above.",
          ],
        },
        { type: "subheading", text: "Changes to this privacy policy" },
        {
          type: "paragraph",
          content: [
            "We may update this privacy policy from time to time by posting a new version on this page. We recommend checking this page periodically, referring to the \"Last updated\" date at the top. If a change affects processing based on your consent, we will ask for your consent again where required by law.",
          ],
        },
      ],
    },
    {
      id: "definitions",
      heading: "Definitions and legal references",
      blocks: [
        {
          type: "fields",
          items: [
            {
              label: "Personal data",
              value: [
                "Any information that, directly or indirectly, allows for the identification of a natural person.",
              ],
            },
            {
              label: "Usage data",
              value: [
                "Information automatically collected through this website or third-party services, such as IP address, browser type, device type, pages visited, and time spent on each page.",
              ],
            },
            {
              label: "This website",
              value: ["Responsive Image Generator, the means by which your data is collected and processed."],
            },
            {
              label: "Cookie",
              value: ["A tracker consisting of a small set of data stored in your browser."],
            },
            {
              label: "Tracker",
              value: [
                "Any technology — e.g. cookies, unique identifiers, or embedded scripts — that enables tracking, for example by accessing or storing information on your device.",
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const privacyMetadata: Metadata = {
  title: "Privacy Policy | Responsive Image Generator",
  description:
    "Learn what data Responsive Image Generator collects, why, and the rights you have. Images you process with the tool never leave your device.",
};
