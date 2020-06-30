# Migration `20200630164446-init`

This migration has been generated at 6/30/2020, 4:44:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `petmily`.`hotel` (
`address` varchar(191)   ,`address_detail` varchar(191)   ,`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`description` varchar(191)   ,`id` int NOT NULL  AUTO_INCREMENT,`is_neutered_only` boolean   ,`largs_criteria` int   ,`latitude` Decimal(65,30)   ,`longitude` Decimal(65,30)   ,`max_dog_size` int   ,`medium_criteria` int   ,`monitor_available` boolean   ,`name` varchar(191)   ,`page_link` varchar(191)   ,`phone_number` varchar(191)   ,`sat_close_time` varchar(191)   ,`sat_open_time` varchar(191)   ,`sun_close_time` varchar(191)   ,`sun_open_time` varchar(191)   ,`updated_at` datetime(3)   ,`week_close_time` varchar(191)   ,`week_open_time` varchar(191)   ,`zipcode` varchar(191)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`hotel_monitoring_type` (
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`hotel_id` int NOT NULL ,`id` int NOT NULL  AUTO_INCREMENT,`name` varchar(191)   ,`updated_at` datetime(3)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`hotel_service` (
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`hotel_id` int NOT NULL ,`id` int NOT NULL  AUTO_INCREMENT,`name` varchar(191)   ,`updated_at` datetime(3)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`price` (
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`day` varchar(191)   ,`hotel_id` int NOT NULL ,`id` int NOT NULL  AUTO_INCREMENT,`price` int   ,`size` ENUM('small', 'medium', 'large')   ,`updated_at` datetime(3)   ,`weight` int   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`photo` (
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`id` int NOT NULL  AUTO_INCREMENT,`target` ENUM('pet', 'user', 'hotel')   ,`target_id` int   ,`updated_at` datetime(3)   ,`url` varchar(191)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`user` (
`access_token` varchar(191)   ,`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`email` varchar(191) NOT NULL  ,`id` int NOT NULL  AUTO_INCREMENT,`name` varchar(191)   ,`password` varchar(191)   ,`phone_number` varchar(191)   ,`provider` ENUM('kakao', 'naver', 'google', 'facebook')   ,`refresh_token` varchar(191)   ,`updated_at` datetime(3)   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`pet` (
`breed` varchar(191)   ,`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`gender` ENUM('수컷', '암컷')   ,`id` int NOT NULL  AUTO_INCREMENT,`is_neutered` boolean   ,`name` varchar(191)   ,`register_num` varchar(191)   ,`rfid_cd` varchar(191)   ,`updated_at` datetime(3)   ,`user_id` int  ,`weight` int   ,`year` int   ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`reservation` (
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`end_date` datetime(3)   ,`hotel_id` int NOT NULL ,`id` int NOT NULL  AUTO_INCREMENT,`pet_id` int NOT NULL ,`pick_up_time` varchar(191)   ,`request` varchar(191)   ,`start_date` datetime(3)   ,`updated_at` datetime(3)   ,`user_id` int NOT NULL ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`review` (
`content` varchar(191)   ,`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`hotel_id` int NOT NULL ,`id` int NOT NULL  AUTO_INCREMENT,`rating` int   ,`updated_at` datetime(3)   ,`user_id` int NOT NULL ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `petmily`.`_HotelToUser` (
`A` int NOT NULL ,`B` int NOT NULL 
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `user.name` ON `petmily`.`user`(`name`)

CREATE UNIQUE INDEX `user.email` ON `petmily`.`user`(`email`)

CREATE UNIQUE INDEX `_HotelToUser_AB_unique` ON `petmily`.`_HotelToUser`(`A`,`B`)

CREATE  INDEX `_HotelToUser_B_index` ON `petmily`.`_HotelToUser`(`B`)

ALTER TABLE `petmily`.`hotel_monitoring_type` ADD FOREIGN KEY (`hotel_id`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`hotel_service` ADD FOREIGN KEY (`hotel_id`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`price` ADD FOREIGN KEY (`hotel_id`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`pet` ADD FOREIGN KEY (`user_id`) REFERENCES `petmily`.`user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `petmily`.`reservation` ADD FOREIGN KEY (`user_id`) REFERENCES `petmily`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`reservation` ADD FOREIGN KEY (`hotel_id`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`reservation` ADD FOREIGN KEY (`pet_id`) REFERENCES `petmily`.`pet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`review` ADD FOREIGN KEY (`user_id`) REFERENCES `petmily`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`review` ADD FOREIGN KEY (`hotel_id`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`_HotelToUser` ADD FOREIGN KEY (`A`) REFERENCES `petmily`.`hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `petmily`.`_HotelToUser` ADD FOREIGN KEY (`B`) REFERENCES `petmily`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200630164446-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,192 @@
+datasource mysql {
+  url      = env("DATABASE_URL")
+  provider = "mysql"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Hotel {
+  id               Int           @default(autoincrement()) @id
+  createdAt        DateTime      @default(now()) @map("created_at")
+  updatedAt        DateTime?     @map("updated_at") @updatedAt
+  name             String?
+  description      String?
+  address          String?
+  addressDetail    String?       @map("address_detail")
+  zipcode          String?
+  latitude         Float?
+  longitude        Float?
+  weekOpenTime     String?       @map("week_open_time")
+  weekCloseTime    String?       @map("week_close_time")
+  satOpenTime      String?       @map("sat_open_time")
+  satCloseTime     String?       @map("sat_close_time")
+  sunOpenTime      String?       @map("sun_open_time")
+  sunCloseTime     String?       @map("sun_close_time")
+  phoneNumber      String?       @map("phone_number")
+  monitorAvailable Boolean?      @map("monitor_available")
+  isNeuteredOnly   Boolean?      @map("is_neutered_only")
+  maxDogSize       Int?          @map("max_dog_size")
+  pageLink         String?       @map("page_link")
+  mediumCriteria   Int?          @map("medium_criteria") //소형견과 중형견을 나누는 기준
+  largeCriteria    Int?          @map("largs_criteria") //중형견과 대형견을 나누는 기준
+  monitorings      Monitoring[]
+  services         Service[]
+  prices           Price[]
+  reservations     Reservation[]
+  customers        User[]        @relation(references: [id])
+
+  @@map("hotel")
+  Review Review[]
+}
+
+model Monitoring {
+  id        Int       @default(autoincrement()) @id
+  hotelId   Int       @map("hotel_id")
+  createdAt DateTime  @default(now()) @map("created_at")
+  updatedAt DateTime? @map("updated_at") @updatedAt
+  name      String?
+  hotel     Hotel     @relation(fields: [hotelId], references: [id])
+
+  @@map("hotel_monitoring_type")
+}
+
+model Service {
+  id        Int       @default(autoincrement()) @id
+  hotelId   Int       @map("hotel_id")
+  createdAt DateTime  @default(now()) @map("created_at")
+  updatedAt DateTime? @map("updated_at") @updatedAt
+  name      String?
+  hotel     Hotel     @relation(fields: [hotelId], references: [id])
+
+  @@map("hotel_service")
+}
+
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
+
+  @@map("price")
+}
+
+model Photo {
+  id        Int       @default(autoincrement()) @id
+  createdAt DateTime  @default(now()) @map("created_at")
+  updatedAt DateTime? @map("updated_at") @updatedAt
+  url       String?
+  target    Target?
+  targetId  Int?      @map("target_id")
+
+  @@map("photo")
+}
+
+model User {
+  id             Int           @default(autoincrement()) @id
+  createdAt      DateTime      @default(now()) @map("created_at")
+  updatedAt      DateTime?     @map("updated_at") @updatedAt
+  name           String?       @unique
+  email          String        @unique
+  password       String?
+  provider       Provider?
+  accessToken    String?       @map("access_token")
+  refreshToken   String?       @map("refresh_token")
+  phoneNumber    String?       @map("phone_number")
+  pets           Pet[]
+  favoriteHotels Hotel[]       @relation(references: [id])
+  Reservation    Reservation[]
+
+  @@map("user")
+
+  Review Review[]
+}
+
+model Pet {
+  id           Int           @default(autoincrement()) @id
+  userId       Int?          @map("user_id")
+  createdAt    DateTime      @default(now()) @map("created_at")
+  updatedAt    DateTime?     @map("updated_at") @updatedAt
+  name         String?
+  year         Int?
+  weight       Int?
+  registerNum  String?       @map("register_num")
+  rfidCode     String?       @map("rfid_cd")
+  breed        String?
+  isNeutered   Boolean?      @map("is_neutered")
+  gender       Gender?
+  owner        User?         @relation(fields: [userId], references: [id])
+  reservations Reservation[]
+
+  @@map("pet")
+}
+
+model Reservation {
+  id         Int       @default(autoincrement()) @id
+  userId     Int       @map("user_id")
+  hotelId    Int       @map("hotel_id")
+  petId      Int       @map("pet_id")
+  createdAt  DateTime  @default(now()) @map("created_at")
+  updatedAt  DateTime? @map("updated_at") @updatedAt
+  startDate  DateTime? @map("start_date")
+  endDate    DateTime? @map("end_date")
+  pickupTime String?   @map("pick_up_time")
+  request    String?
+  user       User      @relation(fields: [userId], references: [id])
+  hotel      Hotel     @relation(fields: [hotelId], references: [id])
+  pet        Pet       @relation(fields: [petId], references: [id])
+
+  @@map("reservation")
+}
+
+model Review {
+  id        Int       @default(autoincrement()) @id
+  rating    Int?
+  createdAt DateTime  @default(now()) @map("created_at")
+  updatedAt DateTime? @map("updated_at") @updatedAt
+  content   String?
+  userId    Int       @map("user_id")
+  hotelId   Int       @map("hotel_id")
+  user      User      @relation(fields: [userId], references: [id])
+  hotel     Hotel     @relation(fields: [hotelId], references: [id])
+
+  @@map("review")
+}
+
+enum Gender {
+  MALE    @map("수컷")
+  FEMAIL  @map("암컷")
+
+  @@map("gender")
+}
+
+enum Target {
+  PET    @map("pet")
+  USER   @map("user")
+  HOTEL  @map("hotel")
+
+  @@map("target")
+}
+
+enum Size {
+  SMALL   @map("small")
+  MEDIUM  @map("medium")
+  LARGE   @map("large")
+
+  @@map("size")
+}
+
+enum Provider {
+  KAKAO     @map("kakao")
+  NAVER     @map("naver")
+  GOOGLE    @map("google")
+  FACEBOOK  @map("facebook")
+
+  @@map("provider")
+}
```


