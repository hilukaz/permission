-- DropForeignKey
ALTER TABLE `products_categories` DROP FOREIGN KEY `products_categories_id_category_fkey`;

-- DropForeignKey
ALTER TABLE `products_categories` DROP FOREIGN KEY `products_categories_id_product_fkey`;

-- AddForeignKey
ALTER TABLE `products_categories` ADD CONSTRAINT `products_categories_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_categories` ADD CONSTRAINT `products_categories_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
