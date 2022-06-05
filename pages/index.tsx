import { Avatar, Card, Col, Image, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import {} from "@ant-design/icons";
import styles from "../styles/Home.module.css";
import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "utils";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <main className={styles.main}>
        <div style={{ width: "80%", marginBottom: 48, paddingBottom: 120 }}>
          <Typography.Title>Foda ne</Typography.Title>

          <Link href="/add">add la no bagulho</Link>
        </div>
      </main>
    </>
  );
}
