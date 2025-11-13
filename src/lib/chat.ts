const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/chat";

export async function sendMessage(messages: { role: string; content: string }[]): Promise<string | null> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error from API: ${res.status} - ${errorText}`);
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (error: any) {
    console.error("Fetch failed:", error);
    return null;
  }
}
