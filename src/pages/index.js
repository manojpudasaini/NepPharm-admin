import Head from "next/head";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>NepPharm Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to NepPharm Admin</h1>
      </main>
    </div>
  );
}
