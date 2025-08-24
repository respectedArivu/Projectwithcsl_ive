'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import parse from 'html-react-parser';
import { onEntryChange } from '../contentstack-sdk';
import { getHeaderRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { HeaderProps } from "../typescript/layout";

export default function Header() {
  const [header, setHeader] = useState<HeaderProps | undefined>(undefined);
  const pathname = usePathname();

  // Fetch only the header data
  const fetchHeader = async () => {
    try {
      const headerRes = await getHeaderRes();
      setHeader(headerRes);
    } catch (error) {
      console.error('Error fetching header:', error);
    }
  };

  useEffect(() => {
    fetchHeader();
  }, []);

  useEffect(() => {
    if (header) {
      onEntryChange(() => fetchHeader());
    }
  }, [header]);

  return (
    <header className='header'>
      <div className='note-div'>
        {header?.notification_bar.show_announcement ? (
          typeof header.notification_bar.announcement_text === 'string' && (
            <div {...(header.notification_bar.$?.announcement_text as {})}>
              {parse(header.notification_bar.announcement_text)}
            </div>
          )
        ) : (
          <Skeleton />
        )}
      </div>
      <div className='max-width header-div'>
        <div className='wrapper-logo'>
          {header ? (
            <Link legacyBehavior href='/'>
              <a className='logo-tag' title='Contentstack'>
                <img
                  className='logo'
                  src={header.logo.url}
                  alt={header.title}
                  title={header.title}
                  {...(header.logo.$?.url as {})}
                />
              </a>
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>

        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon' />
        </label>

        <nav className='menu'>
          <ul className='nav-ul header-ul'>
            {header ? (
              header.navigation_menu.map((list) => {
                const pageRef = list.page_reference?.[0];
                const itemUrl = pageRef?.url || '#';

                const isActive =
                  pathname?.replace(/\/$/, '') === itemUrl.replace(/\/$/, '');

                return (
                  <li
                    key={list.label}
                    className='nav-li'
                    {...(pageRef?.$?.url as {})}
                  >
                    <Link legacyBehavior href={itemUrl}>
                      <a className={isActive ? 'active' : ''}>{list.label}</a>
                    </Link>
                  </li>
                );
              })
            ) : (
              <Skeleton width={300} />
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
