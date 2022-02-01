import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

export interface PDFViewerProps {
  children: JSX.Element;
}

const Viewer = ({ children }: PDFViewerProps) => (
  <PDFViewer className="w-full h-[92vh] mt-6">{children}</PDFViewer>
);

export default Viewer;
