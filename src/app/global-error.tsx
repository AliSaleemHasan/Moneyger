"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { toast } from "sonner";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast(error.name, {
      description: error.message,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }, [error]);

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>{error.message}</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
