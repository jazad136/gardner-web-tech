import { NextPage } from "next";

import { LayoutProps } from "./LayoutProps";

export type CustomNextPage<P = any> = NextPage<P> & {
  layout: LayoutProps;
};
