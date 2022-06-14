import { Form, Input, InputNumber, Switch, Select, Button } from "antd";
import { getDatabase, query, ref, onValue } from "firebase/database";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { app } from "utils";
import { IMateria } from "utils/interfaces/subject.interface";

const Edit: NextPage = () => {
  const [subjectNames, setSubjectNames] = useState<any>([]);
  const [data, setData] = useState<IMateria>({});
  const [switchValue, setSwitchValue] = useState();
  const [dependenceItems, setDependenceItems] = useState<string[]>([]);
  const [lockItems, setLockItems] = useState<string[]>([]);

  const router = useRouter();
  const { id } = router.query;

  const filteredSubjectOptions = subjectNames.filter(
    (o) => !dependenceItems.includes(o)
  );

  const filteredLockOptions = subjectNames.filter(
    (o) => !lockItems.includes(o)
  );

  const getSubjectNames = () => {
    const db = getDatabase(app);
    const topUserPostsRef = query(ref(db, `subjects/${id}`));
    onValue(topUserPostsRef, (snapshot) => {
      setData(snapshot.val());
    });
  };

  const onFinish = (form) => {
    console.log(form);
  };

  useEffect(() => {
    getSubjectNames();
  }, [id]);

  return (
    <main>
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
          <Input defaultValue={data.name} />
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
            checked={data.optional}
            // onChange={() => setSwitchValue(!switchValue)}
          />
        </Form.Item>

        <Select
          mode="multiple"
          placeholder="dependence"
          defaultValue={data.dependence}
          value={dependenceItems}
          onChange={setDependenceItems}
          style={{ width: "100%" }}
        >
          {filteredSubjectOptions.map((item, i) => (
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
          defaultValue={data.lock}
          onChange={setLockItems}
          style={{ width: "100%" }}
        >
          {filteredLockOptions.map((item, i) => (
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
  );
};

export default Edit;
