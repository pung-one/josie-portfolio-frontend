function generateSiteMap(pages) {
  const baseURL = "https://www.josie-overton.de";
  const pageURLs = pages.map((page) => `${baseURL}${page}`);

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- homepage URL -->
     <url>
       <loc>${baseURL}</loc>
     </url>
     <!-- about URL -->
     <url>
       <loc>${baseURL}/info</loc>
     </url>
     <!-- detail pages -->
     ${pageURLs
       .map((url) => {
         return `
       <url>
           <loc>${url}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {}
export async function getServerSideProps({ res }) {
  try {
    const contentful = require("contentful");

    const client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const entries = await client
      .getEntries({
        content_type: "artwork",
      })
      .catch((e) => {
        console.log(e);
      });

    const pages = entries.items.map((item) => `/${item.fields.slug}`);
    const sitemap = generateSiteMap(pages);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    return { notFound: true };
  }
}

export default SiteMap;
