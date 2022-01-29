import { Magic } from "@magic-sdk/admin";
import { MagicUserMetadata } from "magic-sdk";
import * as Pino from "pino";

const logger = Pino.pino();
let magic: Magic = null;

// Create server-side Magic Instance
export const magicServer = (key: string): void => {
  try {
    magic = new Magic(key);
  } catch {
    logger.error(key, "Error creating magic server instance.");
  }
};

export const getUser = async (didToken: string): Promise<MagicUserMetadata> => {
  if (!magic) {
    logger.error(
      didToken,
      "Must create instance of Magic before validating user."
    );
    return null;
  }

  try {
    magic.token.validate(didToken);
  } catch {
    logger.warn(didToken, "User is invalid. token: %j", didToken);
    return null;
  }

  return await magic.users.getMetadataByToken(didToken);
};
