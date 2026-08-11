import { Spinner } from "@/components/ui/spinner";

export function UsersSkeleton() {
  return (
    <div className="flex items-center justify-center p-12">
      <Spinner className="size-8 text-primary" />
    </div>
  );
}
