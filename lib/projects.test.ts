import { describe, it, expect } from "vitest";
import { getAllProjects, getAdjacent, getProjectSlugs } from "./projects";

describe("projects loader", () => {
  it("loads all 5 seed projects", () => {
    expect(getProjectSlugs().length).toBeGreaterThanOrEqual(1);
  });

  it("sorts projects by order ascending", () => {
    const orders = getAllProjects().map((p) => p.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("computes adjacent projects", () => {
    const all = getAllProjects();
    const { prev, next } = getAdjacent(all[1].slug);
    expect(prev?.slug).toBe(all[0].slug);
    expect(next?.slug).toBe(all[2].slug);
  });

  it("loads optional case-study meta on varsity project", () => {
    const p = getAllProjects().find((x) => x.slug === "varsity-tutors-parent-dashboard");
    expect(p).toBeTruthy();
    expect(p!.duration).toBe("8 weeks");
    expect(p!.skills).toContain("User Research");
    expect(p!.tools).toContain("Figma");
  });
});
