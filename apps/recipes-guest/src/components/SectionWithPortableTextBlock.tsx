import { PortableText } from "src/lib/SanityUi";
import { SectionHeader } from "ui";

type Props = {
  title: string;
  blocks: any;
};

export const SectionWithPortableTextBlock: React.FC<Props> = ({
  title,
  blocks,
}) => {
  if (!blocks) {
    return <></>;
  }

  return (
    <div className="py-6">
      <SectionHeader>{title}</SectionHeader>
      <div className="prose dark:prose-dark max-w-full">
        <PortableText blocks={blocks} />
      </div>
    </div>
  );
};
