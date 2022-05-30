import { randomUUID } from "crypto";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "@utils";

function writeUserData(data: IStudent) {
  const userId = randomUUID();
  const db = getDatabase(app);

  set(ref(db, "students/" + userId), data);
}

export default writeUserData;
