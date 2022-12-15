# Optimize your loading sequence
## Learn how to optimize your loading sequence to improve how quickly your app is usable

<br>

in web page load, some critical compoentn and resources become available at just the right time to give you smooth loading exp. This excellent user experience should generally also translate to passing the Core Web Vitals.

Key metrics such as First Content Paint, Largest Contentful Paint, First Input Delay, etc directly dependent on the loading sequence of critical resources.

Before we establish an ideal loading sequence, let us first try to understand why it is so difficult to get the loading sequence right.

<br>

## Why is optimal loading difficult to achieve?

### **Sub-optimal sequencing** 
Web Vitals optimization requires not only a good understanding of what each metrics stands for but also the order in which they occur and how they relate to different critical resources. 

Resources are often not sequenced and pipelined in the correct order. This may be because developers are not aware of the dependency of metrics on resource loads. As a result, relevant resources are sometimes not available at the right time for the corresponding metric to trigger.

### **Network/CPU Utilization**
Resources are also not pipelined appropriately to ensure full CPU and Network utilization. This results in "Dead Time" on the CPU when the process is network bound and vice versa.

As the bandwidth gets divided during concurrent download, the total time for downloading all scripts is the same for both sequential and concurrent downloads. If you download scripts concurrently, the CPU is underutilized during the download. However, if you download the scripts sequentially, the CPU can start processing the first one as soon as it is downloaded. This results in better CPU and Network utilization.

### **Third-Party (3P) Products**
3P libraries are often required to add common features and functionality to the website. A third party library comes with its own JavaScript, images, fonts etc.

3P products don't usually have an incentive to optimize. They could have a heavy JavaScript execution cost that delays interactivity, or gets in the way of other critical resources being downloaded.

Developers who include 3P products need to focus in the performance implications. 3P resources are sometimes added haphazardly.

### **Platform Quirks**
Optimization is easier if you have a deep knowledge of the platform and its quirks. Behavior particular to a specific browser makes it difficult to achieve the desired loading sequence consistently. 

### **HTTP2 Prioritization**
The protocol itself does not provide many options or knobs for adjusting the order and priority of resources. 

Mainly, we cannot predict in what order servers or CDN's will prioritize requests for individual resources. Some CDN's re-prioritize requests while others implement partial, flawed, or no prioritization.

### Resource level optimization
Effective sequencing needs that the resources that are being sequenced to be served optimally so that they will load quickly.  Critical CSS should be inlined, Images should be sized correctly and JS should be code-split and delivered incrementally.

When code-splitting, developers need to achieve just the right granularity of chunks because of a granularity vs performance trade-off.

At the same time too much granularity when code-splitting can be bad because too many small chunks lower compression rates for individual chunks and affect browser performance.

Resource optimization also requires the elimination of dead or unused code. JS transpiled to ES5 and bundled with polyfills is unnecessary for modern browsers. Libraries and npm packages are often not published in ES module format.

<br>

## More on Resources - Relations, Constraints, and Priorities

### **Critical CSS**
Critical CSS refers to the minimum CSS required for FCP. It is better to inline such CSS within HTML rather than import it from another CSS file.

If inlining is not possible, critical CSS should be preloaded and served from the same origin as the document. Avoid serving critical CSS from multiple domains or direct use of 3rd party critical CSS like Google Fonts.

Too much inlined CSS can cause HTML bloating and long style parsing times on the main thread. This can hurt the FCP. As such identifying what is critical and code-splitting are essential.

### **Fonts**
Critical fonts should also be inlined. If inlining is not possible the script should be loaded with a preconnect specified. Delay in fetching fonts, e.g., google fonts or fonts from a different domain can affect FCP.

Inlining fonts can bloat the HTML significantly and delay initiating other critical resource fetches.
### **Above the Fold (ATF) Images**
This refers to images that are initially visible to the user on page load because they are within the viewport. A special case for ATF images is the hero image for the page. All ATF images should be sized. Unsized images hurt the CLS metric because of the layout shift that occurs when they are fully rendered. 

Delayed hero image or blank placeholders would result in a late LCP. Ideally, there should be no impact on FCP due to ATF images but in practice, an image can fire FCP.
### **Below the Fold (BTF) Images**
These are images that are not immediately visible to the user on page load. If BTF images were to be loaded before 1P JS or important 3P resources, FID would get delayed.

### **1P JavaScript**
1P JS impacts the interaction readiness of the application. It can get delayed on the network behind images & 3P JS and on the main thread behind 3P JS.
1P JS does not block FCP and LCP in pages that are rendered on the server-side.

### **3P JavaScript**
3P sync script in HTML head could block CSS & font parsing and therefore FCP. Sync script in the head also blocks HTML body parsing. As such, better control is required for loading 3P scripts.

<br>

These recommendations and constraints would generally apply irrespective of the tech stack and browser. The trick is to find a balance between ‘Too little Too late' and ‘Too much Too soon'.

![images](https://www.patterns.dev/img/loadingSequence/optimizeyourlo--0juvmukudzfo-640w.avif)

Following are the key takeaways from this table.
- CSS and Fonts are loaded with the highest priority. This should help us prioritize critical CSS and fonts.
- Scripts get different priorities based on where they are in the document and whether they are async, defer, or blocking. 
- Images that are visible and in the viewport have a higher priority (Net: Medium) than those that are not in the viewport (Net: Lowest).

<br>

## Proposed Sequence without 3P

|   | **Sequence of events on the main browser thread** |                                          | **Sequence of requests on the network.**           |    |
|---|---------------------------------------------------|------------------------------------------|----------------------------------------------------|----|
| 1 |                                                   | Parse the HTML                           | Small inline 1P scripts.                           | 1  |
| 2 |                                                   | Execute small inline 1P scripts          | Inlined critical CSS (Preload if external)         | 2  |
|   |                                                   |                                          | Inlined critical Fonts (Preconnect if external)    | 3  |
| 4 |                                                   | Parse FCP resources (critical CSS, font) | LCP Image (Preconnect if external)                 | 4  |
|   | **First Contentful Paint (FCP)**                  |                                          | Fonts (triggered from inline font-css (Preconnect) | 5  |
| 5 |                                                   | Render LCP resources (Hero image, text)  | Non-critical (async) CSS                           | 6  |
|   |                                                   |                                          | First-party JS for interactivity                   | 7  |
|   |                                                   |                                          | Above the fold images (preconnect)                 | 8  |
|   | **Largest Contentful Paint (LCP)**                |                                          |                                                    |    |
|   |                                                   |                                          | Below the fold images                              | 9  |
| 6 |                                                   | Render important ATF images              |                                                    |    |
|   | **Visually Complete**                             |                                          |                                                    |    |
|   |                                                   | Parse Non-critical (async) CSS           |                                                    |    |
|   |                                                   | Execute 1P JS and hydrate                | Lazy-loaded JS chunks                              | 10 |
|   | **First Input Delay (FID)**                       |                                          |                                                    |    |

<br>

## Proposed Sequence with 3P
|    | **Sequence of events on the main browser thread** |                                                   | **Sequence of requests on the network.**           |    |
|----|---------------------------------------------------|---------------------------------------------------|----------------------------------------------------|----|
| 1  |                                                   | Parse the HTML                                    | FCP blocking 3P resources                          | 1  |
|    |                                                   |                                                   | Small inline 1P scripts.                           | 2  |
| 2  |                                                   | Execute small inline 1P scripts                   | Inlined critical CSS (Preload if external)         | 3  |
| 3  |                                                   | Parse FCP blocking 3P resources                   | Inlined critical Fonts (Preconnect if external)    | 4  |
| 4  |                                                   | Parse FCP resources (critical CSS, font)          | 3P personalized ATF image required for LCP         | 5  |
|    | **First Contentful Paint (FCP)**                  |                                                   | LCP Image (Preconnect if external)                 | 6  |
| 5  |                                                   | Render 3P personalized ATF image required for LCP | Fonts (triggered from inline font-css (Preconnect) | 7  |
|    |                                                   |                                                   | Non-critical (async) CSS                           | 8  |
| 6  |                                                   | Render LCP resources (Hero image, text)           | 3P that must execute before first user interaction | 9  |
|    |                                                   |                                                   | First-party JS for interactivity                   | 10 |
|    | **Largest Contentful Paint (LCP)**                |                                                   | Above the fold images (preconnect)                 | 11 |
| 7  |                                                   | Render important ATF images                       | Default 3P JS                                      | 12 |
| 8  |                                                   | Parse Non-critical (async) CSS                    |                                                    |    |
| 9  |                                                   | Execute 3P required for first user interaction    | Below the fold images                              | 13 |
| 10 |                                                   | Execute 1P JS and hydrate                         | Lazy-loaded JS chunks                              | 14 |
|    | **First Input Delay (FID)**                       |                                                   | Less important 3P JS                               | 15 |

<br>

The main concern here is how do you ensure that 3P scripts are downloaded optimally and in the required sequence.

To achieve the desired sequence, we recommend using the ScriptLoader component for Next. This component is designed to "optimize the critical rendering path and ensure external scripts don't become a bottleneck to optimal page load."

Following are the loading priority values available
- **After-Interactive**: Loads the specific 3P script after the next hydration.
- **Before-Interactive**: Loads the specific 3P script before hydration. 
- **Lazy-Onload**: Prioritize all other resources over the specified 3P script and lazy load the script. 

<br>

## **Conclusion** 
The responsibility of optimizing apps falls on the shoulders of the creators of the platforms used as well as the developers who use it. 