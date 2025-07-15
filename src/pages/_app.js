import '../styles/globals.css';
// Removed: import { useRouter } from 'next/router';
// Removed: import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // No more dynamic body class manipulation needed

  return <Component {...pageProps} />;
}

export default MyApp;