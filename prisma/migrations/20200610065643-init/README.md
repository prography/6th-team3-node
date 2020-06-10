# Migration `20200610065643-init`

This migration has been generated at 6/10/2020, 6:56:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `petmily`.`Price` (
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`day` varchar(191)   ,`hotel_id` int NOT NULL ,`id` int NOT NULL  AUTO_INCREMENT,`price` int   ,`size` ENUM('small', 'medium', 'large')   ,`updated_at` datetime(3)   ,`weight` int   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `petmily`.`hotel` DROP COLUMN `sat_price`,
DROP COLUMN `sun_price`,
DROP COLUMN `week_price`,
DROP COLUMN `week_close_time`,
ADD COLUMN `week_close_time` varchar(191)   ,
DROP COLUMN `week_open_time`,
ADD COLUMN `week_open_time` varchar(191)   ;

ALTER TABLE `petmily`.`pet` ADD COLUMN `weight` int   ;

ALTER TABLE `petmily`.`Price` ADD FOREIGN KEY (`hotel_id`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200604163129-init..20200610065643-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,14 +1,13 @@
 datasource mysql {
-  url = "***"
+  url      = env("DATABASE_URL")
   provider = "mysql"
 }
 generator client {
   provider = "prisma-client-js"
 }
-// TODO: Review, Reservation,
 model Hotel {
   id               Int          @default(autoincrement()) @id
   createdAt        DateTime     @default(now()) @map("created_at")
   updatedAt        DateTime?    @map("updated_at") @updatedAt
@@ -18,24 +17,22 @@
   addressDetail    String?      @map("address_detail")
   zipcode          String?
   latitude         Float?
   longitude        Float?
-  weekOpenTime     String       @map("week_open_time")
-  weekCloseTime    String       @map("week_close_time")
+  weekOpenTime     String?      @map("week_open_time")
+  weekCloseTime    String?      @map("week_close_time")
   satOpenTime      String?      @map("sat_open_time")
   satCloseTime     String?      @map("sat_close_time")
   sunOpenTime      String?      @map("sun_open_time")
   sunCloseTime     String?      @map("sun_close_time")
-  weekPrice        Int          @map("week_price")
-  satPrice         Int?         @map("sat_price")
-  sunPrice         Int?         @map("sun_price")
   phoneNumber      String?      @map("phone_number")
   monitorAvailable Boolean?     @map("monitor_available")
   isNeuteredOnly   Boolean?     @map("is_neutered_only")
   maxDogSize       Int?         @map("max_dog_size")
   pageLink         String?      @map("page_link")
   monitorings      Monitoring[]
   services         Service[]
+  prices           Price[]
   customers        User[]       @relation(references: [id])
   @@map("hotel")
 }
@@ -61,8 +58,20 @@
   @@map("hotel_services")
 }
+model Price {
+  id        Int       @default(autoincrement()) @id
+  hotelId   Int       @map("hotel_id")
+  createdAt DateTime  @default(now()) @map("created_at")
+  updatedAt DateTime? @map("updated_at") @updatedAt
+  day       String?
+  weight    Int?
+  size      Size?
+  price     Int?
+  hotel     Hotel     @relation(fields: [hotelId], references: [id])
+}
+
 model Photo {
   id        Int       @default(autoincrement()) @id
   createdAt DateTime  @default(now()) @map("created_at")
   updatedAt DateTime? @map("updated_at") @updatedAt
@@ -96,8 +105,9 @@
   createdAt   DateTime  @default(now()) @map("created_at")
   updatedAt   DateTime? @map("updated_at") @updatedAt
   name        String?
   year        Int?
+  weight      Int?
   registerNum String?   @map("register_num")
   rfidCode    String?   @map("rfid_cd")
   breed       String?
   isNeutered  Boolean?  @map("is_neutered")
@@ -121,8 +131,16 @@
   @@map("target")
 }
+enum Size {
+  SMALL   @map("small")
+  MEDIUM  @map("medium")
+  LARGE   @map("large")
+
+  @@map("size")
+}
+
 enum Provider {
   KAKAO     @map("kakao")
   NAVER     @map("naver")
   GOOGLE    @map("google")
```


