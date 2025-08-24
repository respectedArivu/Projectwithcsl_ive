'use client';
import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import parse from 'html-react-parser';
import { Event } from "../typescript/event";

export default function EventCard({ ev }: { ev: Event }) {
  const excerpt = (ev.body || '').substring(0, 300);
  const cut = excerpt.lastIndexOf(' ');
  const short = `${excerpt.substring(0, Math.max(0, cut))}...`;

  // handle image (sometimes directly .url, sometimes inside [0].url)
  const imageUrl =
    ev?.featured_image?.url ||
    (Array.isArray(ev?.featured_image) ? ev.featured_image[0]?.url : null);

  return (
    <div className="blog-list">
      {imageUrl && (
        <Link legacyBehavior href={ev.url}>
          <a>
            <img
              className="blog-list-img"
              src={imageUrl}
              alt={ev.title || 'Event image'}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </a>
        </Link>
      )}

      <div className="blog-content">
        <Link legacyBehavior href={ev.url}>
          <a><h3>{ev.title}</h3></a>
        </Link>
        <p>
          <strong>
            {moment(ev.date).format('ddd, MMM D YYYY')}
          </strong>
        </p>
        <div>{parse(short)}</div>
        <Link legacyBehavior href={ev.url}>
          <a><span>{'Read more -->'}</span></a>
        </Link>
      </div>
    </div>
  );
}
