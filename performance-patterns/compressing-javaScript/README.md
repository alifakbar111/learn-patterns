# Compressing JavaScript

### Reduce the time needed to transfer scripts over the network.

Compress your JavaScript and keep an eye on your chunk sizes for optimal performance. Overly high JavaScript bundle granularity can help with deduplication & caching, but can suffer from poorer compression & impact loading in the 50-100 chunks range (due to browser processes, cache checks etc).

JavaScript is the second biggest contributor to page size and the second most requested web resource on the internet after images.

You can combine compression with other techniques such as minification, code-splitting, bundling, caching, and lazy-loading to reduce the performance impact of large amounts of JavaScript.

<br>

## HTTP compression

HTTP compression uses this simple concept to compress website content, reduce page weights, lower bandwidth requirement, and improve performance.

HTTP data compression may be categorized in different ways. One of them is lossy vs. lossless.

- **Lossy compression** implies that the compression-decompression cycle results in a slightly altered document while retaining its usability.
- With **Lossless compression**, the data recovered after compression and subsequent decompression will match precisely with the original.

## Minification

Minification complements compression by removing whitespace and any unnecessary code to create a smaller but perfectly valid code file. Minification reduces the JavaScript code to the minimum required for successful execution.

Minification is a standard practice for JS and CSS optimization. It's common for JavaScript library developers to provide minified versions of their files for production deployments, usually denoted with a min.js name extension. (e.g., jquery.js and jquery.min.js).

<br>

## Static vs. dynamic compression

You can implement server-side compression in two ways.

**Static Compression**: You can use static compression to pre-compress resources and save them ahead of time as part of the build process.

**Dynamic Compression**: With this process, compression takes place on the fly when the browser requests resources. Dynamic compression is easier to implement, but you are restricted to using lower compression levels.

<br>

## Compression algorithms

Gzip and Brotli are the two most common algorithms used for compressing HTTP data today.

- Gzip - The Gzip compression format has been around for almost 30 years and is a lossless algorithm based on the [Deflate algorithm](https://www.youtube.com/watch?v=whGwm0Lky2s&t=851s). The deflate algorithm itself uses a combination of the LZ77 algorithm and Huffman coding on blocks of data in an input data stream.

  **The LZ77 algorithm** identifies duplicate strings and replaces them with a backreference, which is a pointer to the place where it previously appeared, followed by the length of the string.

  Subsequently, **Huffman coding** identifies the commonly used references and replaces them with references with shorter bit sequences. Longer bit sequences are used to represent infrequently used references.

- Brotli - In 2015, Google introduced the Brotli algorithm and the Brotli compressed data format. Like GZip, _Brotli_ too is a lossless algorithm based on the LZ77 algorithm and Huffman coding. Additionally, it uses 2nd order context modeling to yield denser compression at similar speeds.

    Brotli also supports a larger window size for backreferences and has a static dictionary. These features help increase its efficiency as a compression algorithm.

![images](https://www.patterns.dev/img/compression/compressingjav--zz1j9i0tui.png)

## Enabling compression
The plugin can be included in the Webpack config file as follows.

```js
module.exports = {
 //...
 plugins: [
   //...
   new CompressionPlugin()
 ]
}
```
Next.js provides Gzip compression by default but recommends enabling it on an HTTP proxy like Nginx.

`Accept-Encoding: gzip, br`

This indicates that the browser supports Gzip and Brotli. You can enable different types of compression on your server by following instructions for the specific server type.

## Bundling terminology
1. **Module**: Modules are discrete chunks of functionality designed to provide solid abstractions and encapsulation.
2. **Bundle**: Group of distinct modules that contain the final versions of source files and have already undergone the loading and compilation process in the bundler.
3. **Bundle splitting**: The process utilized by bundlers to split the application into multiple bundles such that each bundle can be isolated, published, downloaded, or cached independently.
4. **Chunk**: Adopted from Webpack terminology, a chunk is the final output of the bundling and code-splitting process. 

Large JS applications can be deconstructed into chunks of independently loadable JavaScript files. Loading granularity refers to the number of output chunks—the higher the number of chunks, the smaller each chunk's size and higher the granularity.

Some chunks are more critical than others because they are loaded more frequently or are part of more impactful code paths.

## The granularity trade-off

In an ideal world, the granularity and chunking strategy should aim to achieve the following goals, which are at odds with each other.

1. **Improve download speed**: Compressing one large chunk will yield a better result or smaller file size than compressing multiple small chunks with the same code.

2. **Improve cache hits and caching efficiency:** Smaller-sized chunks result in better caching efficiency, especially for apps that load JS incrementally.

3. **Execute fast**- For code to execute fast, it should satisfy the following.

<br>

## Conclusion

Compression alone cannot solve all `JavaScript performance` issues, but understanding how browsers and bundlers work behind the scenes can help create a better bundling strategy that will support better compression. The loading granularity problem needs to be addressed across different platforms in the ecosystem. Granular chunking may be one step in that direction, but we have a long way to go.
