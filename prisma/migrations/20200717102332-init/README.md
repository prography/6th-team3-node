# Migration `20200717102332-init`

This migration has been generated at 7/17/2020, 10:23:32 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX `pet.name` ON `petmily`.`pet`
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200716154241-init..20200717102332-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource mysql {
-  url = "***"
+  url      = env("DATABASE_URL")
   provider = "mysql"
 }
 generator client {
@@ -112,9 +112,9 @@
   id           Int           @default(autoincrement()) @id
   userId       Int?          @map("user_id")
   createdAt    DateTime      @default(now()) @map("created_at")
   updatedAt    DateTime?     @map("updated_at") @updatedAt
-  name         String?       @unique
+  name         String?
   year         Int?
   weight       Int?
   registerNum  String?       @map("register_num")
   rfidCode     String?       @map("rfid_cd")
```


