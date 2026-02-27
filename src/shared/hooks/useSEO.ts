import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  jsonLd?: string;
}

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
  return el;
}

export function useSEO({ title, description, ogTitle, ogDescription, ogImage, ogUrl, jsonLd }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metas: HTMLMetaElement[] = [];

    if (description) {
      metas.push(upsertMeta('description', description));
    }
    if (ogTitle || title) {
      metas.push(upsertMeta('og:title', ogTitle || title, 'property'));
    }
    if (ogDescription || description) {
      metas.push(upsertMeta('og:description', (ogDescription || description)!, 'property'));
    }
    if (ogImage) {
      metas.push(upsertMeta('og:image', ogImage, 'property'));
    }
    if (ogUrl) {
      metas.push(upsertMeta('og:url', ogUrl, 'property'));
    }
    metas.push(upsertMeta('og:type', 'website', 'property'));
    metas.push(upsertMeta('og:site_name', 'Otto Campers', 'property'));

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = jsonLd;
      document.head.appendChild(script);
    }

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, jsonLd]);
}
