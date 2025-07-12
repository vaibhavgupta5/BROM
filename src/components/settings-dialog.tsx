"use client";
import * as React from "react";
import { IconCirclePlusFilled, IconSparkles } from "@tabler/icons-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formTemplates, TemplateType } from "@/constants/formTemplates";
import { cn } from "@/lib/utils";

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedForm, setSelectedForm] = React.useState<TemplateType | null>(
    formTemplates[0]
  );

  const filteredTemplates = formTemplates.filter((form) =>
    form.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedForm(template);
  };

  const handleAIGenerate = () => {
    console.log("Generate with AI");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 w-full">
          <IconCirclePlusFilled />
          New Form
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[600px] md:max-w-[1000px]">
        <SidebarProvider className="items-start">
          <Sidebar
            collapsible="none"
            className="hidden md:flex flex-col border-r border-border bg-muted/20 relative"
          >
            <SidebarContent className="flex-1 bg-[#FAEFFB]">
              <SidebarGroup>
                <SidebarGroupContent>
                  <h1 className="px-1 py-2 font-semibold text-lg">
                    Choose Template
                  </h1>
                  <div className="py-2">
                    <Input
                      className="outline-none bg-white focus-visible:ring-0"
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <SidebarMenu>
                    {filteredTemplates.map((template) => (
                      <SidebarMenuItem key={template.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={selectedForm?.id === template.id}
                        >
                          <button
                            onClick={() => handleTemplateSelect(template)}
                            className={cn(
                              "w-full text-left cursor-pointer px-3 py-2 rounded hover:bg-muted",
                              {
                                "bg-muted text-primary font-medium":
                                  selectedForm?.id === template.id,
                              }
                            )}
                          >
                            {template.title}
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            {/* Fixed Generate with AI button */}
            <div className="p-4 border-t  fixed bottom-0  border-border">
              <Button
                variant="default"
                className="w-full flex gap-2 !px-10 py-6 bg-black hover:bg-white text-white border border-black cursor-pointer hover:text-black"
                onClick={handleAIGenerate}
              >
                <IconSparkles className="w-4 h-4" />
                Generate with AI
              </Button>
            </div>
          </Sidebar>

          <main className="flex h-[560px] flex-1 flex-col overflow-hidden">
            {selectedForm ? (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedForm.title}
                </h2>
                <form>
                  {selectedForm.fields.map((field, i) => (
                    <div key={i} className={field.style?.wrapper}>
                      <label className={field.style?.label}>
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          placeholder={field.placeholder}
                          className={field.style?.input}
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className={field.style?.input}
                        />
                      )}
                    </div>
                  ))}
                  <div className={selectedForm.submitButton.wrapper}>
                    <button
                      type="submit"
                      className={selectedForm.submitButton.style}
                    >
                      {selectedForm.submitButton.label}
                    </button>
                  </div>
                </form>

                <div className="mt-6 fixed bottom-0 right-0  p-4  bg-white ">
                  <Button
                    className="py-6 !px-8 cursor-pointer"
                    onClick={() => alert("Go to form builder" + selectedForm?.id)}
                  >
                    Edit this Form
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a form template to preview.
              </div>
            )}
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
