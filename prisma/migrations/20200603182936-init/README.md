# Migration `20200603182936-init`

This migration has been generated at 6/3/2020, 6:29:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200530112216-init..20200603182936-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource mysql {
-  url = "***"
+  url      = env("DATABASE_URL")
   provider = "mysql"
 }
 generator client {
@@ -97,9 +97,9 @@
   updatedAt   DateTime? @map("updated_at") @updatedAt
   name        String?
   year        Int?
   registerNum String?   @map("register_num")
-  rfidCd      String?   @map("rfid_cd")
+  rfidCode    String?   @map("rfid_cd")
   breed       String?
   isNeutered  Boolean?  @map("is_neutered")
   gender      Gender?
   owner       User?     @relation(fields: [userId], references: [id])
@@ -107,26 +107,26 @@
   @@map("pet")
 }
 enum Gender {
-  MALE @map("수컷")
-  FEMAIL @map("암컷")
+  MALE    @map("수컷")
+  FEMAIL  @map("암컷")
-   @@map("gender")
+  @@map("gender")
 }
 enum Target {
-  PET @map("pet")
-  USER @map("user")
-  HOTEL @map("hotel")
+  PET    @map("pet")
+  USER   @map("user")
+  HOTEL  @map("hotel")
-   @@map("target")
+  @@map("target")
 }
 enum Provider {
-  KAKAO @map("kakao")
-  NAVER @map("naver")
-  GOOGLE @map("google")
-  FACEBOOK @map("facebook")
+  KAKAO     @map("kakao")
+  NAVER     @map("naver")
+  GOOGLE    @map("google")
+  FACEBOOK  @map("facebook")
-   @@map("provider")
-}
+  @@map("provider")
+}
```


