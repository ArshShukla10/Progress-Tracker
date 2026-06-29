"use client";

import { useEffect, useState } from "react";

import { SectionHeader } from "@/components/academics/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiSettingsService, defaultAiSettings } from "@/services/ai/ai-settings-service";
import { aiService } from "@/services/ai/ai-service";
import type { AiSettings } from "@/types/ai";

export function AiSettingsPanel() {
  const [settings, setSettings] = useState<AiSettings>(defaultAiSettings);
  const providers = aiService.getProviders();

  useEffect(() => {
    setSettings(aiSettingsService.getSettings());
  }, []);

  function save() {
    aiSettingsService.saveSettings(settings);
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <SectionHeader
        eyebrow="Settings"
        title="AI Learning Engine"
        description="Configure the provider used by context-aware AI learning cards."
      />
      <Card>
        <CardHeader>
          <CardTitle>Provider</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <label className="block">
            <span className="text-sm text-muted-foreground">AI Provider</span>
            <select
              value={settings.provider}
              onChange={(event) =>
                setSettings({ ...settings, provider: event.target.value as AiSettings["provider"] })
              }
              className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground"
            >
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id} disabled={provider.disabled}>
                  {provider.label}
                  {provider.disabled ? " (Future)" : ""}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground">Gemini Model</span>
            <input
              value={settings.geminiModel}
              onChange={(event) => setSettings({ ...settings, geminiModel: event.target.value })}
              className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground">Gemini API Key</span>
            <input
              type="password"
              value={settings.apiKeys.gemini ?? ""}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  apiKeys: { ...settings.apiKeys, gemini: event.target.value },
                })
              }
              placeholder="Stored locally in this browser"
              className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleField
              label="Streaming"
              checked={settings.streaming}
              onChange={(checked) => setSettings({ ...settings, streaming: checked })}
            />
            <ToggleField
              label="Markdown"
              checked={settings.markdown}
              onChange={(checked) => setSettings({ ...settings, markdown: checked })}
            />
            <ToggleField
              label="Conversation Memory"
              checked={settings.conversationMemory}
              onChange={(checked) => setSettings({ ...settings, conversationMemory: checked })}
            />
            <ToggleField
              label="Cache Responses"
              checked={settings.cache}
              onChange={(checked) => setSettings({ ...settings, cache: checked })}
            />
          </div>

          <label className="block">
            <span className="text-sm text-muted-foreground">Temperature</span>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(event) =>
                setSettings({ ...settings, temperature: Number(event.target.value) })
              }
              className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-3">
            {providers
              .filter((provider) => provider.disabled)
              .map((provider) => (
                <div
                  key={provider.id}
                  className="rounded-md border border-border/70 bg-background/32 p-4 text-sm text-muted-foreground"
                >
                  {provider.label} disabled
                </div>
              ))}
          </div>

          <Button type="button" onClick={save}>
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-md border border-border/70 bg-background/32 p-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-primary"
      />
    </label>
  );
}
