require("dotenv").config();
const cloudinary = require('cloudinary').v2
cloudinary.config({
  secure: true
})
console.log(cloudinary.config().cloud_name);

cloudinary.config({ 
  cloud_name: 'diomo1exc', 
  api_key: '654245661346371', 
  api_secret: 'U42vqvY7FXfhryW-Y0y_MybOv00' 
});

// Node.js SDK Uploader function will return Promise
// cloudinary.uploader
//   .upload("./test_image.jpg", { //THIS IS AN EXAMPLE IMAGE FOR TESTING CODE FUNCTIONALITY (Will work with url as well)
//     // img is default unless specified
//     resource_type: "image",
//     //public_id: "asset name"
//     //tags: ["", "", ""],
//   })
//   .then((result)=>{
//     console.log("Success!", JSON.stringify(result, null, 2));
//   })
//   .catch((error)=> {
//     console.log("error", JSON.stringify(error, null, 2))
//   })

/////////////////////////
// Uploads an image file
/////////////////////////
// const uploadImage = async (imagePath) => {

//   // Use the uploaded file's name as the asset's public ID and 
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//   }
// };

// //////////////////////////////////////////////////////////////
// // Creates an HTML image tag with a transformation that
// // results in a circular thumbnail crop of the image  
// // focused on the faces, applying an outline of the  
// // first color, and setting a background of the second color.
// //////////////////////////////////////////////////////////////
// const createImageTag = (publicId, ...colors) => {
    
//   // Set the effect color and background color
//   const [effectColor, backgroundColor] = colors;

//   // Create an image tag with transformations applied to the src URL
//   let imageTag = cloudinary.image(publicId, {
//     transformation: [
//       { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//       { radius: 'max' },
//       { effect: 'outline:10', color: effectColor },
//       { background: backgroundColor },
//     ],
//   });

//   return imageTag;
// };

// //////////////////
// //
// // Main function
// //
// //////////////////
// (async () => {

//   // Set the image to upload
//   const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

//   // Upload the image
//   const publicId = await uploadImage(imagePath);

//   // Get the colors in the image
//   const colors = await getAssetInfo(publicId);

//   // Create an image tag, using two of the colors in a transformation
//   const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

//   // Log the image tag to the console
//   console.log(imageTag);

// })();