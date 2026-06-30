import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalyticsMetric } from "@/types/analytics";

export function MetricCard({ metric }: { metric: AnalyticsMetric }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-normal text-foreground">{metric.value}</p>
        {metric.detail ? <p className="mt-2 text-sm text-muted-foreground">{metric.detail}</p> : null}
      </CardContent>
    </Card>
  );
}
