import axios from 'axios'
import { PrismaClient } from '@prisma/client'


let prisma: PrismaClient

export function getPrismaClient() {
  if (!prisma) prisma = new PrismaClient()

  return prisma
}

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
  id: number
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

export async function getSeasonOneData(): Promise<SeasonType> {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/tv/94605/season/1?api_key=2f0dc80917b2cc0c71331a0411fec000'
    )

    return data
}

export async function getArcaneInfos(): Promise<ArcaneDataType> {
  const [generalInfos, seasonOneData] = await Promise.all([
    getGeneralInfos(),
    getSeasonOneData(),
  ])

  return {
    generalInfos,
    seasonOneData,
  }
}

export async function getEpisode(id): Promise<EpisodeType> {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/94605/season/1/episode/${id}?api_key=2f0dc80917b2cc0c71331a0411fec000`
  )

  return data
}

export const getEpisodeNote = async (id: number) => {
  const prisma = getPrismaClient()
  const votes = await prisma.vote.findMany({
    where: { episodeId: id }
  })

  // To avoid `too many clients` errors
  // I guess there is a better place for this
  await prisma.$disconnect()

  return votes.length
    ? {
      note: votes.reduce((prev, next) => +prev + +next.note, 0) / votes.length,
      count: votes.length,
    }
    : {
      note: 0,
      count: 0
    }
}

export const voteEpisode = async (id: number, note: number) => {
  const prisma = getPrismaClient()
  await prisma.vote.create({ data: { episodeId: id, note } })

  const vote = getEpisodeNote(id)

  // To avoid `too many clients` errors
  // I guess there is a better place for this
  await prisma.$disconnect()

  return vote
}