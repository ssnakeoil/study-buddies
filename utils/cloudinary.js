
require("dotenv").config();
const cloudinary = require('cloudinary').v2
console.log(cloudinary.config().cloud_name);

cloudinary.config({ 
  cloud_name: 'diomo1exc', 
  api_key: '654245661346371', 
  api_secret: 'U42vqvY7FXfhryW-Y0y_MybOv00' 
});

// Node.js SDK Uploader function will return Promise
cloudinary.uploader
  .upload("./test_image.jpg", { //THIS IS AN EXAMPLE IMAGE FOR TESTING CODE FUNCTIONALITY (Will work with url as well)
    // img is default unless specified
    resource_type: "image",
    //public_id: "asset name"
    //tags: ["", "", ""],
  })
  .then((result)=>{
    console.log("Success!", JSON.stringify(result, null, 2));
  })
  .catch((error)=> {
    console.log("error", JSON.stringify(error, null, 2))
  })