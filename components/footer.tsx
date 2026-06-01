import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-[680px] px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Got an idea? Let&apos;s chat.
        </h2>
        <a href={`mailto:${site.email}`} className="mt-4 inline-block text-accent underline-offset-4 hover:underline">
          {site.email}
        </a>
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted">
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a>
          <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Instagram</a>
          <a href={site.links.resume} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Resume</a>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
          Designed &amp; built by {site.name}
        </p>
      </div>
    </footer>
  );
}
