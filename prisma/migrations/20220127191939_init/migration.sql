-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "note" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);
