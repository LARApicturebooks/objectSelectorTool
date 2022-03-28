import React, { useState, useEffect, useContext, useRef } from "react";
import "cropperjs/dist/cropper.css";
import { VariableContext } from "./Pages";
import Cropper from "cropperjs";
// import "./Demo.css";

var defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const CropperElement = (props) => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  // const [cropper, setCropper] = useState();

  const { setImageURL, imageURL } = useContext(VariableContext);

  let cropper;
  var newImage = document.getElementById("blah");
  if (newImage !== null) {
    newImage.src = props.url;
    cropper = new Cropper(newImage, {
      autoCropArea: 0.25,
      crop: function (e) {
        x = e.detail.x;
        y = e.detail.y;
        width = e.detail.width;
        height = e.detail.height;
      }
    });
  }

  useEffect(() => {
    console.log(props.url);
  }, [props.url]);

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div id="cropperCont">
      <img id="blah" src={image} />
    </div>
  );
};

export default CropperElement;
