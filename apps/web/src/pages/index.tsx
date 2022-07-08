import Layout from "@components/Layout";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { PageTitle, Paragraph, SectionHeader } from "ui";
import Subtitle from "ui/src/text/Subtitle";

interface HomeProperties {
  preview: boolean;
}

const Home: NextPage<HomeProperties> = ({ preview }: HomeProperties) => {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <PageTitle>Adam Gardner</PageTitle>
        <Subtitle>
          <span>Full-Stack Software Engineer at </span>
          <Link href="https://availity.com">
            <a className="hover:text-accent-2 hover:underline">Availity</a>
          </Link>
        </Subtitle>
        <Paragraph>
          Helping companies build easily maintainable, scalable web applications
          using C#, React, and Next.js.
        </Paragraph>
        <SectionHeader>My Tech Stack</SectionHeader>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return {
    props: { preview },
  };
};

export default Home;
