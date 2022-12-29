# Optimize loading third-parties
### Reduce the performance impact third-party scripts have on your site.

<br>

Third-party resources can slow down sites and can be a challenge to optimize.

Any resource located on another domain and consumed by your site is a third-party (3P) resource for your site.

Typical third-party resources that are included on sites include
- Embeds for maps, videos, social media, and chat services
- Advertisements
- Analytics components and tag managers
- A/B testing and personalization scripts
- Utility libraries that provide ready-to-use helper functions such as those used for data visualization or animations.
- reCAPTCHA or CAPTCHA for bot detection.

You can use third-parties to integrate other features that add value to your content or to reduce some drudgery involved in building a site from scratch. 

While third-party resources can enrich your site with valuable features, they can also slow it down if:
- They cause additional round trips to the third-party domain for every required resource.
- They make heavy usage of JavaScript (impacting download and execution time)or are bulky in size because of unoptimized images/videos.
- Individual site owners cannot influence the implementation, and their behavior can be unpredictable.
- They can block the rendering of other critical resources on the page and affect _Core Web Vitals (CWV)_.

<br>

## Optimization strategies
Since third-party code is not under your control, you cannot optimize the libraries directly. This leaves you with two options.
1. Replace or remove: If the value provided by the third-party script is not proportional to its performance cost, consider removing it.
2. Optimize the loading sequence: The loading process involves loading several first-party and third-party resources in the browser.

### Load 3P scripts efficiently

1. **Use async or defer to prevent scripts from blocking other content.**

JavaScript download and execution is synchronous by default and can block the HTML parser and DOM construction on the main thread. Use of async or defer attributes in the `<script>` element tells the browser to download scripts asynchronously.

`defer`: the script is fetched in parallel as the parser executes, and script execution is delayed till the parsing is complete.

`async`: the script is fetched in parallel while parsing but executed as soon as it is available when it blocks the parser.

```html
<script src="https://example.com/deferthis.js" defer></script>
<script src="https://example.com/asyncthis.js" async></script>
```

![images](https://www.patterns.dev/img/thirdparty/optimizingthir--k6owmtevvl.png)

2. **Establish early connections to required origins using resource hints**

Connecting to third-party origins can be slow due to the DNS lookups, redirects, and multiple round trips that may be required for each third-party server.
Including a dns-prefetch resource hint corresponding to a domain will perform the DNS lookup early, thus reducing the latency associated with dns lookups. You can pair this with preconnect for the most critical resources.

```html
<head>
    <link rel="preconnect" href="http://example.com">
    <link rel="dns-prefetch" href="http://example.com">
</head>
```

3. **Lazy load below-the-fold 3P resources**
Third-party embeds like those used for social media feeds, advertisements, YouTube videos, and maps can slow down web pages. 

You can use different lazy-loading methods depending on desired browser support.
- The loading attribute can be used with images and iframes commonly used to load third-party embeds like those for YouTube or Google Maps.
- A custom implementation using the IntersectionObserver API allows you to detect when the observed element enters or exits the browser's viewport.
- Lazy-sizes - a popular JavaScript library that implements lazy-loading for you.

4. **Self-host 3P scripts to prevent round trips**
Self-hosting a copy of the scripts on the same origin offers you more control over the loading and caching process used for the scripts. You can also use HTTP/2 server push to push scripts that you know the user will need. 

With self-hosted copies of third-party scripts, you have to ensure that you update your copy regularly based on changes to the original.

5. **Use service workers to cache scripts where possible**
You can use service workers to improve caching for such third-party scripts while also utilizing CDN edge caching. This technique gives you better control over the frequency of re-fetches over the network. 

6. **Follow the ideal loading sequence**
Consider the above guidance for different types of third-parties and their value to the page. Based on the intended use for each resource, you can follow the ideal resource loading sequence to interlace first-party and third-party resources optimally for faster page loads.

<br>

### Best practices by script type
1. Non-critical JavaScript

    Most third-parties using the defer script attribute is the most common method to delay the loading and execution of these scripts. Some developers have also designed solutions to delay the load of third-parties till after the page becomes interactive.

2. Bot detection/ReCaptcha

    Since you would want to prevent bots from accessing web forms, developers would usually load these scripts as early as possible. 
    Few methods to optimize this script are
    - Load it only on a few pages with form inputs from the user that may get spammed by a bot.
    - Lazy load the script when the user interacts with form elements, for example, on form focus.
    - Use resource hints to establish early connections when you need the script to execute on page load.

3. Google Tag Manager (GTM)

    Large sites often provide Google Tag Manager access to marketing teams or agencies. Performance is not a primary concern for the marketing team, and all of them may not know that inconsiderately adding tags can slow down the site. _Better collaboration_ between development and marketing departments can be set up to audit new tags and remove unused tags.

    GTM provides a configuration in its Custom HTML tag creation interface called Support document.write(). If this is enabled, Google Tag Manager temporarily replaces the default document.write() function with a secure version of its own. 
    
    Injecting scripts using document.write() is unsafe and may result in warnings or errors 

4. A/B Testing and Personalization

    Sites conduct A/B tests to check which version of the webpage performs better. A/B tests can significantly affect the performance of pages on which they are run, with each test adding as much as 1 sec to the loading time. 

    Developing a custom server-based solution for A/B testing and personalization is the ideal method to optimize A/B testing. However, it may not always be feasible.

    To optimize third-party A/B testing scripts, you can limit the number of users who receive the script. The script identifies which version to display based on heuristics and enables the correct version for the user.

5. YouTube and map embeds

    These embeds are heavy, and developers must explore lazy-loading or click-to-load patterns to load the embeds to optimize them. 

6. Social media embeds

    Some social media embeds provide an option to lazy-load their scripts (e.g., data-lazy in Facebook embeds). 

<br>

### **Out-of-the-box optimization**
To optimize third-parties, development teams should understand the nuances of resource hints, lazy loading, HTTP caching, and service workers and then implement these in their solutions.

Partytown created by Builder.io is an experimental library that helps run resource-intensive scripts on a web worker instead of the main thread. Their philosophy is that the main thread should be dedicated to your code, and any scripts that are not required by the critical path can be sandboxed and isolated to a web worker.

Partytown scripts must be self-hosted on the same server as the HTML documents. Each third-party script that can execute in a web server should set the type attribute of its opening script tag to text/partytown as follows.

```html
<script type="text/partytown">
    // Third-party analytics scripts
</script>
```

The library also provides a React Partytown component that you can directly include in your React or Next.js projects. It can be included in the document `<head>` as shown below for a Next.js document.

Partytown also includes React components for common analytics libraries such as Google Tag Manager. 

```js
import { Partytown, GoogleTagManager, GoogleTagManagerNoScript } from '@builder.io/partytown/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
 render() {
   return (
     <Html>
       <Head>
         <GoogleTagManager containerId={'GTM-XXXXX'} />
         <Partytown />
       </Head>
       <body>
         <GoogleTagManagerNoScript containerId={'GTM-XXXXX'} />
         <Main />
         <NextScript />
       </body>
     </Html>
   );
 }
``` 

<br>

### **Next.js Script component**

The Next.js Script component uses conformance by providing a customizable template that improves loading performance. The Script component encapsulates the `<script>` tag and allows you to set the loading priority for third-party scripts using the strategy attribute. The strategy attribute can take three values.

- _beforeInteractive_: Use this for critical scripts that the browser should execute before the page becomes interactive. 
- _afterInteractive_: Use this for scripts that the browser can run after the page is interactive.
- lazyOnload: Use this for scripts that can be lazily loaded when the browser is idle.

Setting the strategy helps Next.js automatically apply the optimizations and best practices to load the script while ensuring the best loading sequence.

You can use the script tag with the strategy attribute, as shown below.

```js
import Script from 'next/script'

export default function Home() {
 return (
   <>
     <Script src="https://example.com/samplescript.js" />
   </>
 )
}
```
You can use it to load third-party scripts for analytics, social media, utility libraries, and others. 

<br>

## Conclusion

When composing your web pages combining resources from your servers with those from other corners of the web, you must monitor the interplay between these resources frequently. You could start by sequencing the resources correctly and following best practices. You can also rely on frameworks or solutions that have built-in these best practices into their design.

As the site grows, performance reporting and regular audits can help eliminate redundancies and optimize scripts that affect performance. Lastly, we can always hope that third-parties with commonly known performance issues will optimize code at their end or expose APIs that enable workarounds to address these issues.