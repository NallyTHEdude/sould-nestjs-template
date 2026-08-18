# This project uses:

1. prisma + postgres (configurable in src/database/database.service.ts)
2. husky and lint staged (for formatting and linting the code before any commit)
3. uses the folder structure of:
   - src/_modules: modules created by nestjs are stored here
   - src/config: zod validated env config lies here
   - src/database: has database service and module, modify the service to use other types of database (uses only prisma supported languages)

---
