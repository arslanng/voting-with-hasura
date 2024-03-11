import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, NEW_POST_MUTATION } from "./queries";
import styles from "./styles.module.css";

const { Option } = Select;

function NewPostForm() {
  const navigate = useNavigate();

  const [
    savePost, // bizim mutation fonksiyonuna verdiğimiz ad.
    { loading, error }, // işlem sonunda dönen data
  ] = useMutation(NEW_POST_MUTATION);

  const { loading: get_users_loading, data: users_data } = useQuery(GET_USER);

  const handleSubmit = async (values) => {
    try {
      await savePost({
        variables: {
          data: values,
        },
      });
      message.success("Post saved", [4]);
      navigate("/");
    } catch (e) {
      message.error(`Post not saved!. Error: ${error.message}`, [10]);
    }
  };

  return (
    <Form name="basic" onFinish={handleSubmit} autoComplete="off">
      <Form.Item
        name="title" // bu kısım value tanımında key olarak gönderilir. mutation içindeki key ile aynı olmak zorunda.
        rules={[
          {
            required: true,
            message: "Please input a title!",
          },
        ]}
      >
        <Input disabled={loading} size="large" placeholder="Title" />
      </Form.Item>

      <Form.Item name="short_description">
        <Input
          disabled={loading}
          size="large"
          placeholder="Short description"
        />
      </Form.Item>

      <Form.Item name="description">
        <Input.TextArea
          disabled={loading}
          size="large"
          placeholder="Description"
        />
      </Form.Item>

      <Form.Item name="cover">
        <Input disabled={loading} size="large" placeholder="Cover" />
      </Form.Item>

      <Form.Item
        name="user"
        rules={[
          {
            required: true,
            message: "Please select user!",
          },
        ]}
      >
        <Select
          disabled={get_users_loading || loading}
          loading={get_users_loading}
          size="large"
          placeholder="Select your user"
        >
          {users_data &&
            users_data.users.map((item) => (
              <Option value={item._id} key={item._id}>
                {item.fullName}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item className={styles.buttons}>
        <Button loading={loading} size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewPostForm;
