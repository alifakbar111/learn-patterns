# Static Rendering

Static rendering or **Static Generation (SSG)** attempts to resolve these issues by delivering pre-rendered HTML content to the client that was generated when the site was built.

A static HTML file is generated ahead of time corresponding to each route that the user can access. These static HTML files may be available on a server or a CDN and fetched as and when requested by the client.

Since the HTML response is generated in advance, the processing time on the server is negligible thereby resulting in a faster TTFB and better performance.

## SSG - Basic Structure
Static rendering is ideal for static content, where the page need not be customized based on the logged-in user (e.g personalized recommendations).

## SSG with Data
However, for content like individual blog pages or product pages, the data from a data-store has to be merged with a specific template and then rendered to HTML at build time. The number of HTML pages generated will depend on the number of blog posts or the number of products respectively, you may need listing pages which will be HTML pages that contain a categorized and formatted list of data items.

## Listing Page - All Items
Generation of a listing page is a scenario where the content to be displayed on the page depends on external data. This data will be fetched from the database at build time to construct the page.

## Individual Details Page - Per Item
We could have an individual detailed page for each of the products listed on the listing page. 

Assume we have products with product ids 101,102 103, and so on. We need their information to be available at routes /products/101, /products/102, /products/103 etc. To achieve this at build time in Next.js we can use the function `getStaticPaths()` in combination with *dynamic routes*.

We need to create a common page component products/[id].js for this and export the function getStaticPaths() in it. The function will return all possible product ids which can be used to pre-render individual product pages at build time. 

<br>

## *SSG - Key Considerations*
SSG results in a great performance for websites as it cuts down the processing required both on the client and the server. The sites are also SEO friendly as the content is already there and can be rendered by web-crawlers with no extra effort.

but SSG have some factors need to be considered when assessing the suitability of SSG for specific applications. 

- **A large number of HTML files**: Individual HTML files need to be generated for every possible route that the user may access. Maintaining a large number of HTML files can be challenging.
- **Hosting Dependency**: For an SSG site to be super-fast and respond quickly, the hosting platform used to store and serve the HTML files should also be good. Superlative performance is possible if a well-tuned SSG website is hosted right on multiple CDNs to take advantage of edge-caching.
- **Dynamic Content**: An SSG site needs to be built and re-deployed every time the content changes.
