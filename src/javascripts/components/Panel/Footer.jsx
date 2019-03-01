import React from 'react';

const viewSource = () => {
  return 'view-source:';
}
//<a href={`view-source:${url}`} target="_blank" title="View source"><button>vs</button></a>
export default function Panel(props) {

  const {url} = props;

  var url_parts = new URL(url);

  var fagbd="https://www.google.com/webmasters/tools/googlebot-fetch?hl=en&authuser=0&siteUrl="+encodeURIComponent(url_parts.origin)+"/&path="+encodeURIComponent(url_parts.pathname.substr(1)+url_parts.search)+"&type=DESKTOP";

  var fagbm="https://www.google.com/webmasters/tools/googlebot-fetch?hl=en&authuser=0&siteUrl="+encodeURIComponent(url_parts.origin)+"/&path="+encodeURIComponent(url_parts.pathname.substr(1)+url_parts.search)+"&type=SMARTPHONE_NEW";

  var q = "https://search.google.com/search-console/performance/search-analytics?resource_id="+encodeURIComponent(url_parts.origin)+"&breakdown=query&num_of_days=28&page=!"+encodeURIComponent(url);

  var p = "https://search.google.com/search-console/performance/search-analytics?resource_id="+encodeURIComponent(url_parts.origin)+"&breakdown=page&num_of_days=28&page=!"+encodeURIComponent(url);

// var l = "https://lighthouse-dot-webdotdevsite.appspot.com/lh/html?url="+encodeURIComponent(url);

  return (
    <footer>
      <a href={`${url}`} target="_top" title="Reload"><button className="Button Button--haptic">↻</button></a>
      <a href={`https://developers.google.com/speed/pagespeed/insights/?hl=en&url=${url}`} target="_blank" title="Page Speed Insights"><button className="Button Button--haptic">Psi</button></a>
      <a href={`https://www.webpagetest.org?url=${url}`} target="_blank" title="WebPageTest.org"><button className="Button Button--haptic">Wp</button></a>
      <a href={`https://search.google.com/test/mobile-friendly?hl=en&url=${url}`} target="_blank" title="Mobile Friendly Test"><button className="Button Button--haptic">Mf</button></a>
      <a href={`https://search.google.com/structured-data/testing-tool?hl=en&url=${url}`} target="_blank" title="Structured Data Testing Tool"><button className="Button Button--haptic">Sd</button></a>
      <a href={`https://search.google.com/test/rich-results?hl=en&url=${url}`} target="_blank" title="Rich Results Test"><button className="Button Button--haptic">Rr</button></a>
      <a href={`${fagbd}`} target="_blank" title="Fetch as Googlebot Desktop"><button className="Button Button--haptic">Fd</button></a>
      <a href={`${fagbm}`} target="_blank" title="Fetch as Googlebot Mobile"><button className="Button Button--haptic">Fm</button></a>
      <a href={`http://webcache.googleusercontent.com/search?hl=en&strip=1&q=cache:${url}`} target="_blank" title="Google Cache Text Only"><button className="Button Button--haptic">C</button></a>
      <a href={`${q}`} target="_blank" title="Query Performance Google Search Console"><button className="Button Button--haptic">Q</button></a>
      <a href={`${p}`} target="_blank" title="Page Performance Google Search Console"><button className="Button Button--haptic">P</button></a>
      
    </footer>
  );
} 

//<a href={`${l}`} target="_blank" title="Remote Google Lighthouse"><button className="Button Button--haptic">Lh</button></a>
//&nbsp;
//      <a href={`https://developers.facebook.com/tools/debug/sharing/?q=${url}`} target="_blank" title="Facebook Debugger"><button className="Button Button--haptic">Fb</button></a>
