"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import {
  FieldType,
  formTemplates,
  TemplateType,
} from "@/constants/formTemplates";
import { Check, ChevronLeft, ChevronRight, Plus, XIcon } from "lucide-react";
import { isValidURL } from "@/lib/utils";
import AddFieldForm from "@/components/add-new-field";
import { useFormStore } from "@/store/formStore";
import { validateNotifications } from "@/errors/notification-edit";
import axios from "axios";

interface ButtonField {
  label: string;
  wrapper?: string;
  style?: string;
  alignment?: "left" | "center" | "right";
  redirectUrl?: string;
}

export default function EditorPage() {
  const [fields, setFields] = useState<FieldType[]>([]);
  const [submitButton, setSubmitButton] = useState<ButtonField | undefined>();
  const [template, setTemplate] = useState<TemplateType | null>(null);
  const [selected, setSelected] = useState<FieldType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addBelow, setAddBelow] = useState<string>("");
  const { setCurrTemplate, getFormById } = useFormStore();
  const params = useParams();
  const formId = params.id;

  const getForm = (id: string) => {
    const template = formTemplates.find((form) => form.id.toString() === id);
    if (!template) {
      const form = getFormById(id);
      return form;
    }
    return template;
  };

  useEffect(() => {
    if (template) {
      setCurrTemplate(template);
    }
  }, [template]);

  useEffect(() => {
    if (!formId) return;

    const fetchForm = async () => {
      const form = await getForm(formId as string);

      if (form) {
        setTemplate(form as TemplateType);
        setCurrTemplate(form as TemplateType);
        setFields((form as TemplateType).fields as FieldType[]);
        setSubmitButton((form as TemplateType).submitButton as ButtonField);
      } else {
        console.error("Form not found");
      }
    };

    fetchForm();
  }, [formId]);


  const saveTemplate = async (template: TemplateType | null) => {
    if (!template) return;

    try {
      const response = await axios.post("/api/createTemplate", template);
      setCurrTemplate(response.data);
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  const addField = (field: Omit<FieldType, "id">) => {
    const newField = { ...field, id: uuidv4() };
    let newFields: FieldType[];

    if (addBelow) {
      const idx = fields.findIndex((f) => f.id === addBelow);
      if (idx !== -1) {
        newFields = [
          ...fields.slice(0, idx + 1),
          newField,
          ...fields.slice(idx + 1),
        ];
      } else {
        newFields = [...fields, newField];
      }
    } else {
      newFields = [...fields, newField];
    }

    setFields(newFields);
    setSelected(newField);
    setTemplate((prev) => (prev ? { ...prev, fields: newFields } : null));

    setDialogOpen(false);
    setAddBelow("");
  };

  const updateTemplateCustomStyle = (key: string, value: string) => {
    if (!template) return;

    const updatedTemplate: TemplateType = {
      ...template,
      custom: {
        ...(template.custom || {}),
        [key]: value,
      },
    };

    setTemplate(updatedTemplate);
    if (updatedTemplate.submitButton) {
      setSubmitButton(updatedTemplate.submitButton);
    }
  };

  const updateField = (field: FieldType) => {
    setFields((prev) => prev.map((f) => (f.id === field.id ? field : f)));
    setSelected(field);
  };

  const deleteField = (id: string | undefined) => {
    if (!id) return;
    setFields((prev) => prev.filter((f) => f.id !== id));
    setSelected(null);
  };

  const handleFieldClick = (field: FieldType, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelected(field);
  };

  const handleAddFieldClick = (fieldId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDialogOpen(true);
    setAddBelow(fieldId);
  };

  const handleDeleteFieldClick = (fieldId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    deleteField(fieldId);
  };

  const getButtonAlignment = () => {
    const alignment =
      template?.custom?.buttonAlignment ||
      template?.submitButton?.alignment ||
      "left";
    switch (alignment) {
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      default:
        return "justify-start";
    }
  };

  const getButtonStyle = () => {
    const baseStyle = submitButton?.style || "";
    const customStyles = [];

    if (template?.custom?.buttonColor) {
      customStyles.push(`background-color: ${template.custom.buttonColor}`);
    }
    if (template?.custom?.buttonTextColor) {
      customStyles.push(`color: ${template.custom.buttonTextColor}`);
    }
    if (template?.custom?.buttonHeight) {
      customStyles.push(`height: ${template.custom.buttonHeight}px`);
    }
    if (template?.custom?.buttonWidth) {
      customStyles.push(`width: ${template.custom.buttonWidth}%`);
    }

    return {
      className: baseStyle,
      style: customStyles.length > 0 ? customStyles.join("; ") : undefined,
    };
  };

  const [currSection, setCurrSection] = useState("form");

  const handlePrevSectionChange = (value: string) => {
    if (value === "notifications") {
      setCurrSection("form");
    } else if (value === "integrate") {
      setCurrSection("notifications");
    }
  };

  const handleNextSectionChange = (value: string) => {
    if (value === "notifications") {
      setCurrSection("form");
    } else if (value === "integrate") {
      setCurrSection("notifications");
    } else if (value === "finish") {
      setCurrSection("integrate");
    }
  };

  if (!formId) {
    return <div className="p-4">Form ID is required</div>;
  }

  return (
    <div className="bg-[#F5F5F5]">
      <header className="w-full px-6 py-4 flex items-center justify-between border-b bg-white shadow-sm">
        <button
          className="text-sm flex justify-center items-center bg-white text-black px-4 py-2 rounded border-1 border-white hover:border-black cursor-pointer   transition-colors"
          onClick={() => handlePrevSectionChange(currSection)}
        >
          <ChevronLeft className=" w-4 h-4" /> Back
        </button>
        <h1 className="text-lg font-bold text-gray-800">brom</h1>
        <div className="flex items-center gap-2">
          <button
            className="text-sm flex justify-center items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => {
              handleNextSectionChange(currSection);
            }}
          >
            <span>Next</span> <ChevronRight className="ml-2 w-4 h-4" />
          </button>
          <button
            className="text-sm flex justify-center items-center bg-white text-black border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors cursor-pointer"
            onClick={() => {
              saveTemplate(template);
            }}
          >
            <span>Save</span> <Check className="ml-2 w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex  bg-muted">
        {currSection === "form" && (
          <aside className="w-1/5 border-r border-gray-200 bg-white p-4 space-y-4">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Components
              </h2>
              <div className="space-y-2">
                {fields.map((field) => (
                  <Button
                    key={field.id}
                    variant="outline"
                    className="w-full justify-start text-sm font-medium hover:bg-gray-100 transition-all"
                    onClick={() => setSelected(field)}
                  >
                    {field.label ||
                      field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </aside>
        )}

        <main className="flex-1 space-y-6 min-h-screen  overflow-y-auto">
          <Tabs
            defaultValue={currSection}
            value={currSection}
            onValueChange={(value) => {
              if (value === "form") {
                setCurrTemplate(template);
              }
              setCurrSection(value);
            }}
          >
            <TabsList className="grid w-full grid-cols-3 rounded-lg  p-1 text-black">
              <TabsTrigger
                value="form"
                className="data-[state=active]:bg-black data-[state=active]:text-white text-black hover:text-black/80 rounded-md transition-all px-3 py-2 text-sm cursor-pointer font-medium"
              >
                Form
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-black data-[state=active]:text-white text-black hover:text-black/80 rounded-md transition-all px-3 py-2 text-sm cursor-pointer font-medium"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="integrate"
                className="data-[state=active]:bg-black data-[state=active]:text-white text-black hover:text-black/80 rounded-md transition-all px-3 py-2 text-sm cursor-pointer font-medium"
              >
                Integrate
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="p-4  ">
              <div
                className="bg-white  rounded-lg border p-6 max-w-2xl mx-auto"
                style={{
                  backgroundColor: template?.custom?.formColor || "#FFFFFF",
                }}
              >
                {fields.map((field, index) => (
                  <div
                    key={field.id || index}
                    className={`group relative ${
                      field.style?.wrapper || "mb-4"
                    } cursor-pointer border border-dashed hover:border-black rounded-md p-4 ${
                      selected?.id === field.id
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                    onClick={(e) => handleFieldClick(field, e)}
                  >
                    {field.type !== "checkbox" && (
                      <label
                        style={{
                          color: template?.custom?.labelColor || "#000000",
                        }}
                        className={
                          field.style?.label ||
                          "block text-sm font-medium text-gray-700"
                        }
                      >
                        {field.label}
                      </label>
                    )}

                    {field.type === "textarea" ? (
                      <Textarea
                        placeholder={field.placeholder}
                        className={
                          field.style?.input ||
                          "mt-1 border border-gray-300 rounded-md p-2 w-full"
                        }
                        style={
                          {
                            backgroundColor:
                              template?.custom?.inputBoxColor || "#FFFFFF",
                            color:
                              template?.custom?.inputTextColor || "#000000",
                            "--placeholder-color":
                              template?.custom?.placeholderColor || "#9CA3AF",
                          } as React.CSSProperties
                        }
                        readOnly
                      />
                    ) : field.type === "text" ||
                      field.type === "email" ||
                      field.type === "number" ||
                      field.type === "date" ? (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        className={
                          field.style?.input ||
                          "mt-1 border border-gray-300 rounded-md p-2 w-full"
                        }
                        style={
                          {
                            backgroundColor:
                              template?.custom?.inputBoxColor || "#FFFFFF",
                            color:
                              template?.custom?.inputTextColor || "#000000",
                            "--placeholder-color":
                              template?.custom?.placeholderColor || "#9CA3AF",
                          } as React.CSSProperties
                        }
                        readOnly
                      />
                    ) : field.type === "select" ? (
                      <select
                        className={
                          field.style?.input ||
                          "mt-1 border border-gray-300 rounded-md p-2 w-full"
                        }
                        style={{
                          backgroundColor:
                            template?.custom?.inputBoxColor || "#FFFFFF",
                          color: template?.custom?.inputTextColor || "#000000",
                        }}
                        disabled
                      >
                        {field.selectOptions?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <div className="flex w-full items-center">
                        <input type="checkbox" disabled />
                        <span className="ml-2">{field.label}</span>
                      </div>
                    ) : field.type === "tel" ? (
                      <Input
                        type="tel"
                        placeholder={field.placeholder}
                        className={
                          field.style?.input ||
                          "mt-1 border border-gray-300 rounded-md p-2 w-full"
                        }
                        style={
                          {
                            backgroundColor:
                              template?.custom?.inputBoxColor || "#FFFFFF",
                            color:
                              template?.custom?.inputTextColor || "#000000",
                            "--placeholder-color":
                              template?.custom?.placeholderColor || "#9CA3AF",
                          } as React.CSSProperties
                        }
                        readOnly
                      />
                    ) : null}

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 gap-2 hidden group-hover:flex">
                      <button
                        className="flex items-center justify-center w-8 h-8 bg-black hover:bg-gray-600 cursor-pointer text-white rounded-full"
                        onClick={(e) => handleAddFieldClick(field.id || "", e)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <button
                        className="flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded-full"
                        onClick={(e) =>
                          handleDeleteFieldClick(field.id || "", e)
                        }
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {submitButton && (
                  <div
                    className={`${
                      submitButton.wrapper || "mt-6"
                    } flex w-full ${getButtonAlignment()}`}
                  >
                    <button
                      type="submit"
                      className={getButtonStyle().className}
                      style={{
                        backgroundColor:
                          template?.custom?.buttonColor || "#000000",
                        color: template?.custom?.buttonTextColor || "#FFFFFF",
                        height: `${template?.custom?.buttonHeight || 40}px`,
                        width: `${template?.custom?.buttonWidth || 100}%`,
                      }}
                    >
                      {submitButton.label}
                    </button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="p-4">
              <div className="max-w-full mx-auto space-y-6">
                {/* Resend API Key Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6a2 2 0 012-2m0 0V9a2 2 0 012-2m-2 2h6m-6 0a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2h-6z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      API Configuration
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resend API Key
                      </label>
                      <Input
                        placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        value={template?.custom?.resendApiKey || ""}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "resendApiKey",
                            e.target.value
                          )
                        }
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm text-blue-800">
                            Need an API key? Get started with{" "}
                            <a
                              href="https://resend.com/docs"
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium underline hover:text-blue-900"
                            >
                              Resend Documentation
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* User Email Section */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          User Confirmation Email
                        </h3>
                        <p className="text-sm text-gray-600">
                          Automatically sent to users who submit the form
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Subject
                        </label>
                        <Input
                          placeholder="Thank you for your submission"
                          value={template?.custom?.userEmailSubject || ""}
                          onChange={(e) =>
                            updateTemplateCustomStyle(
                              "userEmailSubject",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Body
                        </label>
                        <Textarea
                          rows={6}
                          placeholder="Hi {{name}},&#10;&#10;Thank you for submitting the form! We've received your information and will get back to you soon.&#10;&#10;Best regards,&#10;The Team"
                          value={template?.custom?.userEmailBody || ""}
                          onChange={(e) =>
                            updateTemplateCustomStyle(
                              "userEmailBody",
                              e.target.value
                            )
                          }
                          className="resize-none"
                        />
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm text-yellow-800">
                              <strong>Dynamic Variables:</strong> Use{" "}
                              <code className="bg-yellow-100 px-1 rounded">
                                {"{{fieldName}}"}
                              </code>{" "}
                              to include submitted form values.
                            </p>
                            <p className="text-xs text-yellow-700 mt-1">
                              Example:{" "}
                              <code className="bg-yellow-100 px-1 rounded">
                                {"{{name}}"}
                              </code>
                              ,{" "}
                              <code className="bg-yellow-100 px-1 rounded">
                                {"{{email}}"}
                              </code>
                              ,{" "}
                              <code className="bg-yellow-100 px-1 rounded">
                                {"{{message}}"}
                              </code>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Admin Notification Email
                        </h3>
                        <p className="text-sm text-gray-600">
                          Sent to administrators when a new form is submitted
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recipient Email Addresses
                        </label>
                        <Input
                          placeholder="admin@example.com, team@yourdomain.com"
                          value={template?.custom?.ownerEmails || ""}
                          onChange={(e) =>
                            updateTemplateCustomStyle(
                              "ownerEmails",
                              e.target.value
                            )
                          }
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Separate multiple emails with commas
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Subject
                        </label>
                        <Input
                          placeholder="New Form Submission Received"
                          value={template?.custom?.ownerEmailSubject || ""}
                          onChange={(e) =>
                            updateTemplateCustomStyle(
                              "ownerEmailSubject",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Body
                        </label>
                        <Textarea
                          rows={6}
                          placeholder="A new form submission has been received:&#10;&#10;Name: {{name}}&#10;Email: {{email}}&#10;Message: {{message}}&#10;&#10;Submitted at: {{timestamp}}"
                          value={template?.custom?.ownerEmailBody || ""}
                          onChange={(e) =>
                            updateTemplateCustomStyle(
                              "ownerEmailBody",
                              e.target.value
                            )
                          }
                          className="resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Owner Email Section */}

                {/* Database Settings */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Database Storage
                      </h3>
                      <p className="text-sm text-gray-600">
                        Configure how form submissions are stored
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <input
                        id="saveToDB"
                        type="checkbox"
                        checked={template?.custom?.saveToDB === "true"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "saveToDB",
                            e.target.checked.toString()
                          )
                        }
                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                      />
                      <label
                        htmlFor="saveToDB"
                        className="text-sm font-medium text-gray-700"
                      >
                        Save submissions to database
                      </label>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        template?.custom?.saveToDB === "true"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {template?.custom?.saveToDB === "true"
                        ? "Enabled"
                        : "Disabled"}
                    </div>
                  </div>

                  {template?.custom?.saveToDB === "true" && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm text-green-800">
                          Form submissions will be stored in the database and
                          can be viewed in the admin dashboard.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="flex justify-end  pt-2">
                  <Button
                    className="px-8 !py-6 bg-black hover:bg-black/80  text-white font-medium rounded-lg transition-colors cursor-pointer"
                    onClick={() => {
                      console.log(template);
                      if (!template) return;

                      if (validateNotifications(template)) {
                        setCurrTemplate(template);
                      }
                    }}
                  >
                    Save Notification Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <AddFieldForm onAdd={addField} />
            </DialogContent>
          </Dialog>
        </main>

        {currSection === "form" && (
          <aside className="w-1/5 sticky  max-h-[calc(100vh)] overflow-y-auto border-l bg-white p-4 scrollbar-hide">
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="button">Button</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                {selected ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Label</label>
                      <Input
                        value={selected.label || ""}
                        onChange={(e) =>
                          updateField({ ...selected, label: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Placeholder</label>
                      <Input
                        value={selected.placeholder || ""}
                        onChange={(e) =>
                          updateField({
                            ...selected,
                            placeholder: e.target.value,
                          })
                        }
                      />
                    </div>

                    {selected?.type === "select" && (
                      <div>
                        <label className="text-sm font-medium">
                          Options (Comma Seprated)
                        </label>
                        <Input
                          value={selected.selectOptions || ""}
                          onChange={(e) =>
                            updateField({
                              ...selected,
                              selectOptions: e.target.value
                                .split(",")
                                .map((opt) => opt.trim()),
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">
                    Select a field to edit its properties
                  </div>
                )}
              </TabsContent>

              <TabsContent value="design" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-4 border p-4 rounded-md bg-white">
                    <h3 className="text-lg font-semibold">General</h3>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">Form Color</label>
                      <Input
                        type="color"
                        className="w-12 h-8 p-0 border-0"
                        value={template?.custom?.formColor || "#FFFFFF"}
                        onChange={(e) =>
                          updateTemplateCustomStyle("formColor", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">Label Color</label>
                      <Input
                        type="color"
                        className="w-12 h-8 p-0 border-0"
                        value={template?.custom?.labelColor || "#000000"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "labelColor",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">Space (px)</label>
                      <Input
                        type="number"
                        className="w-16 h-8"
                        value={template?.custom?.space || "10"}
                        onChange={(e) =>
                          updateTemplateCustomStyle("space", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border p-4 rounded-md bg-white">
                    <h3 className="text-lg font-semibold">Input Box</h3>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">
                        Background Color
                      </label>
                      <Input
                        type="color"
                        className="w-12 h-8 p-0 border-0"
                        value={template?.custom?.inputBoxColor || "#FFFFFF"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "inputBoxColor",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">Text Color</label>
                      <Input
                        type="color"
                        className="w-12 h-8 p-0 border-0"
                        value={template?.custom?.inputTextColor || "#000000"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "inputTextColor",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">
                        Placeholder Color
                      </label>
                      <Input
                        type="color"
                        className="w-12 h-8 p-0 border-0"
                        value={template?.custom?.placeholderColor || "#9CA3AF"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "placeholderColor",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border p-4 rounded-md bg-white">
                    <h3 className="text-lg font-semibold">Button</h3>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">
                        Background Color
                      </label>
                      <Input
                        type="color"
                        className="w-12 h-8 p-0 border-0"
                        value={template?.custom?.buttonColor || "#000000"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "buttonColor",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">Text Color</label>
                      <Input
                        type="color"
                        className="w-12 h-8 p-0 border-0"
                        value={template?.custom?.buttonTextColor || "#FFFFFF"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "buttonTextColor",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">Height (px)</label>
                      <Input
                        type="number"
                        className="w-16 h-8"
                        max={70}
                        min={30}
                        value={template?.custom?.buttonHeight || "30"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "buttonHeight",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">Width (%)</label>
                      <Input
                        type="number"
                        max={100}
                        min={20}
                        className="w-16 h-8"
                        value={template?.custom?.buttonWidth || "100"}
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "buttonWidth",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <label className="text-sm font-medium">Alignment</label>
                      <select
                        className="w-24 h-8 border rounded-md px-2"
                        value={
                          template?.custom?.buttonAlignment ||
                          template?.submitButton?.alignment ||
                          "left"
                        }
                        onChange={(e) =>
                          updateTemplateCustomStyle(
                            "buttonAlignment",
                            e.target.value
                          )
                        }
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="button" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Button Label</label>
                    <Input
                      value={submitButton?.label || ""}
                      onChange={(e) =>
                        setSubmitButton({
                          ...submitButton,
                          label: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Redirect URL</label>
                    <Input
                      placeholder="https://example.com"
                      value={submitButton?.redirectUrl || ""}
                      onChange={(e) =>
                        setSubmitButton({
                          ...submitButton,
                          label: submitButton?.label ?? "",
                          redirectUrl: e.target.value,
                        })
                      }
                      className={`${
                        submitButton?.redirectUrl?.trim() &&
                        !isValidURL(submitButton.redirectUrl.trim())
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                    />

                    {submitButton?.redirectUrl?.trim() &&
                      !isValidURL(submitButton.redirectUrl.trim()) && (
                        <span className="text-xs text-red-500">
                          Please enter a valid HTTPS URL ending with a valid
                          domain (e.g. .com, .org).
                        </span>
                      )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </aside>
        )}
      </div>
    </div>
  );
}
