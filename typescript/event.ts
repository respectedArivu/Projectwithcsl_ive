// typescript/event.ts
import { Image } from "./action";

// Keep this local so we don't touch pages.ts
type Seo = { enable_search_indexing: boolean };

export type Event = {
  title: string;
  url: string;
  date: string;
  body: string;
  featured_image?: Image;
  locale: string;
  seo?: Seo;
  $: any; // Contentstack '$' meta for editable tags
};

export type Events = Event[];
