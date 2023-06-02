-- DropIndex
DROP INDEX `order_cart_id_fkey` ON `order`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isdeleted` BOOLEAN NOT NULL DEFAULT false;
