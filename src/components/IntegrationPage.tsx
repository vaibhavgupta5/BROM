"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyBlock, dracula } from "react-code-blocks";
import { useEffect, useState } from "react";
import { Copy, Check, Code, Globe, Package } from "lucide-react";

export default function IntegrationPage() {
  const { id } = useParams();
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const iframeCode = `<iframe
  id="customFormIframe"
  src="https://your-domain.com/forms/${id}"
  width="100%"
  height="500"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>

<script>
  window.addEventListener("message", function(event) {
    if (event.data?.type === "FORM_HEIGHT") {
      const iframe = document.getElementById("customFormIframe");
      if (iframe) {
        iframe.style.height = event.data.height + "px";
      }
    }
  });
</script>`;

  const scriptEmbedCode = `<div id="custom-form-${id}"></div>
<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://your-domain.com/embed.js';
    script.onload = function() {
      window.CustomForms.render('${id}', {
        container: '#custom-form-${id}',
        theme: 'default'
      });
    };
    document.head.appendChild(script);
  })();
</script>`;

  const reactSdkCode = `npm install @your-org/react-forms

// Then in your component:
import { CustomForm } from "@your-org/react-forms";

export default function MyComponent() {
  return (
    <CustomForm
      formId="${id}"
      onSubmit={(data) => {
        console.log('Form submitted:', data);
      }}
      theme="default"
    />
  );
}`;

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "FORM_HEIGHT") {
        const iframe = document.getElementById("customFormIframe") as HTMLIFrameElement | null;
        if (iframe) {
          iframe.style.height = event.data.height + "px";
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const integrationMethods = [
    {
      id: "iframe",
      title: "Iframe",
      description: "Simple embed with automatic height adjustment",
      icon: <Globe className="w-4 h-4" />,
      difficulty: "Easy",
      code: iframeCode,
      pros: ["Quick setup", "No dependencies", "Automatic resizing"],
      cons: ["Limited customization", "Cross-origin limitations"]
    },
    {
      id: "script",
      title: "Script Embed",
      description: "Dynamic loading with more control",
      icon: <Code className="w-4 h-4" />,
      difficulty: "Medium",
      code: scriptEmbedCode,
      pros: ["Better integration", "Theme customization", "Event handling"],
      cons: ["Requires JavaScript", "Async loading"]
    },
    {
      id: "react",
      title: "React SDK",
      description: "Full React component integration",
      icon: <Package className="w-4 h-4" />,
      difficulty: "Advanced",
      code: reactSdkCode,
      pros: ["Native React", "TypeScript support", "Full control"],
      cons: ["React dependency", "Larger bundle size"]
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Code className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Integrate Your Form</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Choose your preferred integration method and copy the code below to embed your form.
        </p>
      </div>

      <Tabs defaultValue="iframe" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          {integrationMethods.map((method) => (
            <TabsTrigger 
              key={method.id} 
              value={method.id}
              className="flex items-center gap-2"
            >
              {method.icon}
              {method.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {integrationMethods.map((method) => (
          <TabsContent key={method.id} value={method.id} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {method.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {method.title}
                        <Badge variant="secondary">{method.difficulty}</Badge>
                      </CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(method.code, method.id)}
                    className="flex items-center gap-2"
                  >
                    {copiedStates[method.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-green-600 mb-2">Pros</h4>
                    <ul className="text-sm space-y-1">
                      {method.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-orange-600 mb-2">Considerations</h4>
                    <ul className="text-sm space-y-1">
                      {method.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="relative">
                  <CopyBlock
                    text={method.code}
                    language={method.id === 'react' ? 'jsx' : 'html'}
                    theme={dracula}
                    wrapLines
                    customStyle={{
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
          <CardDescription>
            Having trouble with integration? Check out our documentation or contact support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <a href="/docs" target="_blank" rel="noopener noreferrer">
                View Documentation
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/support" target="_blank" rel="noopener noreferrer">
                Contact Support
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}