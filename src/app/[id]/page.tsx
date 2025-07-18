"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TemplateType } from "@/constants/formTemplates";
import { useFormStore } from "@/store/formStore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function EmbedFormPage() {
  const { id } = useParams();
  const [template, setTemplate] = useState<TemplateType | undefined>(undefined);
  const { getForm } = useFormStore();

  // Fetch form template
  useEffect(() => {
    const fetchForm = async () => {
      const form = await getForm(id as string);
      setTemplate(form as TemplateType | undefined);
    };
    fetchForm();
  }, [id, getForm]);

  // Auto resize iframe height
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      window.parent?.postMessage(
        {
          type: "FORM_HEIGHT",
          height: document.body.scrollHeight,
        },
        "*"
      );
    });

    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(template?.submitButton);

    window.parent.postMessage(
  {
    type: "REDIRECT_PARENT",
    url: template?.submitButton.redirectUrl,
  },
  "*"
);

  };

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="w-full mx-auto p-6"
      style={{
        fontFamily: "sans-serif",
        backgroundColor: template?.custom?.formColor,
        width: template?.custom?.width ? `${template.custom.width}px` : "50%",
        height: template?.custom?.height
          ? `${template.custom.height}px`
          : "auto",
      }}
    >
      {template.fields.map((field, index) => (
        <div
          key={field.id || index}
          className={`group relative ${
            field.style?.wrapper || "mb-4"
          } cursor-pointer  `}
        >
          {field.type !== "checkbox" && (
            <label
              style={{
                color: template?.custom?.labelColor || "#000000",
              }}
              className={
                field.style?.label ||
                "block text-sm font-medium text-gray-700 mb-1"
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
              style={{
                backgroundColor: template?.custom?.inputBoxColor || "#FFFFFF",
                color: template?.custom?.inputTextColor || "#000000",
              }}
              readOnly
            />
          ) : ["text", "email", "number", "date", "tel"].includes(
              field.type
            ) ? (
            <Input
              type={field.type}
              placeholder={field.placeholder}
              className={`${field.style?.input}
                mt-1 focus:ring-2 focus:ring-blue-500 rounded-md w-full outline-none`}
              style={{
                backgroundColor: template?.custom?.inputBoxColor || "#FFFFFF",
                color: template?.custom?.inputTextColor || "#000000",
              }}
              readOnly
            />
          ) : field.type === "select" ? (
            <select
              className={
                field.style?.input ||
                "mt-1 border border-gray-300 rounded-md p-2 w-full"
              }
              style={{
                backgroundColor: template?.custom?.inputBoxColor || "#FFFFFF",
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
          ) : null}
        </div>
      ))}

      {template.submitButton && (
        <div
          className={`${
            template.submitButton.wrapper || "mt-6"
          } flex w-full justify-end`}
        >
          <button
            type="submit"
            className={template.submitButton.wrapper}
            style={{
              backgroundColor: template?.custom?.buttonColor || "#000000",
              color: template?.custom?.buttonTextColor || "#FFFFFF",
              height: `${template?.custom?.buttonHeight || 40}px`,
              width: `${template?.custom?.buttonWidth || 100}%`,
              cursor: "pointer",
            }}
            onClick={(e) => handleSubmit(e)}
          >
            {template?.submitButton.label}
          </button>
        </div>
      )}
    </div>
  );
}

export default EmbedFormPage;
