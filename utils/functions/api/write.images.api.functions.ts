import { getStorage, ref, uploadBytes } from "firebase/storage";

const writeImage = (file: Blob) => {
  const storage = getStorage();
  const storageRef = ref(storage);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};
export default writeImage;
