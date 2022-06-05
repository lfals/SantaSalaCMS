import {
  getDatabase,
  query,
  limitToLast,
  ref,
  equalTo,
  onValue,
  get,
} from "firebase/database";
import { app } from "@utils";

async function getUserData(name: string) {
  let duplicates = false;
  const db = getDatabase(app);
  const topUserPostsRef = query(ref(db, "students"));
  onValue(topUserPostsRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      duplicates = childData.name == name;
    });
  });

  return duplicates;
}

export default getUserData;
