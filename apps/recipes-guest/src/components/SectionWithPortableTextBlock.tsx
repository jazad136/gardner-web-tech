import { SectionHeader } from "ui";

import { PortableText } from "@portabletext/react";

type Props = {
  title: string;
  blocks: any;
};

const SectionWithPortableTextBlock: React.FC<Props> = ({ title, blocks }) => {
  if (!blocks) {
    return <></>;
  }

  return (
    <div className="py-6">
      <SectionHeader className="text-center">{title}</SectionHeader>
      <div className="prose dark:prose-dark max-w-full">
        <PortableText value={blocks} />
      </div>
    </div>
  );
};

export default SectionWithPortableTextBlock;
