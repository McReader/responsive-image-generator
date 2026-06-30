import type {Metadata} from "next";

export type RichTextSegment = string | { bold: string } | { text: string; href: string };

export type RichText = RichTextSegment[];

export type LegalBlock =
  | { type: "paragraph"; content: RichText }
  | { type: "list"; items: RichText[] }
  | { type: "subheading"; text: string }
  | { type: "fields"; items: { label: string; value: RichText }[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalPageContent = {
  title: string;
  lastUpdated: string;
  intro: RichText[];
  sections: LegalSection[];
};

export type LegalPageEntry = {
  slug: string;
  content: LegalPageContent;
  metadata: Metadata;
};
