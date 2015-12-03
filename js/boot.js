var webComponentsSupported = (
  'registerElement' in document &&
  'import' in document.createElement('link') &&
  'content' in document.createElement('template'));

function webComponentsLoaded(){
  // window.Polymer = window.Polymer || {dom: 'shadow'};
  window.webComponentsReady = true;
}

if (!webComponentsSupported) {
  var script = document.createElement('script');
  script.async = true;
  script.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
  script.onload = webComponentsLoaded;
  document.head.appendChild(script);
} else {
  console.log('WebComponents Supported');
  var readyEvent = new Event('WebComponentsReady');
  window.dispatchEvent(readyEvent);
  webComponentsLoaded();
}
