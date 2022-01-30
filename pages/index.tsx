import useSWR from 'swr'
import axios from 'axios'
import Head from 'next/head'
import Layout from '../components/layout'
import { getArcaneInfos, ArcaneDataType } from '../lib/arcane'
import Link from 'next/link'
import { GetStaticProps } from 'next'

const fetcher = url => axios.get(url).then(res => res.data)
export default function Home({
  arcaneData,
}: {
  arcaneData: ArcaneDataType
}) {
  const datas = arcaneData.seasonOneData.episodes.map((episode) => useSWR(`/api/vote/${episode.id}`, fetcher))

  return (
    <Layout home title={arcaneData.generalInfos?.original_name} description={arcaneData.generalInfos?.overview}>
      <Head>
        <title>Arcane</title>
      </Head>
      <section className='py-2 mb-2'>
        <h4>Overview:</h4>
        <p>{arcaneData.generalInfos?.overview}</p>
      </section>
      <section className='py-2'>
        <h2>Episodes:</h2>
        <ul>
          {arcaneData.seasonOneData?.episodes.map((episode, index) => (
            <li className='py-2' key={episode.episode_number}>
              <Link href={`/episodes/${episode.episode_number}`}>
                <a className='font-medium text-indigo-600 hover:text-indigo-500'>{episode.name}</a>
              </Link>
              <br />
              <small>
                Note : {datas[index]?.data?.count ? datas[index]?.data?.note : 'No votes yet'}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    arcaneData: await getArcaneInfos(),
  }
})
