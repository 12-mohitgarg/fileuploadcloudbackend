


const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


//localfileupload -> handler function

exports.localupload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka hadnler
exports.imageupload = async (req, res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.file;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageurl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });

    }
}

//video upload ka handler

exports.videoupload = async (req,res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);
        
        const file = req.files.file;

         //Validation
         const supportedTypes = ["mp4", "mov"];
         const fileType = file.name.split('.')[1].toLowerCase();
         console.log("File Type:", fileType);
 
         //TODO: add a upper limit of 5MB for Video
         if(!isFileTypeSupported(fileType, supportedTypes)) {
             return res.status(400).json({
                 success:false,
                 message:'File format not supported',
             })
         }

          //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageurl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })

    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}

//imageSizeReducer

exports.imageSizeReducer = async (req,res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        //TODO: add a upper limit of 5MB for Video
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        //TODO: height attribute-> COMPRESS
        const response = await uploadFileToCloudinary(file, "Codehelp", 90);
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}












// const File = require("../models/File");
// const cloudinary = require("cloudinary");

// exports.localupload = (req, res) => {
//   try {
//     const file = req.files.file;
//     console.log(file);

//     const path =
//       __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

//     file.mv(path, (error) => {
//       console.log(error);
//     });

//     res.json({
//       success: true,
//       message: "image uploded succesfully",
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: "error while upload local file",
//     });
//   }
// };

// async function fileupload(file, folder) {
//   const options = { folder };
//   console.log("temp file " ,file.tempFilePath);
//   options.resource_type = "auto";
//   return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

// exports.imageupload = async (req, res) => {
//   try {
//     const { name, tags, email } = req.body;
//     const file = req.files.file;
//     console.log(file);

//     const supportedformate = ["png", "jpg", "jpeg"];
//     const filetype = file.name.split(".")[1].toLowerCase();
//     console.log("filetype", filetype);

//     if (!supportedformate.includes(filetype)) {
//       return res.json({
//         success: false,
//         message: "file formate does not supported",
//       });
//     }

//     const uploadfile = await fileupload(file, "fileupload");
//     console.log(uploadfile);

//     const entry = await File.create({
//       name,
//       imageurl: uploadfile.secure_url,
//       tags,
//       email,
//     });

//     return res.json({
//       success: true,
//       imageurl: uploadfile.secure_url,
//       message: "file uploded successfully",
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: "somthing went wrong when iamge upload",
//     });
//   }
// };

// exports.videoupload = async (req, res) => {
//   try {
//     const { name, tags, email } = req.body;
//     const file = req.files.file;
//     console.log(file);

//     const supportedformate = ["mp4", "mov"];
//     const filetype = file.name.split(".")[1];
//     console.log("filetype", filetype);

//     if (!supportedformate.includes(filetype)) {
//       return res.json({
//         success: false,
//         message: "file formate does not supported",
//       });
//     }

//     const uploadfile = await fileupload(file, "fileupload");
//     console.log(uploadfile);

//     const entry = await File.create({
//       name,
//       imageurl: uploadfile.secure_url,
//       tags,
//       email,
//     });

//     return res.json({
//       success: true,
//       imageurl: uploadfile.secure_url,
//       message: "file uploded successfully",
//     });
//   } catch (error) {
//     console.error(error)
//     return res.json({
//       success: false,
//       message: "somthing went wrong when video upload",
//     });
//   }
// };
