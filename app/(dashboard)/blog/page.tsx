import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "./actions";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Blog</h1>
          <p className="text-silver">Articles on the public /blog page.</p>
        </div>
        <Link
          href="/blog/new"
          className="inline-flex items-center gap-2 bg-accent-primary text-void font-bold uppercase text-sm tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add Post
        </Link>
      </div>

      <div className="border-t border-steel/20">
        {posts.length === 0 && <p className="text-silver py-8">No posts yet.</p>}

        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-4 py-5 border-b border-steel/20">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-graphite border border-steel shrink-0">
                {post.coverImageUrl && (
                  <Image src={post.coverImageUrl} alt={post.title} fill sizes="64px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {post.isFeatured && <Star className="w-3.5 h-3.5 text-accent-primary shrink-0" fill="currentColor" />}
                  <p className="font-bold text-cloud truncate">{post.title}</p>
                </div>
                <p className="text-sm text-silver mt-0.5">{post.category} · {post.readTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/blog/${post.id}`}
                className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                aria-label={`Edit ${post.title}`}
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <form action={deleteBlogPost.bind(null, post.id)}>
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                  aria-label={`Delete ${post.title}`}
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
