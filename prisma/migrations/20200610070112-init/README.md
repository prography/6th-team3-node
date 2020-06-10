# Migration `20200610070112-init`

This migration has been generated at 6/10/2020, 7:01:12 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `petmily`.`hotel_service` (
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`hotel_id` int NOT NULL ,`id` int NOT NULL  AUTO_INCREMENT,`name` varchar(191)   ,`updated_at` datetime(3)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`price` (
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`day` varchar(191)   ,`hotel_id` int NOT NULL ,`id` int NOT NULL  AUTO_INCREMENT,`price` int   ,`size` ENUM('small', 'medium', 'large')   ,`updated_at` datetime(3)   ,`weight` int   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `petmily`.`hotel` ADD COLUMN `largs_criteria` int   ,
ADD COLUMN `medium_criteria` int   ;

ALTER TABLE `petmily`.`Price` DROP FOREIGN KEY `Price_ibfk_1`;

ALTER TABLE `petmily`.`hotel_services` DROP FOREIGN KEY `hotel_services_ibfk_1`;

ALTER TABLE `petmily`.`hotel_service` ADD FOREIGN KEY (`hotel_id`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`price` ADD FOREIGN KEY (`hotel_id`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

DROP TABLE `petmily`.`Price`;

DROP TABLE `petmily`.`hotel_services`;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200610065643-init..20200610070112-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource mysql {
-  url = "***"
+  url      = env("DATABASE_URL")
   provider = "mysql"
 }
 generator client {
@@ -28,8 +28,10 @@
   monitorAvailable Boolean?     @map("monitor_available")
   isNeuteredOnly   Boolean?     @map("is_neutered_only")
   maxDogSize       Int?         @map("max_dog_size")
   pageLink         String?      @map("page_link")
+  mediumCriteria   Int?         @map("medium_criteria") //소형견과 중형견을 나누는 기준
+  largeCriteria    Int?         @map("largs_criteria") //중형견과 대형견을 나누는 기준
   monitorings      Monitoring[]
   services         Service[]
   prices           Price[]
   customers        User[]       @relation(references: [id])
@@ -55,9 +57,9 @@
   updatedAt DateTime? @map("updated_at") @updatedAt
   name      String?
   hotel     Hotel     @relation(fields: [hotelId], references: [id])
-  @@map("hotel_services")
+  @@map("hotel_service")
 }
 model Price {
   id        Int       @default(autoincrement()) @id
@@ -68,8 +70,10 @@
   weight    Int?
   size      Size?
   price     Int?
   hotel     Hotel     @relation(fields: [hotelId], references: [id])
+
+  @@map("price")
 }
 model Photo {
   id        Int       @default(autoincrement()) @id
```


