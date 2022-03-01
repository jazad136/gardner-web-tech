import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { magic } from "src/lib/magic";
import { UserContext } from "src/lib/UserContext";
import { PageSpinner } from "ui";

const Logout = () => {
  const { setSession } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    await fetch("/api/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ callbackUrl: router.asPath }),
    });

    await magic?.user?.logout();
    setSession({ isLoading: false });
    router.push("/login");
  };

  return <PageSpinner />;
};

export default Logout;
