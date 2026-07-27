import { SubmitButton } from "@/components/ui/SubmitButton";
import { BlogFields } from "../BlogFields";
import { createBlogPost } from "../actions";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Add Post</h1>
      <p className="text-silver mb-10">A new article on the public blog.</p>

      <form action={createBlogPost} className="flex flex-col gap-8">
        <BlogFields />
        <SubmitButton className="w-fit" pendingText="Publishing…">
          Publish
        </SubmitButton>
      </form>
    </div>
  );
}
