/** Copyright Eric Bidelman <ebidel@gmail.com> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <svg viewBox="-4.5625 -4.5625 9.125 9.125" width="100" height="100">
      <polygon points="0,-4.5625 3,3.4375 0,1.4375 -3,3.4375" fill="#db4437" transform\$="rotate([[heading]])">
      </polygon>
    </svg>
`,

  is: 'navigation-arrow',

  properties: {
    heading: {
      type: Number,
      value: 0
    }
  }
});
