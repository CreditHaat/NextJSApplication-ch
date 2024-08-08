
// import '@styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS



export const metadata = {
  title: 'Credithaat',
  description: 'Apply for Personal Loan with CreditHaat. Streamlined application process, quick approvals, and a customer-focused approach.',
  icons: {
    icon: '/logo1-removebg-preview.png',
    apple: '/logo192.png',
    // Add any other icons if necessary
  },
  canonical: 'https://app.credithaat.com',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={metadata.canonical} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WGB7TPX');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGB7TPX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager */}
      </head>
      <body style={{ fontFamily: 'Times New Roman' }}>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        
        {children}
      </body>
    </html>
  );
}
