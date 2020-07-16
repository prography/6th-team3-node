# Migration `20200716154241-init`

This migration has been generated at 7/16/2020, 3:42:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX `pet.name` ON `petmily`.`pet`(`name`)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200630164446-init..20200716154241-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource mysql {
-  url      = "***"
+  url      = env("DATABASE_URL")
   provider = "mysql"
 }
 generator client {
@@ -112,9 +112,9 @@
   id           Int           @default(autoincrement()) @id
   userId       Int?          @map("user_id")
   createdAt    DateTime      @default(now()) @map("created_at")
   updatedAt    DateTime?     @map("updated_at") @updatedAt
-  name         String?
+  name         String?       @unique
   year         Int?
   weight       Int?
   registerNum  String?       @map("register_num")
   rfidCode     String?       @map("rfid_cd")
```


