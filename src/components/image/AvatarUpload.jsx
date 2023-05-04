import React, { useEffect, useState } from "react";
import axios from "axios";

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [ava, setAva] = useState(
    "https://res.cloudinary.com/dxcgirgcy/image/upload/v1683168039/avatar_yiyczj.png"
  );

  // useEffect(() => {
  //   console.log(ava);
  // }, [ava]);

  return (
    <form>
      <label
        htmlFor="avatar"
        className="block cursor-pointer group mx-auto relative my-8 w-[124px] h-[124px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
      >
        <img
          src={ava}
          alt=""
          className="object-cover w-full h-full overflow-hidden transition-all duration-300 rounded-full hover:brightness-75"
        />
      </label>

      <input
        onChange={(e) => {
          console.log(isFilePicked);
          setSelectedFile(e.target.files[0]);
          setIsFilePicked(true);
          console.log(selectedFile);

          const postImg = async () => {
            var bodyFormData = new FormData();
            bodyFormData.append("image", e.target.files[0]);
            axios({
              method: "post",
              url: "http://localhost:8080/image/upload-image",
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function (response) {
                //handle success
                console.log(response);
                setAva(response.data.image);
                localStorage.setItem("avatar", response.data.image);
              })
              .catch(function (response) {
                //handle error
                console.log(response);
              });
          };

          postImg();
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
