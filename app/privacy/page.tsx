import {privacyContent, privacyMetadata} from "@/content/legal/privacy";
import {LegalPage} from "@/layouts/LegalPage";
import type {Metadata} from "next";

export const metadata: Metadata = privacyMetadata;

export default function PrivacyPage() {
  return <LegalPage content={privacyContent} currentPath="/privacy" />;
}
