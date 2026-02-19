import axios, { AxiosProgressEvent } from "axios";
import {
  UploadUrlResponse,
  Attachment,
  RegisterAttachmentRequest,
} from "@/lib/types/attachment";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUploadUrl(): Promise<UploadUrlResponse> {
  const res = await axios.post(`${BASE_URL}/attachments/upload-url`);
  return res.data;
}

export async function uploadFileToSignedUrl(
  signedUrl: string,
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) {
  const res = await axios.put(signedUrl, file, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
    onUploadProgress,
  });

  return res.data;
}

export async function registerAttachment(
  data: RegisterAttachmentRequest,
): Promise<Attachment> {
  const res = await axios.post(`${BASE_URL}/attachments`, data);
  return res.data;
}
