import axios from 'axios'

export type ArcaneDataType = {
  generalInfos: GeneralInfosType
  seasonOneData: SeasonType
}

type GeneralInfosType = {
  original_name: string
  overview: string
  seasons: SeasonInfosType[]
}

type SeasonInfosType = {
  episode_count: number
}

type SeasonType = {
  name: string
  episodes: EpisodeType[]
}

export type EpisodeType = {
  episode_number: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
}

export async function getGeneralInfos(): Promise<GeneralInfosType> {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/tv/94605?api_key=2f0dc80917b2cc0c71331a0411fec000'
    )

    return data
}

async function getSeasonOneData(): Promise<SeasonType> {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/tv/94605/season/1?api_key=2f0dc80917b2cc0c71331a0411fec000'
    )

    return data
}

export async function getArcaneInfos(): Promise<ArcaneDataType> {
  const [generalInfos, seasonOneData] = await Promise.all([
    getGeneralInfos(),
    getSeasonOneData()
  ])

  return {
    generalInfos,
    seasonOneData,
  }
}