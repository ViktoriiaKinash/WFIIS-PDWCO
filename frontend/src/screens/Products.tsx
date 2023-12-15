import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const getProducts = async () => {
    try {
      const res = await axios.get(
        (import.meta.env.PUBLIC_API_URL || "http://localhost:3000") +
          "/api/getProducts/"
      );
      if (res.data.length) {
        setProducts(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (name_: string) => {
    try {
      await axios.delete(
        (import.meta.env.PUBLIC_API_URL || "http://localhost:3000") +
          "/api/deleteProduct/",
        {
          params: {
            name: name_,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    await getProducts();
  };

  const addProduct = async () => {
    try {
      const res = await axios.post(
        (import.meta.env.PUBLIC_API_URL || "http://localhost:3000") +
          "/api/addProduct/",
        {
          params: {
            name: name,
            brand: brand,
            price: price,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    await getProducts();
  };

  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []);

  const columns = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => deleteProduct(record.name)}
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
        Add product
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
          placeholder="Brand"
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        />
        <Input
          style={{ margin: 5 }}
          placeholder="Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={products} />
    </div>
  );
};

export default Products;
