import { MagicUserMetadata } from "magic-sdk";
import React, { createContext } from "react";

export type Session = {
  isLoading: boolean;
  user?: MagicUserMetadata;
};

interface ISessionContext {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}

const defaultSessionContext: ISessionContext = {
  session: {
    isLoading: false,
    user: null,
  },
  setSession: () => {},
};

export const UserContext = createContext<ISessionContext>(
  defaultSessionContext
);
