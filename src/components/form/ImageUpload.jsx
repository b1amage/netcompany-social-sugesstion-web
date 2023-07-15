import React, { useState, useEffect, useCallback } from "react";
import Wrapper from "@/components/wrapper/Wrapper";
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Image from "@/components/image/Image";
import Portal from "@/components/HOC/Portal";
import Uploading from "@/components/loading/Uploading";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [images, setImages] = useState(
    JSON.parse(localStorage.getItem("eventCreateImages")) || []
  );

  const uploadImage = useCallback(
    async (file) => {
      setErr("");
      setUploading(true);
      var bodyFormData = new FormData();
      bodyFormData.append("image", file);

      try {
        const response = await axios({
          method: "post",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:8080/image/upload-image"
              : "https://netcompany-social-suggestion-backend.vercel.app/image/upload-image",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        const newImages = [...images, response.data.image];
        setImages(newImages);
        localStorage.setItem("eventCreateImages", JSON.stringify(newImages));
      } catch (error) {
        console.log(error);
        setErr("File must be image and smaller than 3mb");
      } finally {
        setUploading(false);
      }
    },
    [images]
  );

  const handleFileChange = useCallback((e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
    e.target.value = null;
  }, []);

  useEffect(() => {
    if (isFilePicked) {
      uploadImage(selectedFile);
      setIsFilePicked(false);
    }
  }, [isFilePicked, selectedFile, uploadImage]);

  const deleteImage = useCallback(
    (item) => {
      const newImages = images.filter((it) => item !== it);
      setImages(newImages);
      localStorage.setItem("eventCreateImages", JSON.stringify(newImages));
    },
    [images]
  );

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
          onChange={handleFileChange}
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
              onClick={() => deleteImage(item)}
              className="absolute text-red-500 cursor-pointer top-1 right-1"
            >
              <AiFillDelete />
            </Wrapper>
            <Image src={item} className="!w-[220px] !h-[140px] !shrink-0" />
          </Wrapper>
        ))}
      {err && <p>{err}</p>}
    </Wrapper>
  );
};

export default ImageUpload;
