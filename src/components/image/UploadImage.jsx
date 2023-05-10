import Label from '@/components/form/Label';
import { DEFAULT } from '@/constants/defaultData';
import React, { useState } from 'react'
import Image from './Image';

const UploadImage = ({className, labelClassName, onChange, locationImage, icon, uploading}) => {
    return (
      <div className={`w-full ${className} ${!locationImage && 'flex items-center justify-center'}`}>
        <Label
          id="location"
          className={`block ${labelClassName} cursor-pointer group !px-0`}
        >
          <Image
            src={!locationImage ? icon : locationImage}
            alt="location"
            className={`overflow-hidden transition-all duration-300 rounded-full hover:brightness-75 ${
              uploading && "animate-bounce"
            }`}
            imageClassName={`${!locationImage && '!w-fit !h-fit'}`} />
        </Label>
  
        <input
          onChange={onChange}
          type="file"
          name="location"
          id="location"
          className="hidden"
        />
      </div>
    )
}

export default UploadImage