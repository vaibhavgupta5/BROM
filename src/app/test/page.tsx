'use client';
import React from "react";
import { useEffect } from "react";

function Page() {

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "FORM_HEIGHT") {
        const iframe = document.getElementById("customFormIframe") as HTMLIFrameElement | null;
        if (iframe) {
          iframe.style.height = event.data.height + "px";
        }
      }

    }
     window.addEventListener("message", (event) => {
    if (event.data?.type === "REDIRECT_PARENT" && event.data.url) {
      window.location.href = event.data.url;
    }
  });
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="grid grid-cols-2 bg-black">
      <div className="col-span-1">
        <h1 className="text-2xl font-bold">Form Details</h1>
        {/* Form details will be displayed here */}
      </div>
      <div className="col-span-1">
        <h1 className="text-2xl font-bold">Form Preview</h1>

        <iframe
          id="customFormIframe"
          src="http://localhost:3001/68781e325c58de27ae059960"
          width="100%"
          style={{ border: "none", minHeight: "300px" }}
        ></iframe>
        
      </div>
    </div>
  );
}

export default Page;
