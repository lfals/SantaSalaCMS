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
        title="Pronto ta adicionado, feliz?"
        subTitle="xereca cu"
        extra={[
          <Link href={"/add"} key="console">
            <Button type="primary">Adicionar mais</Button>
          </Link>,
        ]}
      />
    </main>
  );
}
