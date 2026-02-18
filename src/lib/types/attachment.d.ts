// URL res
export interface UploadUrlResponse {
  key: string;
  signedUrl: string;
  expiresIn: number;
}

// File res
export interface UploadFileResponse {
  success: boolean;
  key: string;
  message: string;
}

// Register Attachment req
export interface RegisterAttachmentRequest {
  key: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

// Attachment
export interface Attachment {
  id: string;
  key: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

// upload status
export type UploadStatus = "idle" | "uploading" | "success" | "error";

// upload item
export interface UploadItem {
  file: File;
  progress: number;
  status: UploadStatus;
  attachmentId?: string;
}
