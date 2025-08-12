import Vapi from "@vapi-ai/web";

if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
  console.error("❌ Missing VAPI token. Please set NEXT_PUBLIC_VAPI_WEB_TOKEN in your .env.local file.");
}

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN || "");

// Handle meeting end globally
vapi.on("meeting-ended", (reason) => {
  console.log("✅ Meeting ended:", reason);
  alert("The interview has ended.");
  window.location.href = "/interview-summary"; 
});

// Handle Vapi errors globally
vapi.on("error", (err) => {
  console.error("❌ Vapi error:", JSON.stringify(err, null, 2));
  alert(`Vapi Error: ${err?.message || "Unknown error occurred"}`);
});
