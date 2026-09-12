"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useKAuto } from "@/content/schema-ext";
import {
  CARS,
  DAIS_FRAMES,
  MARQUES,
  PROFILE,
  ROTUNDA_FRAME,
  SINCE,
  type Car,
} from "@/content/media";
import { Rotunda } from "@/components/webgl/rotunda";

const YEARS = new Date().getFullYear() - SINCE;

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-6% 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--round-delay": `${d}ms` }) as CSSProperties;

/**
 * This site's arrival: the round.
 *
 * Nothing arrives in a rotunda — a car on a turning plate is simply not facing
 * you, and then it is. So this is a long plain dissolve with no travel at all,
 * which is the one arrival no other site in this set uses.
 */
function Round({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  // A polymorphic tag's prop union is too wide for TS to resolve on its own.
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-round="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

/** The cove light, as a section ornament. It turns whether or not you look. */
function RimArc({ className, slow = false }: { className?: string; slow?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`${slow ? "rim-slow" : "rim"} ${className ?? ""}`}
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="var(--color-cove)"
        strokeWidth="1.6"
        strokeDasharray="72 217"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-dome-3)" strokeWidth="0.6" />
    </svg>
  );
}

function SectionHead({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div className="relative">
      <RimArc className="pointer-events-none absolute -top-9 start-[-2.6rem] hidden h-24 w-24 opacity-70 lg:block" />
      <Round className="label text-cove-ink" delay={0}>
        {eyebrow}
      </Round>
      <Round
        as="h2"
        className="text-display font-display mt-3 max-w-[22ch] text-wall"
        delay={90}
      >
        {heading}
      </Round>
      {intro ? (
        <Round className="text-lead mt-5 max-w-[62ch] leading-[1.75] text-wall-2" delay={180}>
          {intro}
        </Round>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useKAuto();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-wall/10 bg-dome/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[84rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="latin font-display text-[1.06rem] leading-none text-wall">K.auto</span>
        </a>

        <nav className="ms-auto hidden items-center gap-7 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-[0.86rem] text-wall-2 transition-colors hover:text-wall"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="latin tnum ms-auto shrink-0 text-[0.88rem] font-medium text-cove-ink transition-opacity hover:opacity-75 md:ms-0"
        >
          {PROFILE.phones[0]}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 rounded-full border border-wall/25 px-3.5 py-1.5 text-[0.72rem] text-wall-2 transition-colors hover:border-cove-ink hover:text-wall"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero -- */

function Hero() {
  const c = useKAuto();
  const { locale } = useLocale();

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* The dome light: a soft warm wash from the top of the frame, which is
          where the cove light sits in every photograph of theirs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem]"
        style={{
          background:
            "radial-gradient(64% 48% at 62% 2%, rgba(185,144,101,0.32), rgba(228,219,217,0) 72%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[84rem] items-center gap-10 px-5 pt-12 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12 lg:pt-16">
        <div className="order-2 lg:order-1">
          <Round className="label text-cove-ink">{c.hero.eyebrow}</Round>
          <Round as="h1" className="text-hero font-display mt-4 max-w-[13ch] text-wall" delay={110}>
            {c.hero.headline}
          </Round>
          <Round className="text-lead mt-6 max-w-[46ch] leading-[1.8] text-wall-2" delay={220}>
            {c.hero.sub}
          </Round>

          <Round className="mt-9 flex flex-wrap items-center gap-3" delay={320}>
            <a
              href={PROFILE.phoneHref}
              className="rounded-full bg-wall px-6 py-3 text-[0.9rem] text-dome transition-opacity hover:opacity-85"
            >
              {c.hero.primaryCta}
            </a>
            <a
              href="#roster"
              className="rounded-full border border-wall/30 px-6 py-3 text-[0.9rem] text-wall transition-colors hover:border-cove-ink hover:text-cove-ink"
            >
              {c.hero.secondaryCta}
            </a>
          </Round>
        </div>

        {/* The room, rebuilt: their dais seen from above, turning. */}
        <div className="order-1 lg:order-2">
          <Round className="relative" delay={60}>
            <Rotunda
              frames={DAIS_FRAMES}
              still={ROTUNDA_FRAME}
              alt={c.hero.rotundaAlt}
              className="h-[19rem] w-full sm:h-[25rem] lg:h-[33rem]"
            />
            <p className="fine mt-1 text-center text-wall-2">{c.hero.rotundaHint}</p>
          </Round>
        </div>
      </div>

      <div className="relative mx-auto max-w-[84rem] px-5 pb-20 sm:px-8">
        <Round className="grid gap-px border-t border-wall/15 pt-px sm:grid-cols-3" delay={120}>
          {[
            { k: c.hero.sinceLabel, v: String(SINCE), latin: true },
            { k: c.hero.yearsLabel, v: String(YEARS), latin: true },
            {
              k: c.hero.ownerLabel,
              v: locale === "ar" ? PROFILE.ownerAr : PROFILE.owner,
              latin: false,
            },
          ].map((s) => (
            <div key={s.k} className="pt-6">
              <div className="label text-wall-2">{s.k}</div>
              <div
                className={`font-display mt-2 text-[1.9rem] leading-none text-wall ${s.latin ? "latin tnum" : ""}`}
              >
                {s.v}
              </div>
            </div>
          ))}
        </Round>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- roster -- */

/**
 * Their nine story highlights, laid out on a ring — because that is how the
 * cars themselves are laid out, and because the list only makes sense read as
 * a circle you go round rather than a ranking.
 */
function Roster() {
  const c = useKAuto();
  const R = 40; // % of the container, from centre

  return (
    <section id="roster" className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8 sm:py-32">
      <SectionHead eyebrow={c.roster.eyebrow} heading={c.roster.heading} intro={c.roster.intro} />

      {/* The ring. Nine names at 40° apart on a 40rem plate. */}
      <Round className="relative mx-auto mt-14 hidden aspect-square w-full max-w-[33rem] md:block" delay={120}>
        <RimArc className="absolute inset-[3%] h-[94%] w-[94%] opacity-55" slow />
        <div className="absolute inset-[20%] rounded-full border border-dome-3/70 bg-dome-2/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-[11rem] text-center">
            <div className="font-display latin tnum text-[3rem] leading-none text-wall">
              {MARQUES.length}
            </div>
            <div className="label mt-2 leading-snug text-wall-2">{c.roster.ringLabel}</div>
          </div>
        </div>

        {MARQUES.map((m, i) => {
          const a = (-90 + i * (360 / MARQUES.length)) * (Math.PI / 180);
          const isCar = m.kind === "car";
          return (
            <div
              key={m.name}
              className="absolute w-[9rem] -translate-x-1/2 -translate-y-1/2 text-center"
              style={{
                left: `${50 + Math.cos(a) * R}%`,
                top: `${50 + Math.sin(a) * R}%`,
              }}
            >
              <div
                className={`latin font-display text-[1.16rem] leading-tight ${isCar ? "text-wall" : "text-signal"}`}
              >
                {m.name}
              </div>
              {!isCar ? (
                <div className="fine mt-1 text-signal">
                  {c.roster.kinds[m.kind]}
                </div>
              ) : null}
            </div>
          );
        })}
      </Round>

      {/* Below the ring's breakpoint the circle stops being readable, so the
          same list is set plainly. */}
      <Round className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 md:hidden" delay={120}>
        {MARQUES.map((m) => {
          const isCar = m.kind === "car";
          return (
            <div key={m.name} className="border-t border-wall/15 pt-3">
              <div
                className={`latin font-display text-[1.06rem] ${isCar ? "text-wall" : "text-signal"}`}
              >
                {m.name}
              </div>
              <div className={`fine mt-1 ${isCar ? "text-wall-2" : "text-signal"}`}>
                {c.roster.kinds[m.kind]}
              </div>
            </div>
          );
        })}
      </Round>

      <Round className="fine mx-auto mt-14 max-w-[58ch] border-t border-wall/15 pt-5 text-wall-2" delay={220}>
        {c.roster.note}
      </Round>
    </section>
  );
}

/* ----------------------------------------------------------------- floor -- */

function CarBlock({ car, index }: { car: Car; index: number }) {
  const c = useKAuto();
  const [frame, setFrame] = useState(0);
  const src = car.frames[Math.min(frame, car.frames.length - 1)];

  return (
    <article className="grid gap-10 border-t border-wall/15 pt-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      <div>
        <Round className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-dome-2">
          <img
            src={src}
            alt={`${car.marque} ${car.model}, ${c.floor.heading}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-3 end-3 rounded-full bg-wall/80 px-3 py-1 text-[0.68rem] text-dome">
            <span className="latin tnum">
              {c.floor.positionLabel
                .replace("{n}", String(frame + 1))
                .replace("{total}", String(car.frames.length))}
            </span>
          </div>
        </Round>

        <Round className="mt-3 flex gap-3" delay={80}>
          {car.frames.map((f, i) => (
            <button
              key={f}
              onClick={() => setFrame(i)}
              aria-label={`${car.marque} ${car.model} ${i + 1}`}
              aria-pressed={i === frame}
              className={`h-16 w-24 overflow-hidden rounded-lg border transition-colors ${
                i === frame ? "border-cove-ink" : "border-transparent hover:border-dome-3"
              }`}
            >
              <img src={f} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </Round>
      </div>

      <div>
        <Round className="label text-cove-ink">
          <span className="latin">{car.marque}</span>
        </Round>
        <Round as="h3" className="font-display mt-2 text-[1.9rem] leading-tight text-wall" delay={70}>
          <span className="latin">{car.model}</span>
        </Round>

        {car.spec.length > 0 ? (
          <>
            <Round className="label mt-7 text-wall-2" delay={130}>
              {c.floor.theirSpec}
            </Round>
            <Round as="dl" className="mt-3 border-t border-wall/15" delay={190}>
              {car.spec.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-6 border-b border-wall/10 py-2.5"
                >
                  <dt className="text-[0.82rem] text-wall-2">
                    {c.floor.specLabels[s.label as keyof typeof c.floor.specLabels]}
                  </dt>
                  <dd className="latin tnum text-[0.94rem] text-wall">{s.value}</dd>
                </div>
              ))}
            </Round>
          </>
        ) : (
          <Round className="mt-7 rounded-2xl border border-dashed border-wall/25 p-5 text-[0.88rem] leading-relaxed text-wall-2" delay={130}>
            {c.floor.noSpec}
          </Round>
        )}

        <Round className="mt-6 text-[0.86rem] leading-relaxed text-wall-2" delay={250}>
          {c.floor.notes[car.id]}
        </Round>

        <Round className="mt-5" delay={310}>
          <a
            href={car.postUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[0.84rem] text-cove-ink underline decoration-cove/70 underline-offset-4 transition-colors hover:text-wall"
          >
            {c.floor.viewPost}
          </a>
        </Round>

        <div aria-hidden="true" className="label mt-8 text-dome-3">
          <span className="latin tnum">{String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </article>
  );
}

function Floor() {
  const c = useKAuto();

  return (
    <section id="floor" className="bg-dome-2/60 py-24 sm:py-32">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <SectionHead eyebrow={c.floor.eyebrow} heading={c.floor.heading} intro={c.floor.intro} />
        <div className="mt-16 space-y-16">
          {CARS.map((car, i) => (
            <CarBlock key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ room -- */

function Room() {
  const c = useKAuto();

  return (
    <section id="room" className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8 sm:py-32">
      <SectionHead eyebrow={c.room.eyebrow} heading={c.room.heading} />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Round className="overflow-hidden rounded-[1.6rem] bg-dome-2">
          <img
            src={ROTUNDA_FRAME}
            alt={c.room.stillAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </Round>

        <div>
          {c.room.body.map((p, i) => (
            <Round
              key={p.slice(0, 24)}
              className="text-lead mb-5 leading-[1.85] text-wall-2"
              delay={i * 90}
            >
              {p}
            </Round>
          ))}

          <Round className="mt-8 grid grid-cols-3 gap-px border-t border-wall/15" delay={220}>
            {[
              { k: c.room.followersLabel, v: PROFILE.followers },
              { k: c.room.postsLabel, v: PROFILE.posts },
              { k: c.room.branchesLabel, v: String(PROFILE.addresses.length) },
            ].map((s) => (
              <div key={s.k} className="pt-5">
                <div className="font-display latin tnum text-[1.6rem] leading-none text-wall">
                  {s.v}
                </div>
                <div className="label mt-2 text-wall-2">{s.k}</div>
              </div>
            ))}
          </Round>

          <Round className="fine mt-9 border-s-2 border-cove ps-4 text-wall-2" delay={300}>
            {c.room.creativeNote}
          </Round>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- contact -- */

function Contact() {
  const c = useKAuto();
  const { locale } = useLocale();
  const addresses = locale === "ar" ? PROFILE.addressesAr : PROFILE.addresses;

  return (
    <section id="contact" className="bg-wall py-24 text-dome sm:py-28">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <Round as="h2" className="text-display font-display max-w-[18ch]">
          {c.contact.heading}
        </Round>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Round delay={60}>
            <div className="label text-cove">{c.contact.addressLabel}</div>
            <ul className="mt-3 space-y-3 text-[0.92rem] leading-relaxed text-dome/85">
              {addresses.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Round>

          <Round delay={130}>
            <div className="label text-cove">{c.contact.phoneLabel}</div>
            <ul className="mt-3 space-y-2">
              {c.contact.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:+2${p}`}
                    className="latin tnum text-[0.98rem] text-dome transition-opacity hover:opacity-75"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </Round>

          <Round delay={200}>
            <div className="label text-cove">K.auto</div>
            <div className="mt-3 flex flex-col gap-2 text-[0.92rem]">
              <a
                href={c.contact.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-dome/85 underline decoration-cove/60 underline-offset-4 transition-colors hover:text-dome"
              >
                {c.room.cta}
              </a>
              <a
                href={c.contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-dome/85 underline decoration-cove/60 underline-offset-4 transition-colors hover:text-dome"
              >
                {c.room.instagramCta}
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-dome/85 underline decoration-cove/60 underline-offset-4 transition-colors hover:text-dome"
              >
                Facebook
              </a>
            </div>
          </Round>

          <Round delay={270}>
            <a
              href={PROFILE.phoneHref}
              className="inline-block rounded-full bg-cove px-6 py-3 text-[0.9rem] text-wall transition-opacity hover:opacity-85"
            >
              {c.contact.cta}
            </a>
          </Round>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- export -- */

export function Sections() {
  return (
    <main>
      <Hero />
      <Roster />
      <Floor />
      <Room />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useKAuto();

  return (
    <footer className="border-t border-wall/15 bg-dome py-10">
      <div className="mx-auto flex max-w-[84rem] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/mark.svg" alt="" className="h-6 w-6" />
          <span className="latin font-display text-[0.98rem] text-wall">K.auto</span>
          <span className="text-[0.8rem] text-wall-2">{c.brand.tagline}</span>
        </div>
        <p className="fine text-wall-2">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
