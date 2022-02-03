import { PortableText } from "src/lib/SanityUi";
import { SectionHeader } from "ui";

export interface SectionWithPortableTextBlockProps {
  title: string;
  blocks: any;
}

export const SectionWithPortableTextBlock = ({
  title,
  blocks,
}: SectionWithPortableTextBlockProps) => {
  if (!blocks) {
    return <></>;
  }

  return (
    <div className="py-6">
      <SectionHeader classNames="text-center">{title}</SectionHeader>
      <div className="prose dark:prose-dark max-w-full">
        <PortableText blocks={blocks} />
      </div>
    </div>
  );
};
