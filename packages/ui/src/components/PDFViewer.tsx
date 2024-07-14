import React, { ReactElement, ReactNode } from "react";

import { PDFViewer } from "@react-pdf/renderer";

type Props = {
  children: ReactElement<any> & ReactNode;
};

const Viewer: React.FC<Props> = ({ children }) => (
  <PDFViewer className="mt-6 h-[92vh] w-full">{children}</PDFViewer>
);

export default Viewer;
