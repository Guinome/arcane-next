import Layout from '../../components/layout'
import axios from 'axios'
import utilStyles from '../../styles/utils.module.css'
import { EpisodeType } from '../../lib/arcane'
import { GetServerSideProps } from 'next'

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
          <div>{episode.vote_average}❤️ ({episode.vote_count} votes)</div>
        </div>
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
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
