import { useEffect } from "react";
import { analyticsConfig } from "@/lib/analytics";

/**
 * AnalyticsProvider
 *
 * Conditionally loads tracking scripts based on environment variables.
 * Does nothing if no IDs are configured.
 * Does not break the app if scripts fail to load.
 */
export default function AnalyticsProvider() {
  useEffect(() => {
    try {
      // Google Analytics 4
      if (analyticsConfig.gaId && /^G-[A-Z0-9]+$/.test(analyticsConfig.gaId)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`;
        script.onerror = () => console.error("Failed to load Google Analytics");
        document.head.appendChild(script);

        const inline = document.createElement("script");
        inline.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsConfig.gaId}', { page_path: window.location.pathname });
        `;
        document.head.appendChild(inline);
      }

      // Google Tag Manager
      if (analyticsConfig.gtmId && /^GTM-[A-Z0-9]+$/.test(analyticsConfig.gtmId)) {
        const script = document.createElement("script");
        script.textContent = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${analyticsConfig.gtmId}');
        `;
        document.head.appendChild(script);
      }

      // Meta (Facebook) Pixel
      if (analyticsConfig.metaPixelId && /^\d+$/.test(analyticsConfig.metaPixelId)) {
        const script = document.createElement("script");
        script.textContent = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${analyticsConfig.metaPixelId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
      }

      // TikTok Pixel
      if (analyticsConfig.tiktokPixelId && /^[A-Z0-9]+$/.test(analyticsConfig.tiktokPixelId)) {
        const script = document.createElement("script");
        script.textContent = `
          !function(w,d,t){
          var ttq=w.ttq=w.ttq||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
          var s=d.createElement(t);s.async=!0;s.src="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${analyticsConfig.tiktokPixelId}&lib=ttq";
          var i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(s,i);
          }(window,document,"script");
        `;
        document.head.appendChild(script);
      }

      // Microsoft Clarity
      if (analyticsConfig.clarityId && /^[a-z0-9]+$/.test(analyticsConfig.clarityId)) {
        const script = document.createElement("script");
        script.textContent = `
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${analyticsConfig.clarityId}");
        `;
        document.head.appendChild(script);
      }
    } catch (err) {
      console.error("Analytics initialization error:", err);
    }
  }, []);

  return null;
}
