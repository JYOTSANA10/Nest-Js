-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_cart_id_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `cart_id` VARCHAR(45) NOT NULL;
