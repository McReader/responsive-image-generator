import {LandingPage} from "@/layouts/LandingPage";
import {
  responsiveImageGeneratorContent,
  responsiveImageGeneratorMetadata,
} from "@/content/landing/responsive-image-generator";
import {Metadata} from "next";

export const metadata: Metadata = responsiveImageGeneratorMetadata;

export default function ResponsiveImageGeneratorPage() {
  return <LandingPage content={responsiveImageGeneratorContent} />;
}
