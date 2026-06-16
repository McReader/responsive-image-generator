import {hubContent, hubMetadata} from "@/content/hub";
import {landingPages} from "@/content/landing";
import {HubPage} from "@/layouts/HubPage";
import type {Metadata} from "next";

export const metadata: Metadata = hubMetadata;

export default function Home() {
  return <HubPage content={hubContent} landingPages={landingPages} />;
}
