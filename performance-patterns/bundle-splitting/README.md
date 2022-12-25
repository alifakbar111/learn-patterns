# Bundle Splitting
### Split your code into small, reusable pieces

When building a modern web application, bundlers such as Webpack or Rollup take an application's source code, and bundle this together into one or more bundles. When a user visits a website, the bundle is requested and loaded in order to display the data to the user's screen. 

Even though modern browsers are able to stream the bundle as it arrives, it can still take a significant time before the first pixel is painted on the user's device. **The bigger the bundle**, the longer it can take before the engine reaches the line on which the first rendering call has been made. 

A larger bundle leads to an increased amount of **loading time**, **processing time**, and **execution time**. It would be great if we could reduce the size of this bundle, in order to speed things up.

Instead of requesting one giant bundle that contains unnecessary code, we can split the bundle into multiple smaller bundles!. We can reduce the time it takes before the first content has been painted on the user's screen, the F**irst Contentful Paint**, and the time it takes before the largest component has been rendered to the screen, the L**argest Contentful Paint**.

A bigger bundle doesn't necessarily mean a longer execution time. It could happen that we loaded a ton of code that the user won't even use.

The engine still has to load, parse and compile code that's not even used on the initial render before the user is able to see anything on their screen. 

By **bundle-splitting** the large bundle into two smaller bundles, we reduce the initial loading time by fetching a smaller amount of data.