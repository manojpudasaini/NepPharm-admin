import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
const AddBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    image: null,
    content: "",
    tag: [],
  });

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
      setBlog({ ...blog, image: file });
    }
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("OK");
    }, 0);
  };
  const handleFormSubmit = () => {
    console.log(blog);
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <p className="text-2xl font-bold py-4">Add Blog</p>
      </div>
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={handleFormSubmit}
        scrollToFirstError
      >
        <Form.Item
          label="Title"
          name="blogTitle"
          rules={[{ required: true, message: "please input" }]}
        >
          <Input
            size="large"
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tags"
          rules={[{ required: true, message: "please input" }]}
        ></Form.Item>

        <Form.Item>
          <div className="relative">
            {blog.image && (
              <>
                <CloseCircleOutlined
                  style={{ color: "#fff" }}
                  className="text-3xl bg-red-400 absolute top-2 right-10 rounded-full hover:bg-red-600"
                  onClick={() => setblog({ ...blog, image: null })}
                />
                <img
                  className="w-[200px] h-[200px] object-contain my-2 mx-auto"
                  src={blog.image}
                  alt={blog.title}
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
            <Button disabled={blog.image}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Content" name="content">
          <CKEditor
            editor={ClassicEditor}
            config={{
              removePlugins: ["mediaEmbed"],
            }}
            data={blog.content}
            onChange={(e, editor) => {
              const data = editor.getData();
              setBlog({ ...blog, content: data });
            }}
          />
          <div>{parse(blog.content)}</div>
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

export default AddBlog;
