import React, { useState } from "react";

const PicturePicker = ({data, setData}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="text-center">
            {selectedImage && (
                <div>
                <img alt="not fount" width={"150px"} height={'auto'} src={URL.createObjectURL(selectedImage)} className='mb-3 border' />
                <br />
                <button onClick={()=>setSelectedImage(null)} className='btn btn-danger'>Remove</button>
                </div>
            )}
            <br />
            <br /> 
            <input
                type="file"
                id='file'
                name="myImage"
                onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                }}
            />
            <label for="file">choose a file</label>
        </div>
    );
};

export default PicturePicker;