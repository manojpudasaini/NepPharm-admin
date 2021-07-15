import "../styles/globals.css";
import dynamic from "next/dynamic";
import "antd/dist/antd.css";
import SiderPanel from "../components/SiderPanel";

const Layout = dynamic(() => import("antd").then((module) => module.Layout), {
  ssr: false,
});
const Content = dynamic(
  () => import("antd").then((module) => module.Layout.Content),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {
  // const { Sider, Content, Header } = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderPanel />
      <Layout className="bg-gray-100">
        {/* <Header className="bg-gray-100 p-0" /> */}
        <Content className="my-0 mx-4">
          <div className="bg-gray-100 p-6 ">
            <Component {...pageProps} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyApp;
