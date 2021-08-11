import 'tailwindcss/tailwind.css'
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  const progress = new ProgressBar(
    {
      size: 3,
      color:'#d67272',
      className:'z-50',
      delay:0
    }
  );
  
  Router.events.on('routeChangeStart',progress.start);
  Router.events.on('routeChangeComplete',progress.finish);
  Router.events.on('routeChangeError',progress.finish);

  return( 
      <>
      < meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
      <Component {...pageProps} />
      </>
  )}


export default MyApp
