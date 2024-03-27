import cloudinary from "./cloudinary";

const folder = "Snave blog Images";

export const uploadSingle = async <T>(image: T) => {
  try {
    const result = await cloudinary.uploader.upload(image as string, {
      folder,
    });
    return result;
  } catch (error) {
    const err = (error as Error ).message;
    return { error: err };
  }
};
