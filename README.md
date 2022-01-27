Tilalilalou

`docker-compose up -d`
`psql -p 5432 -h db -U postgres -c "CREATE DATABASE \"arcane\" OWNER postgres"`
`npx prisma migrate`
`yarn dev`

2 hours later this is where I am, 
- List of episodes from external api on main page
- episode detail page
- prisma (vote) + postgres

What it misses
- Obviously TailwindCSS
- async load of episode votes on main page ("we don't care if the votes count is accurate by the second.")
- plug prisma (now the votes comes from episode informations, not from db)
