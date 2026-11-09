import { useMutation } from "@tanstack/react-query";
import { type ContactInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { config } from "@/lib/config";
import { trackWhatsAppClick } from "@/lib/analytics";

function buildContactWhatsAppUrl(data: ContactInput) {
  const message = [
    "Hi! I want help from AI Team Premium.",
    "",
    `Name: ${data.name}`,
    `My WhatsApp: ${data.whatsapp}`,
    `Service: ${data.service || "General inquiry"}`,
    `What I need: ${data.needs}`,
    "",
    "Please confirm the current access model, availability, commercial terms and next steps before purchase.",
  ].join("\n");

  const url = new URL(config.whatsappUrl);
  url.searchParams.set("text", message);
  return url.toString();
}

export function useCreateContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const url = buildContactWhatsAppUrl(data);
      trackWhatsAppClick(undefined, undefined, undefined, "contact-form-handoff");

      // window.open() with the "noopener" feature always returns null, so the
      // old `if (!opened)` fallback fired on every submit: WhatsApp opened in a
      // new tab AND this tab navigated away to wa.me, losing the site. Open
      // without the feature and cut the opener by hand instead.
      const opened = window.open(url, "_blank");
      if (opened) {
        opened.opener = null;
      } else {
        window.location.assign(url); // popup blocked
      }

      return { handoff: "whatsapp" as const };
    },
    onSuccess: () => {
      toast({
        title: "WhatsApp message prepared",
        description: "Send the pre-filled message in WhatsApp to complete your request.",
      });
    },
    onError: () => {
      toast({
        title: "Could not open WhatsApp",
        description: `Please message us directly at ${config.phoneDisplay}.`,
        variant: "destructive",
      });
    },
  });
}
