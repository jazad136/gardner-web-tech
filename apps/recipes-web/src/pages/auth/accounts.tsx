import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { ClientSafeProvider, getProviders, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { AuthTextWrapper, SocialLoginButton } from "src/components";
import { AuthOptions } from "src/lib";
import { CustomNextPage } from "src/types";
import { PageSpinner, Paragraph } from "ui";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ExpandedClientSafeProvider = ClientSafeProvider & { linked: boolean };

type Props = {
  providers: ExpandedClientSafeProvider[];
};

const AccountsPage: CustomNextPage<Props> = ({ providers }) => {
  const { status } = useSession();
  const { asPath } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteAccount = async (provider: ExpandedClientSafeProvider) => {
    const res = await fetch(`/api/auth/unlink/${provider.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error(
        `There was an issue removing ${provider.name} from your account. Please try again.`,
        {
          toastId: "deleteAccountError",
        }
      );

      return;
    }

    toast.success(
      `${provider.name} was successfully removed from your account! you are now being signed out. Please wait...`,
      {
        toastId: "deleteAccountSuccess",
      }
    );

    await new Promise((r) => setTimeout(r, 5000));
    await signOut({ callbackUrl: "/" });
  };

  const handleSubmit = async (providerName: string) => {
    setIsLoading(true);
    const provider = providers.find((provider) => provider.id === providerName);

    if (provider.linked) {
      await deleteAccount(provider);
    } else {
      await signIn(provider.id, { callbackUrl: asPath });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Recipes: Accounts</title>
        <meta name="description" content="Recipes Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {status === "loading" || status === "unauthenticated" ? (
          <PageSpinner />
        ) : (
          <AuthTextWrapper title="Link Account" titleSize="prose-2xl">
            <div className="mt-5">
              <Paragraph>
                <span className="font-bold">Warning:</span> unlinking an account{" "}
                <span className="font-bold">will</span> sign you out. You will
                need to login again.
              </Paragraph>
              {(providers ?? []).map((provider) => (
                <div key={provider.id} className="flex justify-center">
                  <SocialLoginButton
                    isDisabled={isLoading}
                    provider={provider.id}
                    handleSubmit={handleSubmit}
                    prefixText={provider.linked ? "Unlink" : "Link"}
                  />
                </div>
              ))}
            </div>
          </AuthTextWrapper>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, AuthOptions);

  if (!session?.user) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  const providers = await getProviders();
  const filteredProviders = Object.values(providers).filter(
    (provider) => provider.type === "oauth"
  );

  const userProviders = await prisma.account.findMany({
    where: { type: "oauth", AND: [{ user: { email: session.user.email } }] },
    select: {
      provider: true,
    },
  });

  const data: ExpandedClientSafeProvider[] = [];

  for (const provider of filteredProviders) {
    data.push({
      ...provider,
      linked: userProviders.map((p) => p.provider).includes(provider.id),
    });
  }

  return {
    props: {
      providers: data,
    },
  };
};

AccountsPage.layout = {
  includeContainer: true,
  includeNavAndFooter: true,
};

export default AccountsPage;
