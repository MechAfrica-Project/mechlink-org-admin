import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteService } from "./actions";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Services</h1>
          <p className="text-silver">The services grid on the public homepage.</p>
        </div>
        <Link
          href="/services/new"
          className="inline-flex items-center gap-2 bg-accent-primary text-void font-bold uppercase text-sm tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      <div className="border-t border-steel/20">
        {services.length === 0 && <p className="text-silver py-8">No services yet.</p>}

        {services.map((service) => (
          <div key={service.id} className="flex items-start justify-between gap-4 py-5 border-b border-steel/20">
            <div>
              <p className="font-bold text-cloud">{service.title}</p>
              <p className="text-sm text-silver mt-0.5 max-w-[520px]">{service.desc}</p>
              <p className="text-xs text-silver/60 mt-2">Icon: {service.iconName} · Order: {service.order}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/services/${service.id}`}
                className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                aria-label={`Edit ${service.title}`}
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <form action={deleteService.bind(null, service.id)}>
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                  aria-label={`Delete ${service.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
