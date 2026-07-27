"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type Stat = { label: string; value: string };

const inputClasses =
  "w-full bg-carbon border border-white/10 rounded-xl px-4 py-3 text-cloud focus:outline-none focus:border-cloud/50 focus:ring-1 focus:ring-cloud/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20";

/**
 * Editable list of the product's headline stats (e.g. Farmers / 12,150+).
 * Rows submit as parallel `statLabel` / `statValue` fields; the server action
 * zips them back together, so empty rows are dropped there.
 */
export function ProductStatsFields({ defaultStats }: { defaultStats: Stat[] }) {
  const [stats, setStats] = useState<Stat[]>(
    defaultStats.length ? defaultStats : [{ label: "", value: "" }]
  );

  const update = (i: number, key: keyof Stat, val: string) =>
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)));
  const add = () => setStats((prev) => [...prev, { label: "", value: "" }]);
  const remove = (i: number) => setStats((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="text-sm font-bold tracking-wide uppercase text-slate block mb-2">
        Headline Stats
      </label>
      <p className="text-sm text-silver mb-4">
        Shown on the homepage MechAfrica section (e.g. Farmers → 12,150+).
      </p>

      <div className="flex flex-col gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              name="statValue"
              value={stat.value}
              onChange={(e) => update(i, "value", e.target.value)}
              placeholder="12,150+"
              className={`${inputClasses} max-w-[160px]`}
            />
            <input
              name="statLabel"
              value={stat.label}
              onChange={(e) => update(i, "label", e.target.value)}
              placeholder="Farmers"
              className={inputClasses}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="w-10 h-10 shrink-0 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
              aria-label="Remove stat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-silver hover:text-accent-primary transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Add stat
      </button>
    </div>
  );
}
