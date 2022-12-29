# List Virtualization

### Optimize list performance with list virtualization

<br>

This is the idea of rendering only visible rows of content in a dynamic list instead of the entire list.

If you use React and need to display large lists of data efficiently, you may be familiar with react-virtualized. It's a windowing library by Brian Vaughn that renders only the items currently visible in a list (within a scrolling "viewport"). This means you don't need to pay the cost of thousands of rows of data being rendered at once.

### How does list virtualization work?

"Virtualizing" a list of items involves maintaining a window and moving that window around your list. Windowing in react-virtualized works by:

- Having a small container DOM element (e.g `<ul>`) with relative positioning (window)
- Having a big DOM element for scrolling
- Absolutely positioning children inside the container, setting their styles for top, left, width and height.

Rather than rendering 1000s of elements from a list at once (which can cause slower initial rendering or impact scroll performance), **virtualization focuses on rendering just items visible to the user**.

![images](https://www.patterns.dev/img/remote/1EIwO5-640w.avif)

<br>

## A smaller alternative to react-virtualized

[react-window](https://react-window.now.sh/) is a rewrite of react-virtualized by the same author aiming to be smaller, faster and more [tree-shakeable](https://web.dev/reduce-javascript-payloads-with-tree-shaking/).

![images](https://www.patterns.dev/img/remote/1NYEbw-640w.avif)

<br>

### More in-depth react-window examples

Here's a snippet of how react-window-infinite-loader is incorporated in this app:

```js
import React, { Component } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
  render() {
    return (
      <InfiniteLoader
        isItemLoaded={this.isItemLoaded}
        loadMoreItems={this.loadMoreItems}
        itemCount={this.state.count + 1}
      >
        {({ onItemsRendered, ref }) => (
          <Grid
            onItemsRendered={this.onItemsRendered(onItemsRendered)}
            columnCount={COLUMN_SIZE}
            columnWidth={180}
            height={800}
            rowCount={Math.max(this.state.count / COLUMN_SIZE)}
            rowHeight={220}
            width={1024}
            ref={ref}
          >
            {this.renderCell}
          </Grid>
        )}
      </InfiniteLoader>
    );
  }
```

## What's missing from react-window?

`react-window` does not yet have the complete API surface of react-virtualized, so do check the comparison docs if considering it. What's missing?

- `WindowScroller` - This is a react-virtualized component that enables Lists to be scrolled based on the window's scroll positions. There are currently no plans to implement this for react-window so you'll need to solve this in userland.
- `AutoSizer` - HOC that grows to fit all of the available space, automatically adjusting the width and height of a single child.
- `CellMeasurer` - HOC automatically measuring a cell's content by rendering it in a way that is not visible to the user.

## Improvements in the web platform #
Some modern browsers now support CSS content-visibility. `content-visibility:auto` allows you to skip rendering & painting offscreen content until needed.