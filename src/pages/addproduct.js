import { Form, Input, Button } from "antd";
import { useState } from "react";
const Addproduct = () => {
  const { TextArea } = Input;
  const [productDetail, setProductDetail] = useState({
    title: "hello",
    description: "",
    price: "",
    category: "",
  });
  const handleFormSubmit = () => {
    console.log(productDetail);
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <p className="text-2xl font-bold py-4">Add Product</p>
      </div>
      <Form requiredMark={false} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Name of the product"
          name="productname"
          rules={[{ required: true, message: "please input" }]}
        >
          <Input
            size="large"
            onChange={(e) =>
              setProductDetail({ ...productDetail, title: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="productdescription"
          rules={[{ required: true, message: "please input" }]}
        >
          <TextArea
            rows={4}
            onChange={(e) =>
              setProductDetail({
                ...productDetail,
                description: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="productprice"
          rules={[{ required: true, message: "please input" }]}
        >
          <Input
            size="large"
            type="number"
            onChange={(e) =>
              setProductDetail({ ...productDetail, price: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="productcategory"
          rules={[{ required: true, message: "please input" }]}
        >
          <Input
            size="large"
            onChange={(e) =>
              setProductDetail({ ...productDetail, category: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="productcategory"
          rules={[{ required: true, message: "please input" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Addproduct;
