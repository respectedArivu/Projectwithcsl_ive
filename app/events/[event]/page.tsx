// app/events/[event]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import { usePathname } from 'next/navigation';
import { onEntryChange } from '@/contentstack-sdk';
import { getEventPostRes, getPageRes, getHeaderRes, getFooterRes, metaData } from '@/helper';
import RenderComponents from '@/components/render-components';
import type { Page } from '@/typescript/pages';
import type { Event } from '@/typescript/event';

export default function EventPost() {
  const entryUrl = usePathname();
  const [banner, setBanner] = useState<Page>();
  const [event, setEvent] = useState<Event>();
  const [header, setHeader] = useState<any>();
  const [footer, setFooter] = useState<any>();

  async function fetchData() {
    try {
      const [pageRes, evRes, headerRes, footerRes] = await Promise.all([
        getPageRes('/events'),           // page (banner/components)
        getEventPostRes(entryUrl || ''), // event data
        getHeaderRes(),                  // header entry
        getFooterRes(),                  // footer entry
      ]);

      setBanner(pageRes);
      setEvent(evRes);
      setHeader(headerRes);
      setFooter(footerRes);
    } catch (e) {
      console.error('Error fetching event page data:', e);
    }
  }

  useEffect(() => {
    fetchData();
    onEntryChange(() => fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle image (object/array)
  const imageUrl =
    event?.featured_image?.url ||
    (Array.isArray(event?.featured_image) ? event.featured_image[0]?.url : null);

  return (
    <>
      {/* SEO */}
      {event?.seo?.enable_search_indexing && metaData(event.seo)}

      {/* Header */}
      {header ? (
        <RenderComponents
          pageComponents={header.page_components}
          contentTypeUid="header"
          entryUid={header.uid}
          locale={header.locale}
        />
      ) : (
        <Skeleton height={60} />
      )}

      {/* Banner/other reusable page components */}
      {banner?.page_components ? (
        <RenderComponents
          pageComponents={banner.page_components}
          contentTypeUid="page"
          entryUid={banner.uid}
          locale={banner.locale}
        />
      ) : (
        <Skeleton height={300} />
      )}

      {/* Event Body */}
      <div className="blog-container">
        <article className="blog-detail">
          {event?.title ? <h2>{event.title}</h2> : <h2><Skeleton /></h2>}

          <p>
            <strong>
              {event?.date ? (
                moment(event.date).format('ddd, MMM D YYYY')
              ) : (
                <Skeleton width={200} />
              )}
            </strong>
          </p>

          {imageUrl && (
            <figure>
              <img
                src={imageUrl}
                alt={event?.title || 'Event image'}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </figure>
          )}

          {event?.body ? (
            <div>{parse(event.body)}</div>
          ) : (
            <Skeleton height={800} width={600} />
          )}
        </article>
        <div className="blog-column-right">{/* related posts/widgets */}</div>
      </div>

      {/* Footer */}
      {footer ? (
        <RenderComponents
          pageComponents={footer.page_components}
          contentTypeUid="footer"
          entryUid={footer.uid}
          locale={footer.locale}
        />
      ) : (
        <Skeleton height={200} />
      )}
    </>
  );
}
