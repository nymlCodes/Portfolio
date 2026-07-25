import './globals.css'

export const metadata = {
  title: 'Neyamul Islam | Frontend Developer',
  description: 'Portfolio of Neyamul Islam - Frontend Developer from Bangladesh',
  icons:{
    icon:'/favicon.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
