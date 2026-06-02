import Image from "next/image";
import { Reveal } from "../reveal";

type Persona = {
  name: string;
  meta: string;
  avatar?: string;
  motivation: string[];
  needs: string[];
};

export function Personas({ people }: { people: Persona[] }) {
  return (
    <Reveal>
      <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {people.map((p) => (
          <div key={p.name} className="rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              {p.avatar ? (
                <Image src={p.avatar} alt={p.name} width={48} height={48} className="h-12 w-12 rounded-full border border-border object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-fg/10" />
              )}
              <div>
                <h4 className="text-[15px] font-semibold tracking-tight">{p.name}</h4>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{p.meta}</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-[13px] leading-6">
              <div>
                <p className="font-medium">Motivation</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-muted">
                  {p.motivation.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-medium">Needs</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-muted">
                  {p.needs.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
