import { Button, Result } from "antd";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function index() {
  return (
    <main className={styles.main}>
      <Result
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Link href={"/"} key="console">
            <Button type="primary">Ver todos</Button>
          </Link>,
        ]}
      />
    </main>
  );
}
