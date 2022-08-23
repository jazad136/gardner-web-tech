import { signIn } from "next-auth/react";
import React, { useState } from "react";

import SocialLoginButton from "./SocialLoginButton";

type Props = {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  callbackUrl?: string;
};

const SocialLogin: React.FC<Props> = ({
  isDisabled,
  setIsDisabled,
  callbackUrl,
}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSocialMediaLogin = async (provider: string) => {
    setIsRedirecting(true);
    setIsDisabled(true);
    await signIn(provider, {
      callbackUrl: callbackUrl as string | null,
    });
  };

  return (
    <>
      <div className="block">
        {["google", "facebook"].map((provider) => (
          <div key={provider} className="flex justify-center">
            <SocialLoginButton
              isDisabled={isDisabled}
              provider={provider}
              handleSubmit={handleSocialMediaLogin}
              prefixText="Sign in with"
            />
          </div>
        ))}
      </div>
      {isRedirecting && (
        <div className="mb-1 mt-2 text-sm text-slate-500">Redirecting...</div>
      )}
    </>
  );
};

export default SocialLogin;
