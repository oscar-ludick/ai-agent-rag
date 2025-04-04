CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS "resources"
(
    "id"         varchar(191) PRIMARY KEY NOT NULL,
    "source"     text                     NOT NULL,
    "content"    text                     NOT NULL,
    "created_at" timestamp DEFAULT now()  NOT NULL,
    "updated_at" timestamp DEFAULT now()  NOT NULL
);

CREATE TABLE IF NOT EXISTS "messages"
(
    "id"         varchar(191) PRIMARY KEY NOT NULL,
    "chat_id"     text                     NOT NULL,
    "message"    text                     NOT NULL,
    "created_at" timestamp DEFAULT now()  NOT NULL,
    "updated_at" timestamp DEFAULT now()  NOT NULL
);

-- CREATE TABLE "embeddings"
-- (
--     "id"          varchar(191) PRIMARY KEY,
--     "content"     text        NOT NULL,
--     "embedding"   vector(768) NOT NULL,
--     "resource_id" varchar(191),
--     CONSTRAINT "embeddings_resource_id_fkey"
--         FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE CASCADE
-- );
--
-- CREATE INDEX "embeddingIndex"
--     ON "embeddings"
--         USING hnsw ("embedding" vector_cosine_ops);