import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  Select,
  Tag,
  Typography,
  Skeleton,
  Space,
  Divider,
  message,
} from "antd";

import {
  PlusOutlined,
  UserOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { getDatabase, onValue, query, ref, set } from "firebase/database";
import { app } from "utils";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";
import FormItem from "antd/lib/form/FormItem";

const Home: NextPage = () => {
  const [profile, setProfile] = useState<any>({});

  const router = useRouter();
  const key = "updatable";

  const addToFirebase = (values: any) => {
    const userId = uuid();
    const db = getDatabase(app);

    set(ref(db, "students/" + userId), { id: userId, ...values });
  };

  const checkDuplicityOnDatabase = (values: any) => {
    let duplicates = false;
    const db = getDatabase(app);
    const topUserPostsRef = query(ref(db, "students"));
    onValue(topUserPostsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.name == values.name) {
          duplicates = true;
        }
      });
    });
    if (duplicates) {
      openErrorMessage("ja existe a piranha no banco");
      return;
    }

    !duplicates && addToFirebase(values);
    router.push("/success");
    openMessage("pronto, foi");
  };

  const onFinish = async (values: any) => {
    checkDuplicityOnDatabase(values);
  };

  const openErrorMessage = (contentMessage: any) => {
    message.error({ content: contentMessage, key, duration: 2 });
  };
  const openMessage = (contentMessage: any) => {
    message.success({ content: contentMessage, key, duration: 2 });
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Santa Sala CMS</title>
          <meta name="description" content="CMS de adição da Santa Sala" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.profileContent}>
            <Image
              alt="banner"
              style={{
                zIndex: 1,
                bottom: -80,
                objectFit: "cover",
              }}
              width={400}
              height={200}
              src={profile?.banner}
            />
            <Avatar
              size={120}
              style={{
                zIndex: 2,
                transform: "translateY(-50%)",
              }}
              icon={<UserOutlined />}
              src={profile?.profile}
            />
            <Space
              direction="vertical"
              size="small"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography.Title>
                {profile?.nickname || <Skeleton.Input />}
              </Typography.Title>
              <Typography>
                {profile?.name || <Skeleton.Input size={"small"} />}
              </Typography>
              <Typography.Text italic>{profile?.phrase}</Typography.Text>
              <div>
                {profile?.tags?.map((tag: string, key: number) => (
                  <Tag
                    key={key}
                    color={tag == profile?.mastertag ? "red" : "volcano"}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
              <Typography.Text strong>{profile?.description}</Typography.Text>
            </Space>
          </div>
          <div className={styles.containerContent}>
            <Form
              name="basic"
              style={{
                width: "100%",
                height: "70vh",
                paddingRight: 24,
              }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Typography.Title>Dados</Typography.Title>
              <div
                style={{
                  width: "60%",
                  height: "80vh",
                  overflowY: "scroll",
                  paddingRight: 24,
                }}
              >
                <Form.Item name="banner">
                  <Input
                    required
                    type={"url"}
                    placeholder="Banner"
                    onChange={(e) => {
                      setProfile({ ...profile, banner: e.target.value });
                    }}
                  />
                </Form.Item>

                <Form.Item name="profile">
                  <Input
                    type={"url"}
                    placeholder="Perfil"
                    onChange={(e) => {
                      setProfile({ ...profile, profile: e.target.value });
                    }}
                  />
                </Form.Item>

                <Form.Item name="nickname">
                  <Input
                    required
                    placeholder="Nick"
                    onChange={(e) => {
                      setProfile({ ...profile, nickname: e.target.value });
                    }}
                  />
                </Form.Item>

                <Form.Item name="name">
                  <Input
                    required
                    placeholder="Nome"
                    onChange={(e) => {
                      setProfile({ ...profile, name: e.target.value });
                    }}
                  />
                </Form.Item>

                <Form.List name="social">
                  {() => (
                    <div>
                      <Form.Item name="twitter">
                        <Input placeholder="twitter" />
                      </Form.Item>
                      <Form.Item name="facebook">
                        <Input placeholder="facebook" />
                      </Form.Item>
                      <Form.Item name="instagram">
                        <Input placeholder="instagram" />
                      </Form.Item>
                      <Form.Item name="linkedin">
                        <Input placeholder="linkedin" />
                      </Form.Item>
                      <Form.Item name="github">
                        <Input placeholder="github" />
                      </Form.Item>
                    </div>
                  )}
                </Form.List>

                <Form.Item name="phrase">
                  <Input
                    required
                    placeholder="Frase"
                    onChange={(e) =>
                      setProfile({ ...profile, phrase: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item name="tags">
                  <Select
                    placeholder="Tags"
                    mode="tags"
                    style={{ width: "100%" }}
                    onChange={(e) => setProfile({ ...profile, tags: e })}
                    tokenSeparators={[","]}
                  ></Select>
                </Form.Item>
                <Form.Item name="mastertag">
                  <Select
                    placeholder="mastertag"
                    onChange={(e) => setProfile({ ...profile, mastertag: e })}
                  >
                    {profile.tags?.map((tag: any, key: any) => (
                      <Select.Option key={tag}>{tag}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="description">
                  <Input.TextArea
                    required
                    placeholder="Descrição do vagabundo"
                    onChange={(e) =>
                      setProfile({ ...profile, description: e.target.value })
                    }
                  />
                </Form.Item>
                <Divider />
                <Typography.Title level={4}>Frases</Typography.Title>
                <Form.List name="phrases">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            width: "10  0%",
                            alignItems: "center",
                            marginBottom: 20,
                          }}
                        >
                          <Form.Item name={name} {...restField} noStyle>
                            <Input placeholder="Frase" required />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add frase
                      </Button>
                    </>
                  )}
                </Form.List>
                <Typography.Title level={4}>Galeria</Typography.Title>
                <Form.List name="gallery">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            width: "10  0%",
                            alignItems: "center",
                            marginBottom: 20,
                          }}
                        >
                          <Form.Item name={name} {...restField} noStyle>
                            <Input placeholder="foto" required />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add foto
                      </Button>
                    </>
                  )}
                </Form.List>
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
