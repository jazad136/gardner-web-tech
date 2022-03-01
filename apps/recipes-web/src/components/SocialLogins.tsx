import { useState } from "react";
import { Button } from "ui";

const SocialLogins = ({ onSubmit }) => {
  const providers = ["google", "facebook"];
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <>
      <div className="my-3 prose prose-sm max-w-full text-center text-slate-500 dark:text-slate-300">
        Or login with
      </div>
      {providers.map((provider) => {
        return (
          <div key={provider}>
            <Button
              type="submit"
              size="md"
              onClick={() => {
                setIsRedirecting(true);
                onSubmit(provider);
              }}
              key={provider}
              color={provider as "google" | "facebook"}
              ariaLabel={`${provider} login`}
              isBold={false}
              isPill
            >
              {/* turns "google" to "Google" */}
              {provider.replace(/^\w/, (c) => c.toUpperCase())}
            </Button>
          </div>
        );
      })}
      {isRedirecting && (
        <div className="text-slate-500 text-sm mb-1 mt-2">Redirecting...</div>
      )}
    </>
  );
};

export default SocialLogins;
