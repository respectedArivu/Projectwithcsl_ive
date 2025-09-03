'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { onEntryChange } from '../contentstack-sdk';
import { getAllEntries, getFooterRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { FooterProps, Entry, Links } from "../typescript/layout";

export default function Footer() {

  const [footer, setFooterProp] = useState<FooterProps | undefined>(undefined);
  const [entries, setEntries] = useState<Entry | undefined>(undefined);

  const [getFooter, setFooter] = useState(footer);
  
  function buildNavigation(ent: Entry, ft: FooterProps) {
    let newFooter = { ...ft };
    if (ent.length !== newFooter.navigation.link.length) {
      ent.forEach((entry) => {
        const fFound = newFooter?.navigation.link.find(
          (nlink: Links) => nlink.title === entry.title
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }
    return newFooter;
  }

  const fetchFooterAndEntries = async () => {
    const footerRes = await getFooterRes();
    const entriesRes = await getAllEntries();
    setFooterProp(footerRes);
    setEntries(entriesRes);
  }

  async function fetchData() {
    try {
      if (footer && entries) {
        const footerRes = await getFooterRes();
        const newfooter = buildNavigation(entries, footerRes);
        setFooter(newfooter);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchFooterAndEntries();
  }, []);

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [footer]);

  const footerData = getFooter ? getFooter : undefined;

  return (
<footer>
  {/* First row: logo + nav */}
  <div className="max-width footer-top">
    <div className="wrapper-logo">
      {footerData && footerData.logo ? (
        <Link legacyBehavior href="/">
          <a className="logo-tag">
            <img
              src={footerData.logo.url}
              alt={footerData.title}
              title={footerData.title}
              {...(footer?.logo?.$?.url as {})}
              className="logo footer-logo"
            />
          </a>
        </Link>
      ) : (
        <Skeleton width={150} />
      )}
    </div>

    <nav>
      <ul className="header-ul">
        {footerData ? (
          footerData.navigation.link.map((menu) => (
            <li key={menu.title}>
              <Link href={menu.href}>{menu.title}</Link>
            </li>
          ))
        ) : (
          <Skeleton width={300} />
        )}
      </ul>
    </nav>
  </div>

  {/* Second row: copyright */}
  <div className="copyright">
    {footerData && typeof footerData.copyright === "string" ? (
      <span {...(footer?.$?.copyright as {})}>
        {parse(footerData.copyright)}
      </span>
    ) : (
      <Skeleton width={200} />
    )}
  </div>
</footer>



  );
}