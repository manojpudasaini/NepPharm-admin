import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  notification,
  message,
} from "antd";
import "antd/dist/antd.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import Axios from "axios";

const Addproduct = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [productDetail, setProductDetail] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
    requirePrescription: null,
  });
  const { Option } = Select;
  const handleSelect = (value) => {
    setProductDetail({ ...productDetail, requirePrescription: value });
    console.log(`selected ${value}`);
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleChange = async (info) => {
    // console.log(info.file);
    if (info.file.status === "done") {
      const file = await getBase64(info.file.originFileObj);
      console.log("file link>>>", file);
      setProductDetail({ ...productDetail, image: file });
    }
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("OK");
    }, 0);
  };

  const handleFormSubmit = async () => {
    console.log(productDetail);
    await Axios({
      method: "POST",
      url: "http://localhost:5000/product",
      data: {
        title: productDetail.title,
        description: productDetail.description,
        price: productDetail.price,
        category: productDetail.category,
        image: productDetail.image,
        requirePrescription: productDetail.requirePrescription,
      },
    })
      .then(function (response) {
        console.log(response);
        notification.success({
          message: "Successfully added product",
          description: `${response.data.title}`,
        });
      })
      .catch(function (error) {
        console.log(error);
        notification.error({
          message: "Error occurred while adding product",
          description: `${error.message}`,
        });
      });
    await form.resetFields();
    await setProductDetail({ ...productDetail, image: null });
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <p className="text-2xl font-bold py-4">Add Product</p>
      </div>
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        onFinish={handleFormSubmit}
        scrollToFirstError
      >
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
        <Form.Item>
          <div className="relative">
            {productDetail.image && (
              <>
                <CloseCircleOutlined
                  style={{ color: "#fff" }}
                  className="text-3xl bg-red-400 absolute top-2 right-10 rounded-full hover:bg-red-600"
                  onClick={() =>
                    setProductDetail({ ...productDetail, image: null })
                  }
                />
                <img
                  className="w-[200px] h-[200px] object-contain my-2 mx-auto"
                  src={productDetail.image}
                  alt="product image"
                />
              </>
            )}
          </div>
          <Upload
            showUploadList={false}
            onChange={handleChange}
            customRequest={dummyRequest}
            accept="image/*,.pdf"
          >
            <Button disabled={productDetail.image}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Requires Prescription"
          name="req_prescription"
          rules={[{ required: true, message: "please input" }]}
        >
          <Select onChange={handleSelect}>
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
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
