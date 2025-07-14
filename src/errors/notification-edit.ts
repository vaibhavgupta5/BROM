import { TemplateType } from "@/constants/formTemplates";
import { toast } from "sonner";

export const validateNotifications = (template: TemplateType): boolean => {
  const apiKey = template?.custom?.resendApiKey?.trim();
  if (!apiKey) {
    toast.error("Resend API Key is required",{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  const ownerEmailsRaw = template?.custom?.ownerEmails?.trim();
  if (!ownerEmailsRaw) {
    toast.error("Owner email is required",{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  const emails = ownerEmailsRaw.split(",").map((e) => e.trim()).filter(Boolean);
  if (emails.length === 0) {
    toast.error("Owner email list cannot be empty",{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  const invalids = emails.filter(
    (e) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(e)
  );
  if (invalids.length > 0) {
    toast.error(`Invalid email(s): ${invalids.join(", ")}`,{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  const userEmailField = template?.custom?.userEmailField?.trim();
  if (!userEmailField) {
    toast.error("Select an email field from the form",{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  if (!template?.custom?.userEmailSubject?.trim()) {
    toast.error("User email subject cannot be empty",{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  if (!template?.custom?.ownerEmailSubject?.trim()) {
    toast.error("Owner email subject cannot be empty",{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  if (!template?.custom?.userEmailBody?.trim()) {
    toast.error("User email body cannot be empty",{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  if (!template?.custom?.ownerEmailBody?.trim()) {
    toast.error("Owner email body cannot be empty",{
        position: "bottom-left",
        duration: 3000,
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
    });
    return false;
  }

  return true;
};
