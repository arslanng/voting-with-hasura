import { useRef } from "react";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, CREATE_COMMENT_MUTATION } from "./queries";
import styles from "./styles.module.css";

const { Option } = Select;

function NewCommentForm({ post_id }) {
  const [createComment, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USER);

  const formRef = useRef(); // formu ilk haline getirmesi için.

  const handleSubmit = async (values) => {
    try {
      await createComment({
        variables: {
          data: { ...values, post: post_id },
        },
      });
      message.success("Comment saved", [4]);

      formRef.current.resetFields(); // formu resetleyen fonksiyon
    } catch (e) {
      message.error(`Comment not saved!.`, [10]);
      
    }
  };

  return (
    <Form name="basic" onFinish={handleSubmit} autoComplete="off" ref={formRef}> 
    {/* resetleme için ref içinde formRef verildi */}
      <Row gutter={24}>
        <Col span={6}>
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
              size="medium"
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
        </Col>
        <Col span={14}>
          <Form.Item
            name="text"
            rules={[
              {
                required: true,
                message: "Please enter a message!",
              },
            ]}
          >
            <Input disabled={loading} size="medium" placeholder="Message" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item className={styles.buttons}>
            <Button
              disabled={loading}
              size="medium"
              type="primary"
              htmlType="submit"
            >
              Add
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default NewCommentForm;
