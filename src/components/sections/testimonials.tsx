import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { ArrowBubble } from "@/components/ui/card";
import {
  SectionHeader,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/ui/motion-primitives";
import { Screenshot } from "@/components/work/work-card";
import { publishedTestimonials as testimonials } from "@/lib/testimonials";
import { workBySlug } from "@/lib/more-work";
import { toWorkSummary } from "@/lib/case-studies";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** One quote on its own: the words large on the left, the project it came from on the right. */
function SingleTestimonial({ t }: { t: (typeof testimonials)[number] }) {
  const study = t.work ? workBySlug[t.work] : undefined;
  return (
    <Reveal className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <figure
        className={`flex flex-col rounded-3xl bg-accent p-7 text-black md:p-10 ${study ? "lg:col-span-7" : "lg:col-span-12"}`}
      >
        <blockquote className="text-2xl font-medium leading-snug tracking-[-0.02em] md:text-3xl text-balance">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-auto flex items-center gap-3 pt-10">
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-bold text-accent"
          >
            {initials(t.name)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{t.name}</span>
            <span className="block text-sm text-black/65">
              {t.role}
              {t.company ? `, ${t.company}` : ""}
            </span>
          </span>
          {t.link && (
            <a
              href={t.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.company ?? t.name} website`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 transition-colors hover:bg-black/20"
            >
              <Icon icon={ArrowUpRight01Icon} size={18} />
            </a>
          )}
        </figcaption>
      </figure>
      {study && (
        <Link
          href={`/work/${study.slug}`}
          className="group flex flex-col rounded-3xl bg-surface p-5 transition-colors hover:bg-surface-2 lg:col-span-5"
        >
          <Screenshot
            study={toWorkSummary(study)}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="aspect-[16/10] rounded-2xl"
          />
          <span className="mt-5 flex items-center justify-between gap-4">
            <span className="min-w-0">
              <span className="block text-lg font-semibold text-white">
                {study.name}
              </span>
              <span className="block text-sm text-white/55">
                The project behind the quote
              </span>
            </span>
            <ArrowBubble size="sm" />
          </span>
        </Link>
      )}
    </Reveal>
  );
}

/** Client quotes. Renders nothing until src/lib/testimonials.ts has published entries. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28" aria-label="What clients say">
      <div className="container mx-auto px-5 sm:px-6">
        <SectionHeader eyebrow="Clients" title="In their words." />
        {testimonials.length === 1 ? (
          <SingleTestimonial t={testimonials[0]} />
        ) : (
          <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <StaggerItem key={t.name} className="h-full">
                <figure
                  className={
                    i === 0
                      ? "flex h-full flex-col rounded-3xl bg-accent p-7 text-black md:p-8"
                      : "flex h-full flex-col rounded-3xl bg-surface p-7 md:p-8"
                  }
                >
                  <blockquote
                    className={
                      i === 0
                        ? "text-lg font-medium leading-relaxed"
                        : "text-lg leading-relaxed text-white/85"
                    }
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-8">
                    <span
                      aria-hidden
                      className={
                        i === 0
                          ? "flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-bold text-accent"
                          : "flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-sm font-bold text-white"
                      }
                    >
                      {initials(t.name)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{t.name}</span>
                      <span
                        className={
                          i === 0
                            ? "block text-sm text-black/65"
                            : "block text-sm text-white/55"
                        }
                      >
                        {t.role}
                        {t.company ? `, ${t.company}` : ""}
                      </span>
                    </span>
                    {t.link && (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.name} profile`}
                        className={
                          i === 0
                            ? "flex h-10 w-10 items-center justify-center rounded-full bg-black/10 hover:bg-black/20"
                            : "flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] hover:bg-accent hover:text-black"
                        }
                      >
                        <Icon icon={ArrowUpRight01Icon} size={18} />
                      </a>
                    )}
                  </figcaption>
                  {t.work && (
                    <Link
                      href={`/work/${t.work}`}
                      className={
                        i === 0
                          ? "mt-4 text-sm font-semibold underline underline-offset-4"
                          : "mt-4 text-sm font-semibold text-white underline decoration-accent/60 underline-offset-4"
                      }
                    >
                      See the project
                    </Link>
                  )}
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
