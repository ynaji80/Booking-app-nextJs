import 'tailwindcss/tailwind.css'
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router'
import{Provider} from 'next-auth/client'

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
      <Provider session={pageProps.session} >
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" rel="stylesheet"/> 
      <link href="https://fonts.googleapis.com/css2?family=Niramit:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap" rel="stylesheet"/> 
      <link href="https://fonts.googleapis.com/css2?family=Niramit:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/> 
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"/> 
      < meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
      <Component {...pageProps} />
      </Provider>
  )}

export default MyApp
