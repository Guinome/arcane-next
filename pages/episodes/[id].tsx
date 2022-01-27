import Layout from '../../components/layout'
import axios from 'axios'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { EpisodeType, getGeneralInfos } from '../../lib/arcane'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export default function Post({
  episode
}: {
  episode: EpisodeType
}) {
  return (
    <Layout title={episode.name} description={episode.overview}>
      <article>
        <h1 className={utilStyles.headingXl}>{episode.name}</h1>
        <div className={utilStyles.lightText}>
          <p>{episode.overview}</p>
          <Date dateString={episode.air_date} />
          <div>{episode.vote_average}❤️ ({episode.vote_count} votes)</div>
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const arcaneInfos = await getGeneralInfos()

  return {
    paths: Array(arcaneInfos.seasons[0].episode_count).fill(null).map((item, index) => ({
      params: { id: index.toString() }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    episode : await getEpisode(params.id)
  }
})


async function getEpisode(id): Promise<EpisodeType> {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/94605/season/1/episode/${id}?api_key=2f0dc80917b2cc0c71331a0411fec000`
  )

  return data
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const postData = await getPostData(params.id as string)
//   return {
//     props: {
//       postData
//     }
//   }
// }
