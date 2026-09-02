import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";
import type { CarId } from "./media";

/**
 * K.auto have been trading since 1985 and display their cars on a turning
 * dais under a dome. The shared schema has no vocabulary for a room like
 * that, for forty years, or for a marque list that includes a phone maker.
 */
export type KAutoContent = SiteContent & {
  hero: SiteContent["hero"] & {
    sinceLabel: string;
    yearsLabel: string;
    ownerLabel: string;
    rotundaAlt: string;
    rotundaHint: string;
  };
  roster: {
    eyebrow: string;
    heading: string;
    intro: string;
    note: string;
    /** Sits in the middle of the ring, under the count. */
    ringLabel: string;
    kinds: Record<"car" | "electronics" | "offroad", string>;
  };
  floor: {
    eyebrow: string;
    heading: string;
    intro: string;
    specLabels: Record<
      "model" | "mileage" | "exterior" | "interior" | "supply" | "engine" | "power" | "protection",
      string
    >;
    theirSpec: string;
    noSpec: string;
    viewPost: string;
    positionLabel: string;
    notes: Record<CarId, string>;
  };
  room: {
    eyebrow: string;
    heading: string;
    body: string[];
    stillAlt: string;
    creativeNote: string;
    followersLabel: string;
    postsLabel: string;
    branchesLabel: string;
    cta: string;
    instagramCta: string;
  };
};

export function useKAuto() {
  return useContent() as KAutoContent;
}
