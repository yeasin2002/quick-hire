import ImageKit, { toFile } from "@imagekit/nodejs";
import { env } from "@/lib/env";
import { HttpError } from "@/lib/http/errors";

type UploadImageOptions = {
  fileBuffer: Buffer;
  fileName: string;
  folder?: string;
};

const createImageKitClient = (): ImageKit => {
  if (!env.IMAGEKIT_PRIVATE_KEY) {
    throw new HttpError(
      503,
      "IMAGE_UPLOAD_UNAVAILABLE",
      "Image upload is not configured. Set IMAGEKIT_PRIVATE_KEY to enable uploads.",
    );
  }

  const options: {
    privateKey: string;
    publicKey?: string;
    urlEndpoint?: string;
  } = {
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
  };

  if (env.IMAGEKIT_PUBLIC_KEY) {
    options.publicKey = env.IMAGEKIT_PUBLIC_KEY;
  }

  if (env.IMAGEKIT_URL_ENDPOINT) {
    options.urlEndpoint = env.IMAGEKIT_URL_ENDPOINT;
  }

  return new ImageKit(options);
};

export const uploadImageToImageKit = async ({
  fileBuffer,
  fileName,
  folder,
}: UploadImageOptions) => {
  const imageKit = createImageKitClient();
  const file = await toFile(fileBuffer, fileName);

  const response = await imageKit.files.upload({
    file,
    fileName,
    ...(folder ? { folder } : {}),
    useUniqueFileName: true,
  });

  return {
    fileId: response.fileId,
    name: response.name,
    url: response.url,
    thumbnailUrl: response.thumbnailUrl,
    height: response.height,
    width: response.width,
  };
};

