import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GuruPelajaranSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-2/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
