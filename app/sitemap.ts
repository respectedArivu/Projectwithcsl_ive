
import { Pages, PostPage } from '@/typescript/pages';
import { MetadataRoute } from 'next'
import { getAllEntries, getBlogListRes, getEventListRes } from '@/helper';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseUrl = process.env.NEXT_PUBLIC_HOSTED_URL || 'https://arivanandhan.netlify.app/';

    let pages: Pages = await getAllEntries();
    let posts: PostPage = await getBlogListRes();
 let events = await getEventListRes();
    const allPages = pages.map((page) => `${baseUrl}${page.url}`);
    const allPosts = posts.map((post) => `${baseUrl}${post.url}`);
    const allEvents = events.map((ev: { url: any; }) => `${baseUrl}${ev.url}`);
    const siteMapList = [...allPages, ...allPosts, ...allEvents].sort();

  

    return siteMapList.map((url) => {
        return {
            url: url,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 1.0,
        };
    }
    );
};
