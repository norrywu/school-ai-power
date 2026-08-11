import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface KelasSkeletonProps {
  count?: number;
}

export function KelasSkeleton({ count = 5 }: KelasSkeletonProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-border/40"
          >
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-4 w-28" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="size-8 rounded-md" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
