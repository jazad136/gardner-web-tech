import { Magic } from "@magic-sdk/admin";
import { MagicUserMetadata } from "magic-sdk";

let magic: Magic = null;
// logger.enableColor();

// Create server-side Magic Instance
export const magicServer = (key: string): void => {
  try {
    magic = new Magic(key);
  } catch {
    // logger.error(
    //   `Magic:magicServer - ${DateTime.utc().toISO()}`,
    //   "Error creating magic server instance."
    // );
  }
};

export const getUser = async (didToken: string): Promise<MagicUserMetadata> => {
  if (!magic) {
    // logger.error(
    //   `Magic:getUser - ${DateTime.utc().toISO()}`,
    //   "Must create instance of Magic before validating user."
    // );
    return null;
  }

  try {
    magic.token.validate(didToken);
  } catch {
    // logger.warn(
    //   `Magic:getUser - ${DateTime.utc().toISO()}`,
    //   "User is invalid. token: %j",
    //   didToken
    // );
    return null;
  }

  return await magic.users.getMetadataByToken(didToken);
};
