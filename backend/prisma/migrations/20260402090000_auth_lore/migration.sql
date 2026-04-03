-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lore" TEXT,
    "class" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "vitality" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "imageName" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Character" (
    "id",
    "name",
    "class",
    "race",
    "strength",
    "dexterity",
    "intelligence",
    "vitality",
    "imageUrl",
    "imageName",
    "createdAt",
    "updatedAt",
    "userId"
)
SELECT
    "id",
    "name",
    "class",
    "race",
    "strength",
    "dexterity",
    "intelligence",
    "vitality",
    "imageUrl",
    "imageName",
    "createdAt",
    "updatedAt",
    'legacy-user'
FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "lgpdAccepted" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Seed a user used by legacy rows to preserve existing characters
INSERT INTO "User" ("id", "username", "email", "passwordHash", "lgpdAccepted", "createdAt", "updatedAt")
VALUES ('legacy-user', 'legacy', 'legacy@local.invalid', '$2b$10$YAr3x1v9qJ35D6YJxV9AruH4Q7Q4CQ31AeM9Byxv34QdxobYvV9kC', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
CREATE INDEX "Character_createdAt_idx" ON "Character"("createdAt");
CREATE INDEX "Character_userId_idx" ON "Character"("userId");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
