import type {LandingPageEntry} from "@/layouts/LandingPage/types";
import {
  responsiveImageGeneratorContent,
} from "./responsive-image-generator";

export const landingPages: LandingPageEntry[] = [
  {
    slug: "responsive-image-generator",
    tags: ["srcset", "responsive", "WebP"],
    content: responsiveImageGeneratorContent,
  },
];
