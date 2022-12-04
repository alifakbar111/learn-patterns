# Islands Architecture

*tl;dr: The islands architecture encourages small, focused chunks of interactivity within server-rendered web pages. The output of islands is progressively enhanced HTML, with more specificity around how the enhancement occurs. Rather than a single application being in control of full-page rendering, there are multiple entry points. The script for these "islands" of interactivity can be delivered and hydrated independently, allowing the rest of the page to be just static HTML.*

The core principle for **SSR** is that HTML is rendered on the server and shipped with necessary JavaScript to rehydrate it on the client. 

**Rehydration** is the process of regenerating the state of UI components on the client-side after the server renders it. Since rehydration comes at a cost, each variation of SSR tries to optimize the rehydration process. This is mainly achieved by partial hydration of critical components or streaming of components as they get rendered.

## Islands Architecture

The term **Islands architecture** was popularized by Katie Sylor-Miller and Jason Miller to describe a paradigm that aims to reduce the volume of JavaScript shipped through "islands" of interactivity that can be independent delivered on top of otherwise static HTML.

**Islands** are a component-based architecture that suggests a compartmentalized view of the page with *static* and *dynamic islands*. 
- The static regions of the page are pure non-interactive HTML and do not need hydration. 
- he dynamic regions are a combination of HTML and scripts capable of rehydrating themselves after rendering.

![Island Arch](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1633284886/patterns.dev/theislandsarch--avuxy9rrkk8.png)

<br>

## Islands of dynamic components
Most pages are a combination of static and dynamic content. Usually, a page consists of static content with sprinkles of interactive regions that can be isolated. 

Static content is stateless, does not fire events, and does not need rehydration after rendering. After rendering, dynamic content (buttons, filters, search bar) has to be rewired to its events. The DOM has to be regenerated on the client-side (virtual DOM). This regeneration, rehydration, and event handling functions contribute to the JavaScript sent to the client.

The Islands architecture facilitates server-side rendering of pages with all of their static content. In this case, the rendered HTML will include placeholders for dynamic content. The dynamic content placeholders contain self-contained component widgets. 

## Implementing Islands
The Island architecture borrows concepts from different sources and aims to combine them optimally. Most modern JavaScript frameworks also support isomorphic rendering, which allows you to use the same code to render elements on the server and client.

Jason's post suggests the use of `requestIdleCallback()` to implement a scheduling approach for hydrating components. Static isomorphic rendering and scheduling of component level partial hydration can be built into a framework to support Islands architecture.

## Frameworks
1. **Marko**: Marko is an open-source framework developed and maintained by eBay to improve server rendering performance. 
2. **Astro**: Astro is a static site builder that can generate lightweight static HTML pages from UI components built in other frameworks such as React, Preact, Svelte, Vue, and others.
3. **Eleventy + Preact**: Eleventy a static site generator with isomorphic Preact components that can be partially hydrated.

## Pros and Cons
The Islands architecture combines ideas from different rendering techniques such as server-side rendering, static site generation, and partial hydration.

### Advantages

1. **Performance**: Reduces the amount of JavaScript code shipped to the client. Much less than the script needed to recreate the virtual DOM for the entire page and rehydrate all the elements on the page.
2. **SEO**: Since all of the static content is rendered on the server; pages are SEO friendly.
3. **Prioritizes important content**: Key content is available almost immediately to the user.
4. **Accessibility**: The use of standard static HTML links to access other pages helps to improve the accessibility of the website.
5. **Component-based**: The architecture offers all advantages of component-based architecture, such as reusability and maintainability.

### Disadvantages
1. The only options available to developers to implement Islands are to use one of the few frameworks available or develop the architecture yourself.
2. Besides Jason's initial post, there is little discussion available on the idea.
3. New frameworks claim to support the Islands architecture making it difficult to filter the ones which will work for you.
4. The architecture is not suitable for highly interactive pages like social media apps which would probably require thousands of islands.

The architecture is not suitable for highly interactive pages like social media apps which would probably require thousands of islands.