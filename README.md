If called, stops requesting segments, and refreshing the playlist.

#### Event: progress
* `Object` - Current segment with the following fields,
  - `number` - number
  - `number` - size
  - `number` - duration
  - `string` - url
* `number` - Total number of segments.
* `number` - Bytes downloaded up to this point.

For static non-live playlists, emitted each time a segment has finished downloading. Since total download size is unknown until all segment endpoints are hit, progress is calculated based on how many segments are available.