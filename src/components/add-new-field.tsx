'use client';
import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // adjust based on your component library
import { Button } from "@/components/ui/button";
import { FieldType } from "@/constants/formTemplates";
import { XIcon } from "lucide-react";

export default function AddFieldForm({
  onAdd,
}: {
  onAdd: (field: Omit<FieldType, "id">) => void;
}) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType["type"]>("text");

  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim()) {
      setSelectOptions((prev) => [...prev, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleAdd = () => {
    if (!label.trim()) return;

    onAdd({
      type,
      label,
      placeholder: `Enter ${label.toLowerCase()}`,
      layout: "single",
      selectOptions: type === "select" ? selectOptions : undefined,
      style: {
        wrapper: "mb-4",
        label: "block text-sm font-medium text-gray-700",
        input:
          type !== "checkbox"
            ? "mt-1 border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
            : "",
      },
    });

    // Reset form
    setLabel("");
    setType("text");
    setSelectOptions([]);
    setNewOption("");
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Add New Field</h2>

      <div>
        <label className="text-sm font-medium">Field Type</label>
        <select
          className="w-full border rounded p-2 mt-1"
          value={type}
          onChange={(e) => {
            const val = e.target.value as FieldType["type"];
            setType(val);
            if (val !== "select") {
              setSelectOptions([]);
            }
          }}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="textarea">Textarea</option>
          <option value="date">Date</option>
          <option value="select">Select</option>
          <option value="checkbox">Checkbox</option>
          <option value="tel">Telephone</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Label</label>
        <Input
          placeholder="Enter field label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="mt-1"
        />
      </div>

      {type === "select" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Options</label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter an option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
            <Button type="button" onClick={handleAddOption}>
              Add
            </Button>
          </div>
          <ul className=" text-sm text-gray-700 ">
            {selectOptions.map((opt, idx) => (
              <li className="" key={idx}>
                
                <span className="flex items-center justify-between bg-gray-100 px-2 border-black rounded-md py-1 mb-1">
                    <span>{idx+1}. {opt}</span>
                    <Button
                      type="button"
                      className="rounded-full hover:bg-gray-800"
                      onClick={() => {
                        setSelectOptions((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                      }}
                    >
                      <XIcon className="w-3 h-3" />
                    </Button>
                </span>

              </li>
            ))}
          </ul>
        </div>
      )}

      <Button className="w-full" onClick={handleAdd} disabled={!label.trim()}>
        Add Field
      </Button>
    </div>
  );
}
