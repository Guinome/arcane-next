import { getEpisodeNote, voteEpisode } from "../../../lib/arcane"

export default async function userHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      res.status(200).json(
        await getEpisodeNote(+id)
      )
      break

    case 'POST':
      res.status(200).json(
        await voteEpisode(+id, 10)
      )
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}