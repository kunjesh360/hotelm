const File = require("../model/file");
const { options } = require("../routes/FileUpload");
const cloudinary = require("cloudinary").v2;

// loaclfileUpload->handler function
exports.localfileUpload = async (req, res) => {
    try {
        // fetch file

        const file = req.files.file;
        console.log("file is ", file);

        // server path because stoer in server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path is->", path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local file is Upload successfully"
        })

    } catch (error) {

        console.log("File is not Uploaded ");
        console.error(error)
        res.json({
            success: false,
            message: "File is not uploaded"
        })

    }
}






function isfiletypesupported(type, supportedTypes) {
    return supportedTypes.includes(type)
}

async function uploadfileTocloudinary(file, folder, quality) {
    const options = { folder };
    // autometic check which type of file
    options.resource_type = "auto";
    // console.log("file path ->"+file.tempFilePath);

    if (quality) {
        options.quality = quality;
        // console.log("quality is->"+options.quality + "" +quality);
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}







exports.imageUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation 
        const supportedTypes = ["jpg", "jpeg", "png"];
        const type = file.name.split('.')[1].toLowerCase();



        if (!isfiletypesupported(type, supportedTypes)) {
            return res.status(500).json({
                success: false,
                message: "File type is not supported"
            })
        }

        // file format is supported 
        const response = await uploadfileTocloudinary(file, "MitFile");
        console.log(response)


        // store in db
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully Uploaded"
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Somthing went wrong",
        })

    }
}



exports.videoUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        // validation 
        const supportedTypes = ["mov", "mp4"];
        const type = file.name.split('.')[1].toLowerCase();



        if (!isfiletypesupported(type, supportedTypes)) {
            return res.status(500).json({
                success: false,
                message: "File type is not supported"
            })
        }

        // file format is supported 
        const response = await uploadfileTocloudinary(file, "MitFile");
        console.log(response)


        // store in db
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "video successfully Uploaded"
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Somthing went wrong",
        })

    }
}



exports.imagesizereduser = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation 
        const supportedTypes = ["jpg", "jpeg", "png"];
        const type = file.name.split('.')[1].toLowerCase();



        if (!isfiletypesupported(type, supportedTypes)) {
            return res.status(500).json({
                success: false,
                message: "File type is not supported"
            })
        }

        // file format is supported 
        const response = await uploadfileTocloudinary(file, "MitFile", 30);
        console.log(response)


        // store in db
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully Uploaded"
        })



    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Somthing went wrong",
        })

    }
}
