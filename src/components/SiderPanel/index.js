import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
const SiderPanel = () => {
  const { Sider } = Layout;

  return (
    <Sider collapsible>
      <div className="h-8 m-4 bg-black opacity-30" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<UploadOutlined />}>
          <Link href="/addproduct">Add Product</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UploadOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderPanel;
