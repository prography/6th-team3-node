# Migration `20200526193953-init`

This migration has been generated at 5/26/2020, 7:39:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `petmily`.`user` CHANGE provider provider ENUM('kakao', 'naver', 'google', 'facebook')
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200526193953-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,132 @@
+datasource mysql {
+  url      = env("DATABASE_URL")
+  provider = "mysql"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+// TODO: Review, Reservation,
+model Hotel {
+  id               Int          @default(autoincrement()) @id
+  createdAt        DateTime     @default(now()) @map("created_at")
+  updatedAt        DateTime?    @map("updated_at") @updatedAt
+  name             String?      @unique
+  description      String?
+  address          String?
+  addressDetail    String?      @map("address_detail")
+  zipcode          String?
+  latitude         Float?
+  longitude        Float?
+  weekOpenTime     DateTime?    @map("week_open_time")
+  weekCloseTime    DateTime?    @map("week_close_time")
+  satOpenTime      DateTime?    @map("sat_open_time")
+  satCloseTime     DateTime?    @map("sat_close_time")
+  sunOpenTime      DateTime?    @map("sun_open_time")
+  sunCloseTime     DateTime?    @map("sun_close_time")
+  weekPrice        Int?         @map("week_price")
+  satPrice         Int?         @map("sat_price")
+  sunPrice         Int?         @map("sun_price")
+  phoneNumber      String?      @map("phone_number")
+  monitorAvailable Boolean?     @map("monitor_available")
+  isNeuteredOnly   Boolean?     @map("is_neutered_only")
+  maxDogSize       Int?         @map("max_dog_size")
+  pageLink         String?      @map("page_link")
+  monitorings      Monitoring[]
+  services         Service[]
+  customers        User[]       @relation(references: [id])
+
+  @@map("hotel")
+}
+
+model Monitoring {
+  id        Int       @default(autoincrement()) @id
+  hotelId   Int?      @map("hotel_id")
+  createdAt DateTime  @default(now()) @map("created_at")
+  updatedAt DateTime? @map("updated_at") @updatedAt
+  name      String?
+  hotel     Hotel?    @relation(fields: [hotelId], references: [id])
+
+  @@map("hotel_monitoring_type")
+}
+
+model Service {
+  id        Int       @default(autoincrement()) @id
+  hotelId   Int?      @map("hotel_id")
+  createdAt DateTime  @default(now()) @map("created_at")
+  updatedAt DateTime? @map("updated_at") @updatedAt
+  name      String?   @unique
+  hotel     Hotel?    @relation(fields: [hotelId], references: [id])
+
+  @@map("hotel_services")
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
+  id             Int       @default(autoincrement()) @id
+  createdAt      DateTime  @default(now()) @map("created_at")
+  updatedAt      DateTime? @map("updated_at") @updatedAt
+  name           String?   @unique
+  email          String?   @unique
+  password       String?
+  provider       Provider?
+  accessToken    String?   @map("access_token")
+  refreshToken   String?   @map("refresh_token")
+  phoneNumber    String?   @map("phone_number")
+  pets           Pet[]
+  favoriteHotels Hotel[]   @relation(references: [id])
+
+  @@map("user")
+}
+
+model Pet {
+  id          Int       @default(autoincrement()) @id
+  userId      Int?      @map("user_id")
+  createdAt   DateTime  @default(now()) @map("created_at")
+  updatedAt   DateTime? @map("updated_at") @updatedAt
+  name        String?
+  year        Int?
+  registerNum String?   @map("register_num")
+  rfidCd      String?   @map("rfid_cd")
+  breed       String?
+  isNeutered  Boolean?  @map("is_neutered")
+  gender      Gender?
+  owner       User?     @relation(fields: [userId], references: [id])
+
+  @@map("pet")
+}
+
+enum Gender {
+  MALE @map("수컷")
+  FEMAIL @map("암컷")
+
+   @@map("gender")
+}
+
+enum Target {
+  PET @map("pet")
+  USER @map("user")
+  HOTEL @map("hotel")
+
+   @@map("target")
+}
+
+enum Provider {
+  KAKAO @map("kakao")
+  NAVER @map("naver")
+  GOOGLE @map("google")
+  FACEBOOK @map("facebook")
+
+   @@map("provider")
+}
```


