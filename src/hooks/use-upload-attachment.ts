import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getUploadUrl,
  uploadFileToSignedUrl,
  registerAttachment,
} from "@/lib/services/attachments.service";
import { UploadItem, Attachment } from "@/lib/types/attachment";

export function useUploadAttachment(
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadItem[]>>,
) {
  return useMutation<Attachment, Error, UploadItem>({
    mutationFn: async (item: UploadItem) => {
      // get upload url
      const { key, signedUrl } = await getUploadUrl();

      // upload file with progress
      await uploadFileToSignedUrl(signedUrl, item.file, (progressEvent) => {
        if (!progressEvent.total) return;
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );

        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.file === item.file
              ? { ...f, progress: percent, status: "uploading" }
              : f,
          ),
        );
      });

      // register attachment
      const attachment = await registerAttachment({
        key,
        fileName: item.file.name,
        fileSize: item.file.size,
        mimeType: item.file.type,
      });

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.file === item.file
            ? {
                ...f,
                status: "success",
                attachmentId: attachment.id,
                progress: 100,
              }
            : f,
        ),
      );

      return attachment;
    },
    onError: (error, item) => {
      setUploadedFiles((prev) =>
        prev.map((f) => (f.file === item.file ? { ...f, status: "error" } : f)),
      );
      toast.error(`Upload failed: ${item.file.name}`, { duration: 2000 });
      console.error("Upload failed", error);
    },
    onSuccess: (attachment, item) => {
      toast.success(`Uploaded successfully: ${item.file.name}`, {
        duration: 2000,
      });
    },
  });
}
