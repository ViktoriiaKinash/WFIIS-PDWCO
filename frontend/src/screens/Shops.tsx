import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [space, setSpace] = useState("");

  const getShops = async () => {
    try {
      const res = await axios.get(
        (import.meta.env.PUBLIC_API_URL || "http://localhost:3000") +
          "/api/getShops/"
      );
      if (res.data.length) {
        setShops(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteShop = async (name_: string) => {
    try {
      await axios.delete(
        (import.meta.env.PUBLIC_API_URL || "http://localhost:3000") +
          "/api/deleteShop/",
        {
          params: {
            name: name_,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    await getShops();
  };

  const addProduct = async () => {
    try {
      const res = await axios.post(
        (import.meta.env.PUBLIC_API_URL || "http://localhost:3000") +
          "/api/addShop/",
        {
          params: {
            name: name,
            location: location,
            space: space,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    await getShops();
  };

  useEffect(() => {
    (async () => {
      await getShops();
    })();
  }, []);

  const columns = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Space",
      dataIndex: "space",
      key: "space",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: { name: string }) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => deleteShop(record.name)}
        ></Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        style={{ margin: 10 }}
        type="primary"
        onClick={() => setOpen(!open)}
      >
        Add shop
      </Button>
      <Modal
        title="Basic Modal"
        open={open}
        onOk={async () => {
          await addProduct();
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      >
        <Input
          style={{ margin: 5 }}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          style={{ margin: 5 }}
          placeholder="Location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <Input
          style={{ margin: 5 }}
          placeholder="Space"
          onChange={(e) => {
            setSpace(e.target.value);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={shops} />
    </div>
  );
};

export default Shops;
