import axios from "axios";

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fiverr");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/abhisonicode/image/upload",
      formData
    );
    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default uploadFile;
