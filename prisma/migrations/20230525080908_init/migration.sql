/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `product_id_key` ON `product`(`id`);
