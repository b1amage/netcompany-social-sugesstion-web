import Wrapper from "@/components/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "@/components/image/Image";
import Portal from "@/components/HOC/Portal";
import Uploading from "@/components/loading/Uploading";

const ImageUpload = ({ defaultImg }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [ava, setAva] = useState();
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [images, setImages] = useState([]);
  // localStorage.getItem("eventCreateImages")
  //   ? JSON.parse(localStorage.getItem("eventCreateImages"))
  //   : []
  // ""

  console.log("upload", images);

  // useEffect(() => {
  //   // localStorage.setItem("eventCreateImages", JSON.stringify(defaultImg));
  //   // return () => localStorage.removeItem("eventCreateImages");
  // }, []);

  // useEffect(() => {
  //   err !== "" && toast.error(err);
  // }, [err]);
  return (
    <Wrapper className="overflow-x-scroll">
      {uploading && (
        <Portal>
          <Wrapper className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-[9999] flex-center">
            <Uploading />
          </Wrapper>
        </Portal>
      )}

      <Wrapper>
        <label htmlFor="upload">
          <Wrapper className="bg-primary-400 w-[220px] h-[140px] rounded-lg border border-primary-400 bg-opacity-25 border-dashed cursor-pointer hover:brightness-125 flex-center">
            <AiOutlinePlusCircle className="text-2xl text-primary-400" />
          </Wrapper>
        </label>

        <input
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setIsFilePicked(true);
            (async function () {
              setErr("");
              setUploading(true);
              var bodyFormData = new FormData();
              bodyFormData.append("image", e.target.files[0]);
              axios({
                method: "post",
                url:
                  process.env.NODE_ENV === "dev"
                    ? "http://localhost:8080/image/upload-image"
                    : "https://netcompany-social-suggestion-backend.vercel.app/image/upload-image",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
              })
                .then(function (response) {
                  console.log(response);
                  setAva(response.data.image);
                  const eventCreateImages = localStorage.getItem(
                    "eventCreateImages"
                  )
                    ? JSON.parse(localStorage.getItem("eventCreateImages"))
                    : [];

                  console.log(eventCreateImages);

                  eventCreateImages.push(response.data.image);
                  setImages(eventCreateImages);
                  localStorage.setItem(
                    "eventCreateImages",
                    JSON.stringify(eventCreateImages)
                  );
                  setUploading(false);
                })
                .catch(function (err) {
                  console.log(err);
                  setErr("File must be image and smaller than 3mb");
                  setUploading(false);
                });
            })();
          }}
          type="file"
          name="event-imgs-upload"
          id="upload"
          className="hidden"
          accept="image/*"
        />
      </Wrapper>

      {images &&
        images.length > 0 &&
        images.map((item) => (
          <Wrapper className="relative" key={item}>
            <Wrapper
              onClick={() => {
                const newImages = images.filter((it) => item !== it);
                setImages(newImages);
                localStorage.setItem(
                  "eventCreateImages",
                  JSON.stringify(newImages)
                );
              }}
              className="absolute text-red-500 cursor-pointer top-1 right-1"
            >
              <AiFillDelete />
            </Wrapper>
            <Image src={item} className="!w-[220px] !h-[140px] !shrink-0" />
          </Wrapper>
        ))}
    </Wrapper>
  );
};

export default ImageUpload;
