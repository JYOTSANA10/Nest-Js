/*
  Warnings:

  - You are about to drop the column `permission` on the `admin_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin_user` DROP COLUMN `permission`,
    ADD COLUMN `password` VARCHAR(255) NULL;
