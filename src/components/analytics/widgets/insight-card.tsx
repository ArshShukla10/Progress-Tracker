import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalyticsInsight } from "@/types/analytics";

export function InsightCard({ insight }: { insight: AnalyticsInsight }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-muted-foreground">{insight.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-foreground">{insight.value}</p>
        {insight.detail ? <p className="mt-2 text-sm text-muted-foreground">{insight.detail}</p> : null}
      </CardContent>
    </Card>
  );
}
