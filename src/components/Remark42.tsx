'use client';

import { REMARK42_SITE_ID, REMARK42_URL } from '@/constants/misc';
import { usePathname } from '@/navigation';
import { useEffect } from 'react';

const Remark42 = ({ locale }: { locale: string }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Define the remark_config on the window object
    if (typeof window !== 'undefined') {
      window.remark_config = {
        host: REMARK42_URL,
        site_id: REMARK42_SITE_ID,
        page_title: document.title,
        components: ['embed'],
        max_shown_comments: 100,
        theme: 'light',
        locale: locale,
        show_email_subscription: false,
        show_rss_subscription: false,
        simple_view: true,
        no_footer: false,
      };

      const initializeRemark = () => {
        if (window.REMARK42) {
          // Re-initialize Remark42 instance if already loaded
          window.REMARK42.createInstance(window.remark_config);
        }
      };

      // Check if the Remark42 script is already loaded
      const isRemark42Loaded = document.querySelector(
        `script[src="${window.remark_config.host}/web/embed.js"]`,
      );

      if (!isRemark42Loaded) {
        // If not, load the Remark42 script
        const script = document.createElement('script');
        script.src = `${window.remark_config.host}/web/embed.js`;
        script.async = true;
        script.onload = () => {
          initializeRemark(); // Initialize once the script is loaded
        };
        document.body.appendChild(script);
      } else {
        initializeRemark(); // Initialize directly if script is already loaded
      }
    }
  }, [pathname, locale]); // Re-run effect if pathname or locale changes

  return <div id="remark42"></div>; // The container for Remark42 comments
};

export default Remark42;
