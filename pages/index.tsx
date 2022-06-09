import { Avatar, Button, Card, Col, Image, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import {} from "@ant-design/icons";
import styles from "../styles/Home.module.css";
import { getDatabase, onValue, query, ref } from "firebase/database";
import { app } from "utils";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <main className={styles.main}>
        <div style={{ width: "80%", marginBottom: 48, paddingBottom: 120 }}>
          <Typography.Title>Foda ne</Typography.Title>

          <Button>
            <Link href="/add/aluno">Adicionar Aluno</Link>
          </Button>
          <Button>
            <Link href="/add/professor">Adicionar Professor</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
