import { useRouter } from "next/router";
import { useEffect } from "react";
import { CustomNextPage } from "src/lib/CustomNextPage";
import { PageSpinner } from "ui";
import { magic } from "../lib/magic";

const LogoutPage: CustomNextPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await magic.user.logout();
    router.push("/login");
  };

  useEffect(() => {
    handleLogout();
  });

  return <PageSpinner />;
};

LogoutPage.layout = {
  includeContainer: true,
  includeNavAndFooter: false,
};

export default LogoutPage;
