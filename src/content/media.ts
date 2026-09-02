/**
 * K.auto have been trading since 1985 — forty years, and the oldest business
 * in this series by a decade. Two things make them themselves.
 *
 * The first is the room: a circular dais under a domed ceiling with a cove
 * light running round it, and the cars displayed on the turning floor. That
 * rotunda is what the signature piece is built from.
 *
 * The second is the marque list in their highlights, which is unlike anyone
 * else's here: Lamborghini and Lotus and Porsche next to Xiaomi, a phone
 * manufacturer, and Polaris, which does not make cars at all. Forty years of
 * "unique cars" has ended up meaning something very wide.
 *
 * Half their feed is designed campaign artwork with the type set into it —
 * an underwater meme scene, a Mawlid greeting, a night composite. None of it
 * is reproduced here; only the six frames that are photographs of the room.
 */

export type CarId = "bmw-x5" | "land-cruiser";

export type Car = {
  id: CarId;
  marque: string;
  model: string;
  /** Their spec lines, verbatim and in their order. */
  spec: { label: string; value: string }[];
  frames: string[];
  postUrl: string;
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;

export const CARS: Car[] = [
  {
    id: "bmw-x5",
    marque: "BMW",
    model: "X5 M60i",
    spec: [
      { label: "model", value: "2024" },
      { label: "mileage", value: "8,000 km" },
      { label: "exterior", value: "Dark blue" },
      { label: "interior", value: "Brown" },
      { label: "supply", value: "Local Agency" },
      { label: "engine", value: "4.4L V8" },
      { label: "power", value: "530 HP" },
      { label: "protection", value: "Fully Protected" },
    ],
    frames: ["/media/bmw-x5-01.jpg", "/media/bmw-x5-02.jpg", "/media/bmw-x5-03.jpg"],
    postUrl: post("DbtANgADXAP"),
  },
  {
    id: "land-cruiser",
    marque: "Toyota",
    model: "Land Cruiser VXR",
    spec: [],
    frames: [
      "/media/land-cruiser-01.jpg",
      "/media/land-cruiser-02.jpg",
      "/media/land-cruiser-03.jpg",
    ],
    postUrl: post("Dbn2s27DixA"),
  },
];

/**
 * Their story highlights, in their order. `kind` is this page's note on what
 * each company actually builds — Xiaomi makes phones and Polaris makes
 * side-by-sides — and the copy says the grouping is ours, not theirs.
 */
export const MARQUES: { name: string; kind: "car" | "electronics" | "offroad" }[] = [
  { name: "Mercedes", kind: "car" },
  { name: "Xiaomi", kind: "electronics" },
  { name: "Porsche", kind: "car" },
  { name: "BMW", kind: "car" },
  { name: "Lotus", kind: "car" },
  { name: "Audi", kind: "car" },
  { name: "Polaris", kind: "offroad" },
  { name: "Toyota", kind: "car" },
  { name: "Lamborghini", kind: "car" },
];

export const ROTUNDA_FRAME = "/media/rotunda.jpg";
/** The frames that stand on the dais in the signature piece. */
export const DAIS_FRAMES = [
  "/media/bmw-x5-01.jpg",
  "/media/bmw-x5-02.jpg",
  "/media/bmw-x5-03.jpg",
  "/media/land-cruiser-01.jpg",
  "/media/land-cruiser-02.jpg",
  "/media/land-cruiser-03.jpg",
];

export const SINCE = 1985;

export const PROFILE = {
  instagram: "https://www.instagram.com/kautoegy/",
  facebook: "https://www.facebook.com/p/K-auto-100090894047620/",
  maps: "https://maps.app.goo.gl/YxMdqmahUQB4cmWa8",
  phones: ["01113385553", "01117581599"],
  phoneHref: "tel:+201113385553",
  owner: "Mahmoud Kosba",
  ownerAr: "محمود قصبة",
  addresses: [
    "Waslet Dahshour — beside Cairo University, Jumeirah Plaza Walk",
    "Beverly Hills Gate 8, 9 — Mall 23",
  ],
  addressesAr: [
    "وصلة دهشور — بجوار جامعة القاهرة، جميرة بلازا ووك",
    "بفرلي هيلز بوابة ٨ و٩ — مول ٢٣",
  ],
  followers: "22K",
  posts: "934",
} as const;
