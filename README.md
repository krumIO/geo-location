## Attn! 

This was generated with Modulizer and may be broken

## \<geo-location\>

Original Polymer 2 element: [https://github.com/ebidel/geo-location](https://github.com/ebidel/geo-location)

Geolocation API Polymer web component.

Example to get the device geolocation values:
<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="geo-location.html">
    <div>
      <dom-bind>
        <template is="dom-bind">
          <next-code-block></next-code-block>
        </template>
      </dom-bind>
    </div>
  </template>
</custom-element-demo>
```
-->
```html
<geo-location latitude="{{latitude}}" longitude="{{longitude}}"></geo-location>

<ul>
  <li>Latitude: [[latitude]]</li>
  <li>Longitude: [[longitude]]</li>
</ul>
```
Command that was run with Modulizer:

```bash
modulizer --out . --import-style=name
```