import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Do-it | ✔️ Get Your Tasks done',
  description: 'A Todo app',
  icons: {
    icon:'/images/logo.png', 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {children}
        <script
      src="https://kit.fontawesome.com/c8eb323ddc.js"
    ></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

        </body>
    </html>
  )
}
