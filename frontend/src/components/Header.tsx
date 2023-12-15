import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { SetStateAction, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("r");
  const onClick = (e: { key: SetStateAction<string> }) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div style={{ flex: 1 }}>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="r" icon={<ShoppingCartOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="l" icon={<ShopOutlined />}>
          <Link to="/shops">Shops</Link>
        </Menu.Item>
      </Menu>
      <Outlet />
    </div>
  );
};
export default Header;
