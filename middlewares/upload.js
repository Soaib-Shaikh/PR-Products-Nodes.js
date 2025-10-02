const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cludinary");

// Dynamic Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "general";

    if (req.baseUrl.includes("/category")) folder = "categories";
    else if (req.baseUrl.includes("/sub-category")) folder = "subcategories";
    else if (req.baseUrl.includes("/ext-category")) folder = "extra-categories";
    else if (req.baseUrl.includes("/addProduct") || req.baseUrl.includes("/edit")) folder = "products";

    return {
      folder,
      format: file.mimetype.split("/")[1], // jpg/png/webp
      public_id: Date.now() + "-" + file.originalname.split(".")[0]
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
