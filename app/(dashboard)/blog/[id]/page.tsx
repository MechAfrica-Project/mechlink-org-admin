import { notFound } from "next/navigation";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/lib/prisma";
import { BlogFields } from "../BlogFields";
import { updateBlogPost } from "../actions";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const updateWithId = updateBlogPost.bind(null, post.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Edit Post</h1>
      <p className="text-silver mb-10">{post.title}</p>

      <form action={updateWithId} className="flex flex-col gap-8">
        <BlogFields
          defaultValues={{
            title: post.title,
            category: post.category,
            readTime: post.readTime,
            excerpt: post.excerpt,
            contentMd: post.contentMd,
            coverImageUrl: post.coverImageUrl,
            isFeatured: post.isFeatured,
          }}
        />
        <SubmitButton className="w-fit" pendingText="Saving…">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}
