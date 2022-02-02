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
      <h2 className="prose dark:prose-dark max-w-full flex justify-center mb-4 prose-xl">
        {title}
      </h2>
      <div className="prose dark:prose-dark max-w-full">
        <PortableText blocks={blocks} />
      </div>
    </div>
  );
};
