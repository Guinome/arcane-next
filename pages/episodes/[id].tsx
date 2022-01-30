import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '../../components/layout'
import { EpisodeType, getEpisode, getEpisodeNote } from '../../lib/arcane'

export default function Episode({
  episode,
  note
}: {
  episode: EpisodeType
  note
}) {  
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  return (
    <Layout title={episode.name} description={episode.overview}>
      <article className="py-2 mb-2">
        <div>
          <p className='mb-3'>{episode.overview}</p>
          <div className='mb-3'>{note?.note} ({note?.count} votes)</div>
          <button 
            type='button' 
            className='inline-flex items-center px-2 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={async () => {
              axios.post(`/api/vote/${episode.id}`)
                .then(() => refreshData())
            }}>Vote for {episode.name}</button>
        </div>
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const episode = await getEpisode(params.id)
  const note = await getEpisodeNote(episode.id)
  return {
    props: {
      episode,
      note,
    }
  }
}
