"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TemplateType } from "@/constants/formTemplates";
import { useFormStore } from "@/store/formStore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { id } = useParams();

  const [template, setTemplate] = useState<TemplateType | undefined>(undefined);

  const { getFormById } = useFormStore();

  useEffect(() => {
    const fetchForm = async () => {
      const form = await getFormById(id as string);
      setTemplate(form as TemplateType | undefined);
    };
    fetchForm();
  }, [id, getFormById]);

  return (
    <div>
      <div
        className="bg-white  rounded-lg border p-6 max-w-2xl mx-auto"
        style={{
          backgroundColor: template?.custom?.formColor || "#FFFFFF",
        }}
      >
        {template?.fields.map((field, index) => (
          <div
            key={field.id || index}
            className={`group relative ${
              field.style?.wrapper || "mb-4"
            } cursor-pointer border border-dashed hover:border-black rounded-md p-`}
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
                    color: template?.custom?.inputTextColor || "#000000",
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
                    color: template?.custom?.inputTextColor || "#000000",
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
                    color: template?.custom?.inputTextColor || "#000000",
                    "--placeholder-color":
                      template?.custom?.placeholderColor || "#9CA3AF",
                  } as React.CSSProperties
                }
                readOnly
              />
            ) : null}

           
          </div>
        ))}

        {template?.submitButton && (
          <div
            className={`${
              template.submitButton.wrapper || "mt-6"
            } flex w-full`}
          >
            <button
              type="submit"
              className={template.submitButton.wrapper}
              style={{
                backgroundColor: template?.custom?.buttonColor || "#000000",
                color: template?.custom?.buttonTextColor || "#FFFFFF",
                height: `${template?.custom?.buttonHeight || 40}px`,
                width: `${template?.custom?.buttonWidth || 100}%`,
              }}
            >
              {template?.submitButton.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
