import { Space, Table, Tag } from "antd";
import { getDatabase, query, ref, onValue } from "firebase/database";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { app } from "utils";

const Materias: NextPage = () => {
  const [tableData, setTableData] = useState<any>([]);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (name) => <Link href={"/"}>{name}</Link>,
    },
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Horas",
      dataIndex: "hours",
      key: "hours",
    },
    {
      title: "Dependencias",
      key: "dependence",
      dataIndex: "dependence",
      render: (_, { dependence }) => (
        <>
          {dependence?.map((tag) => {
            return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Tranca",
      key: "lock",
      dataIndex: "lock",
      render: (_, { lock }) => (
        <>
          {lock?.map((tag) => {
            return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Período",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Link href={"/edit/materia/" + record.id}>Editar</Link>
          </Space>
        );
      },
    },
  ];

  const getSubjectNames = () => {
    const db = getDatabase(app);
    const topUserPostsRef = query(ref(db, "subjects/"));
    setTableData([]);
    onValue(topUserPostsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        setTableData((subject: any) => [...subject, childData]);
      });
    });
  };

  useEffect(() => {
    getSubjectNames();
  }, []);

  return <Table columns={columns} dataSource={tableData} />;
};

export default Materias;
