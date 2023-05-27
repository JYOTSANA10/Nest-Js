/*
  Warnings:

  - You are about to drop the column `category` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `product_link_key` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `category`,
    DROP COLUMN `link`,
    ADD COLUMN `description` VARCHAR(255) NULL,
    ADD COLUMN `image` VARCHAR(255) NULL;
