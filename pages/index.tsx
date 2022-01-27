import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getArcaneInfos, ArcaneDataType } from '../lib/arcane'
import Link from 'next/link'
import { GetStaticProps, GetServerSideProps, GetServerSidePropsContext } from 'next'


export default function Home({
  arcaneData
}: {
  arcaneData: ArcaneDataType
}) {
  return (
    <Layout home title={arcaneData.generalInfos?.original_name} description={arcaneData.generalInfos?.overview}>
      <Head>
        <title>Arcane</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h4>Overview:</h4>
        <p>{arcaneData.generalInfos?.overview}</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Episodes</h2>
        <ul className={utilStyles.list}>
          {arcaneData.seasonOneData?.episodes.map((episode) => (
            <li className={utilStyles.listItem} key={episode.episode_number}>
              <Link href={`/episodes/${episode.episode_number}`}>
                <a>{episode.name}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                Note : //Get the note async 
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
    arcaneData : await getArcaneInfos()
  }
})
