import './globals.css'
import { Inter } from 'next/font/google'

import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import SessionProvider from '../../pages/sessionProvider'
import Login from './login/page'

//Modificar fontes e estilos globais nesse arquivo

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title:{
    template: '%s | Fabrica 2023-2',
    default: 'Fabrica 2023-2',
  },
  description: 'Sistema de Emissão de Certificados',
}

//Não alterar o código abaixo

export default async function RootLayout({ children }) {

  const session = await getServerSession( authOptions );

  return (
    <html lang="en">
      <body className={inter.className}>
       <SessionProvider session={session}>
        {
          !session ? (
            <Login/>
          ) : (
            <main>{children}</main>
          )
        }
       </SessionProvider>
      </body>
    </html>
  )
}
