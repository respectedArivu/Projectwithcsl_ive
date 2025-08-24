// app/events/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { usePathname } from 'next/navigation';
import { onEntryChange } from '@/contentstack-sdk';
import { getPageRes, getEventListRes, metaData } from '@/helper';
import RenderComponents from '@/components/render-components';
import EventCard from '@/components/event-card';
import type { Page } from '@/typescript/pages';
import type { Events } from '@/typescript/event';

export default function Events() {
  const entryUrl = usePathname(); // "/events"
  const [banner, setBanner] = useState<Page | undefined>(undefined);
  const [events, setEvents] = useState<Events | undefined>(undefined);

  async function fetchData() {
    try {
      const [pageRes, listRes] = await Promise.all([
        getPageRes(entryUrl || '/events'),
        getEventListRes(),
      ]);
      setBanner(pageRes);
      setEvents(listRes);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { fetchData(); onEntryChange(() => fetchData()); }, []);

  return (
    <>
      {banner?.seo && banner.seo.enable_search_indexing && metaData(banner.seo)}
      {banner?.page_components ? (
        <RenderComponents
          pageComponents={banner.page_components}
          contentTypeUid='page'
          entryUid={banner.uid}
          locale={banner.locale}
        />
      ) : (<Skeleton height={400} />)}

      <div className='blog-container'>
        <div className='blog-column-left'>
          {events ? (
            events.map((ev) => <EventCard key={ev.url} ev={ev} />)
          ) : (
            <Skeleton count={3} height={180} />
          )}
        </div>
        <div className='blog-column-right'>
          {/* Optional: widgets/archives similar to Blog */}
        </div>
      </div>
    </>
  );
}
