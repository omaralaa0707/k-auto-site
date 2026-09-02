import type { KAutoContent } from "./schema-ext";
import { PROFILE, SINCE } from "./media";

export const en: KAutoContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "K.auto",
    shortName: "K",
    // Their own line, in their own punctuation.
    tagline: "for unique cars",
  },

  nav: [
    { label: "The roster", href: "#roster" },
    { label: "On the dais", href: "#floor" },
    { label: "The room", href: "#room" },
  ],

  hero: {
    eyebrow: "Sheikh Zayed · two addresses",
    headline: "Four decades of unique",
    sub: "K.auto have been selling cars since 1985 — the oldest business in this series by a decade — and they display them on a turning dais under a domed ceiling. What counts as a unique car has moved a long way in that time.",
    primaryCta: "Call the showroom",
    secondaryCta: "See the roster",
    sinceLabel: "Since",
    yearsLabel: "Years trading",
    ownerLabel: "By",
    rotundaAlt: "K.auto's circular showroom dais under its domed ceiling, with their cars standing on it.",
    rotundaHint: "Move across the plate to push it.",
  },

  about: {
    heading: "K.auto",
    body: [
      "A showroom at Waslet Dahshour beside Cairo University, and a second at Beverly Hills. Run by Mahmoud Kosba, and — as they write on every post — since 1985.",
    ],
  },

  services: { heading: "On the dais", items: [] },
  gallery: { heading: "On the dais", items: [] },

  roster: {
    eyebrow: "What they carry",
    heading: "Lamborghini, Lotus, and a phone company",
    intro:
      "Their story highlights read as an ordinary luxury roster until you get to the end of it. Mercedes, Porsche, BMW, Audi, Lamborghini, Lotus, Toyota — and then Xiaomi, which makes phones, and Polaris, which makes side-by-sides and does not make cars at all.",
    note: "The names and their order are K.auto's. The note on what each company builds is this page's, not theirs.",
    ringLabel: "Names in their highlights",
    kinds: {
      car: "Cars",
      electronics: "Consumer electronics, now building cars",
      offroad: "Off-road vehicles, not cars",
    },
  },

  floor: {
    eyebrow: "On the dais",
    heading: "What is standing on the plate",
    intro:
      "Two cars from their recent posts, photographed on the turning floor. Every line under the BMW is theirs, in the order they wrote it.",
    specLabels: {
      model: "Model",
      mileage: "Mileage",
      exterior: "Exterior",
      interior: "Interior",
      supply: "Supply",
      engine: "Engine",
      power: "Power",
      protection: "Protection",
    },
    theirSpec: "Their listing",
    noSpec: "Announced with a photograph and a line, and no written specification.",
    viewPost: "See the post",
    positionLabel: "{n} / {total}",
    notes: {
      "bmw-x5": "Local agency supply, and they note it is fully protected — both facts they chose to publish.",
      "land-cruiser": "Announced as the king of the road, with no figures attached.",
    },
  },

  room: {
    eyebrow: "The room",
    heading: "A circle under a dome",
    body: [
      "The showroom is built around a round dais with a cove light running the rim and a domed ceiling above it. Cars are placed on the plate rather than parked in a row, which is why every photograph of theirs is taken from the same few angles around a circle.",
      "It is the only room in this series that turns, and it is what the piece at the top of this page is a model of.",
    ],
    stillAlt: "The circular dais and domed ceiling of K.auto's showroom, with a BMW X5 standing on it.",
    creativeNote:
      "Half of K.auto's recent feed is designed campaign artwork with type set into it — an underwater scene, a Mawlid greeting, a night composite. None of it is reproduced here; only the frames that are photographs of the room.",
    followersLabel: "Followers",
    postsLabel: "Posts",
    branchesLabel: "Addresses",
    cta: "Open in Maps",
    instagramCta: "Instagram",
  },

  contact: {
    heading: "Visit",
    addressLabel: "Addresses",
    address: PROFILE.addresses[0],
    phoneLabel: "Call",
    phones: [...PROFILE.phones],
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call the showroom",
  },

  footer: {
    disclaimer:
      "A concept design, built as a demonstration. Not an official K.auto site, and not affiliated with them. All photography, marks and quoted copy belong to K.auto.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};

export const SINCE_YEAR = SINCE;
