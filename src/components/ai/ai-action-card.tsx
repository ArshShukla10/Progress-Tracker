import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AiActionDefinition } from "@/services/ai/ai-actions";

type AiActionCardProps = {
  action: AiActionDefinition;
  active?: boolean;
  disabled?: boolean;
  onRun: () => void;
};

export function AiActionCard({
  action,
  active = false,
  disabled = false,
  onRun,
}: AiActionCardProps) {
  return (
    <Card className={active ? "border-primary/45 bg-primary/10" : undefined}>
      <CardHeader>
        <CardTitle>{action.label}</CardTitle>
        <p className="text-sm text-muted-foreground">{action.description}</p>
      </CardHeader>
      <CardContent>
        <Button type="button" variant="secondary" onClick={onRun} disabled={disabled}>
          Open
        </Button>
      </CardContent>
    </Card>
  );
}
