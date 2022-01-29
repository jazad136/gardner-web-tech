import { PortableText } from "src/lib/SanityUi";

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
      <h3 className="flex justify-center mb-4 text-3xl">{title}</h3>
      <PortableText blocks={blocks} />
    </div>
  );
};
