import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Form, Input, Button, Upload, Tag, notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Axios from "axios";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);
// const draftToHtml = dynamic(
//   () => import("draftjs-to-html").then((module) => module.draftToHtml),
//   {
//     ssr: false,
//   }
// );

const AddBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    image: null,
    content: "",
    //  tag: [],
  });
  const [form] = Form.useForm();
  //const [text, setText] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setBlog({
      ...blog,
      content: html,
    });
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
    if (info.file.status === "done") {
      const file = await getBase64(info.file.originFileObj);
      setBlog({ ...blog, image: file });
    }
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("OK");
    }, 0);
  };
  const handleFormSubmit = async () => {
    console.log(blog);

    await Axios({
      method: "POST",
      url: "http://localhost:5000/blog",
      data: {
        title: blog.title,
        //  tag: blog.tag,
        image: blog.image,
        content: blog.content,
      },
    })
      .then(function (response) {
        console.log(response);
        notification.success({
          message: "Successfully added blog",
          description: `${response.data.title}`,
        });
      })
      .catch(function (error) {
        console.log(error);
        notification.error({
          message: "Error occurred while creating blog",
          description: `${error.message}`,
        });
      });
    await form.resetFields();
    await setBlog({ ...blog, image: null, content: "" });
    await setEditorState(EditorState.createEmpty());
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <p className="text-2xl font-bold py-4">Add Blog</p>
      </div>
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        onFinish={handleFormSubmit}
        scrollToFirstError
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "please input" }]}
        >
          <Input
            size="large"
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </Form.Item>
        {/* <Form.Item
          label="Tags"
          name="tags"
          // rules={[{ required: true, message: "please input" }]}
        >
          <Input
            size="large"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setBlog({ ...blog, tag: text.split(" ") });
              }
            }}
          />
          <div className="relative p-2 border-b border-gray-700">
            {blog.tag.length !== 0 && blog.tag[0] !== "" && (
              <div className="flex justify-center items-baseline space-x-1 absolute top-0 right-0 p-2">
                <CloseCircleOutlined
                  className="text-3xl bg-red-400 rounded-full !text-white"
                  onClick={() => {
                    setBlog({ ...blog, tag: [] });
                    setText("");
                  }}
                />
              </div>
            )}
            <div className="max-w-screen-md w-full flex flex-wrap ">
              {blog.tag.length !== 0 &&
                blog.tag.map((item, index) => (
                  <Tag className="!text-base" key={index}>
                    {item}
                  </Tag>
                ))}
            </div>
          </div>
        </Form.Item> */}
        <Form.Item>
          <div className="relative">
            {blog.image && (
              <>
                <CloseCircleOutlined
                  style={{ color: "#fff" }}
                  className="text-3xl bg-red-400 absolute top-2 right-2 rounded-full hover:bg-red-600"
                  onClick={() => setBlog({ ...blog, image: null })}
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
          <div className="pb-10">
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              editorClassName=" p-6 bg-white shadow-md max-w-4xl mx-auto "
            />
          </div>
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
