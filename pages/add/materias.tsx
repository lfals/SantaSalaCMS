import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import { getDatabase, onValue, query, ref, set } from "firebase/database";
import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { app } from "utils";
import { uuid } from "uuidv4";
import styles from "../../styles/Home.module.css";

const Index: NextPage = () => {
  const [subjectNames, setSubjectNames] = useState<any>([]);
  const [switchValue, setSwitchValue] = useState(false);

  const [dependenceItems, setDependenceItems] = useState<string[]>([]);
  const [lockItems, setLockItems] = useState<string[]>([]);

  const filteredSubjectOptions = subjectNames.filter(
    (o: any) => !dependenceItems.includes(o)
  );

  const filteredLockOptions = subjectNames.filter(
    (o: any) => !lockItems.includes(o)
  );

  const addToFirebase = (values: any) => {
    const subjectId = uuid();
    const db = getDatabase(app);

    set(ref(db, "subjects/" + subjectId), { id: subjectId, ...values });
  };

  const onFinish = (form: any) => {
    const data = {
      ...form,
      optional: switchValue,
      dependence: dependenceItems,
      lock: lockItems,
    };

    addToFirebase(data);

    console.log(data);
  };

  const getSubjectNames = () => {
    const db = getDatabase(app);
    const topUserPostsRef = query(ref(db, "subjects/"));
    setSubjectNames([]);
    onValue(topUserPostsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        console.log(childData);
        setSubjectNames((subjectNames: any) => [
          ...subjectNames,
          childData.name,
        ]);
      });
    });
  };

  useEffect(() => {
    getSubjectNames();
  }, []);

  return (
    <>
      <Head>
        <title>Santa Sala CMS</title>
        <meta name="description" content="CMS de adição da Santa Sala" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Form
          name="basic"
          style={{
            width: "25%",
            height: "70vh",
            paddingRight: 24,
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Nome" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Codigo" name="code">
            <Input />
          </Form.Item>
          <Form.Item label="Descrição" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="CH" name="hours">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Período" name="period">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Switch" valuePropName="checked">
            <Switch
              checked={switchValue}
              onChange={() => setSwitchValue(!switchValue)}
            />
          </Form.Item>

          <Select
            mode="multiple"
            placeholder="dependence"
            value={dependenceItems}
            onChange={setDependenceItems}
            style={{ width: "100%" }}
          >
            {filteredSubjectOptions.map((item: any, i: any) => (
              <Select.Option key={i} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          <Select
            mode="tags"
            placeholder="lock"
            tokenSeparators={[","]}
            value={lockItems}
            onChange={setLockItems}
            style={{ width: "100%" }}
          >
            {filteredLockOptions.map((item: any, i: any) => (
              <Select.Option key={i} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
};

export default Index;
