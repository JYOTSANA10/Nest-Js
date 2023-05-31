-- AlterTable
ALTER TABLE `user` ADD COLUMN `role_id` INTEGER NOT NULL DEFAULT 2;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `permission` VARCHAR(45) NULL,

    UNIQUE INDEX `role_id_key`(`id`),
    UNIQUE INDEX `role_name_key`(`name`),
    UNIQUE INDEX `role_permission_key`(`permission`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
