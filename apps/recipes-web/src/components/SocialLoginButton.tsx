import cn from "classnames";
import { GrFacebookOption, GrGoogle } from "react-icons/gr";

type Props = {
  isDisabled: boolean;
  provider: string;
  prefixText: string;
  handleSubmit: (provider: string) => Promise<void>;
};

const SocialLoginButton: React.FC<Props> = ({
  isDisabled,
  provider,
  prefixText,
  handleSubmit,
}) => (
  <button
    onClick={async () => {
      await handleSubmit(provider);
    }}
    className={cn(
      "prose prose-dark mr-2 mb-2 flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 disabled:opacity-50",
      {
        "dark:focus:ring-[#4285F4]/55 dark:focus:ring-[#3b5998]/55 bg-[#4285F4] focus:ring-[#4285F4]/50 enabled:hover:bg-[#4285F4]/90":
          provider === "google",
        "bg-[#3b5998] focus:ring-[#3b5998]/50 enabled:hover:bg-[#3b5998]/90":
          provider === "facebook",
      }
    )}
    disabled={isDisabled}
  >
    {provider === "google" && <GrGoogle />}
    {provider === "facebook" && <GrFacebookOption size="1.15rem" />}
    <span className="ml-4">
      {prefixText} {provider.replace(/^\w/, (c) => c.toUpperCase())}
    </span>
  </button>
);

export default SocialLoginButton;
