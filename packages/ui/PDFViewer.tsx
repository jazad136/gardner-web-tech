import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

type Props = {
  children: JSX.Element;
};

const Viewer: React.FC<Props> = ({ children }) => (
  <PDFViewer className="w-full h-[92vh] mt-6">{children}</PDFViewer>
);

export default Viewer;
