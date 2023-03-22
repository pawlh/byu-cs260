# Notes on the Simon application

I like the ease of using applying margin and padding that Bootstrap provides and found the following from their documentation to be quite helpful:

### Notation

Spacing utilities that apply to all breakpoints, from `xs` to `xxl`, have no breakpoint abbreviation in them. This is because those classes are applied from `min-width: 0` and up, and thus are not bound by a media query. The remaining breakpoints, however, do include a breakpoint abbreviation.

The classes are named using the format `{property}{sides}-{size}` for `xs` and `{property}{sides}-{breakpoint}-{size}` for `sm`, `md`, `lg`, `xl`, and `xxl`.

Where _property_ is one of:

- `m` - for classes that set `margin`
- `p` - for classes that set `padding`

Where _sides_ is one of:

- `t` - for classes that set `margin-top` or `padding-top`
- `b` - for classes that set `margin-bottom` or `padding-bottom`
- `s` - (start) for classes that set `margin-left` or `padding-left` in LTR, `margin-right` or `padding-right` in RTL
- `e` - (end) for classes that set `margin-right` or `padding-right` in LTR, `margin-left` or `padding-left` in RTL
- `x` - for classes that set both `*-left` and `*-right`
- `y` - for classes that set both `*-top` and `*-bottom`
- blank - for classes that set a `margin` or `padding` on all 4 sides of the element

Where _size_ is one of:

- `0` - for classes that eliminate the `margin` or `padding` by setting it to `0`
- `1` - (by default) for classes that set the `margin` or `padding` to `$spacer * .25`
- `2` - (by default) for classes that set the `margin` or `padding` to `$spacer * .5`
- `3` - (by default) for classes that set the `margin` or `padding` to `$spacer`
- `4` - (by default) for classes that set the `margin` or `padding` to `$spacer * 1.5`
- `5` - (by default) for classes that set the `margin` or `padding` to `$spacer * 3`
- `auto` - for classes that set the `margin` to auto

## Selecting elements in JS
`querySelector` - can do everything that `getElementById` can do, but also more. It can select elements by class, tag, or any other attribute. It can also select multiple elements at once.

## Express

I found the modular `Router` to be an interesting way of mounting endpoints, especially for when the number of endpoints gets larger. I like the idea of having an `api/` directory with each subtype of api being housed in its own JS file

Here is a reference to the methods available on the `response` objects:

```
res.download()   - Prompt a file to be downloaded.
res.end()        - End the response process.
res.json()	     - Send a JSON response.
res.jsonp()	     - Send a JSON response with JSONP support.
res.redirect()   - Redirect a request.
res.render()     - Render a view template.
res.send()       - Send a response of various types.
res.sendFile()   - Send a file as an octet stream.
res.sendStatus() - Set the response status code and send its string representation as the response body.
```  

## cURL

I pretty much only ever use Postman to make HTTP requests, but it seems that `curl` isn't as hard as I've always thought it was:

```
-X (or --request) <method>
-d (or --data) "<any string of ascii chars>"
```