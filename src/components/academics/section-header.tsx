type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
      <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
