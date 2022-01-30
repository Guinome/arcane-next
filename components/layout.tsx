import Head from 'next/head'
import Link from 'next/link'

export default function Layout({
  children,
  home,
  title,
  description
}: {
  children: React.ReactNode
  home?: boolean
  title: string
  description: string
}) {
  return (
    <div className='min-h-screen bg-gray-50 py-6 flex flex-col justify-center relative'>
      <div className='px-6 pt-10 pb-8 bg-white shadow-xl ring-1 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10'>
        <Head>
          <meta
            name="description"
            content={description}
          />
          <meta name="og:title" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header>
          {(
            <>
              <h1 className='text-2xl font-bold leading-7 mb-2'>
                <Link href="/">
                  <a>{title}</a>
                </Link>
              </h1>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div>
            <Link href="/">
              <a className='font-medium text-indigo-600 hover:text-indigo-500'>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
