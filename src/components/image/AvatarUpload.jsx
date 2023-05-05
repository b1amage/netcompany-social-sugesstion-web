import { useState } from "react";
import axios from "axios";
import { DEFAULT } from "@/constants/defaultData";

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [ava, setAva] = useState(DEFAULT.avatar);
  const [uploading, setUploading] = useState(false);

  return (
    <form>
      <label
        htmlFor="avatar"
        className="block cursor-pointer group mx-auto relative my-8 w-[124px] h-[124px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
      >
        <img
          src={ava}
          alt="user avatar"
          className={`object-cover w-full h-full overflow-hidden transition-all duration-300 rounded-full hover:brightness-75 ${
            uploading && "animate-bounce"
          }`}
        />
      </label>

      <input
        onChange={(e) => {
          console.log(isFilePicked);
          setSelectedFile(e.target.files[0]);
          setIsFilePicked(true);
          console.log(selectedFile);

          (async function () {
            setUploading(true);
            var bodyFormData = new FormData();
            bodyFormData.append("image", e.target.files[0]);
            axios({
              method: "post",
              url: "",
              // process.env.NODE_ENV === "dev"
              //   ? "http://localhost:8080/image/upload-image"
              //   : "https://netcompany-social-suggestion-backend.vercel.app/image/upload-image",
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function (response) {
                console.log(response);
                setAva(response.data.image);
                localStorage.setItem("avatar", response.data.image);
                setUploading(false);
              })
              .catch(function (response) {
                console.log(response);
                setUploading(false);
              });
          })();
        }}
        type="file"
        name="avatar"
        id="avatar"
        className="hidden"
      />
    </form>
  );
};

export default AvatarUpload;
