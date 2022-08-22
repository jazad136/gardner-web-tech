import cn from "classnames";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { GrFacebookOption, GrGoogle } from "react-icons/gr";

type Props = {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const SocialLogins: React.FC<Props> = ({ isDisabled, setIsDisabled }) => {
  const providers = ["google", "facebook"];
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <>
      <div className="prose prose-sm my-3 max-w-full text-center text-slate-500 dark:text-slate-300">
        Or login with
      </div>
      {providers.map((provider) => (
        <div key={provider}>
          <button
            onClick={() => {
              setIsDisabled(true);
              setIsRedirecting(true);
              signIn(provider);
            }}
            className={cn(
              "prose prose-dark mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium  focus:outline-none focus:ring-4",
              {
                "dark:focus:ring-[#4285F4]/55 dark:focus:ring-[#3b5998]/55 bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-[#4285F4]/50":
                  provider === "google",
                "bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-[#3b5998]/50":
                  provider === "facebook",
              }
            )}
            disabled={isDisabled || isRedirecting}
            key={provider}
          >
            {provider === "google" && <GrGoogle />}
            {provider === "facebook" && <GrFacebookOption size="1.15rem" />}
            <span className="ml-4">
              Sign in with {provider.replace(/^\w/, (c) => c.toUpperCase())}
            </span>
          </button>
        </div>
      ))}
      {isRedirecting && (
        <div className="mb-1 mt-2 text-sm text-slate-500">Redirecting...</div>
      )}
    </>
  );
};

export default SocialLogins;
