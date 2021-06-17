import "../styles/globals.css";
import { Layout } from "antd";
import "antd/dist/antd.css";
import SiderPanel from "../components/SiderPanel";
function MyApp({ Component, pageProps }) {
  const { Sider, Content, Header } = Layout;
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
