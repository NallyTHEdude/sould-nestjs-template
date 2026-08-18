# This project uses:

1. **Prisma + PostgreSQL**
   - Database configuration is located in `src/database/database.service.ts`.
   - The database service can be modified to use other database types supported by Prisma.

2. **Husky + lint-staged**
   - Husky and lint-staged are used to automatically format and lint the code before every commit.

3. **Project Structure**
   - `src/_modules/` — NestJS modules created by NestJS.
   - `src/config/` — Zod-validated environment configuration.
   - `src/database/` — Prisma database service and database module.

---

## DTO Conventions

DTOs should maintain compile-time consistency with their corresponding application types.

### Create DTO

Use `Pick` to include only the fields required when creating a resource.

    Create<Module>Dto → Pick<Module, <required fields>>

Example:

    export class CreateUserDto implements Pick<User, 'email' | 'name'> {
      // validation decorators and properties
    }

### Update DTO

Use `Partial<Pick<...>>` so that the selected fields become optional.

    Update<Module>Dto → Partial<Pick<Module, <updatable fields>>>

Example:

    export class UpdateUserDto
      implements Partial<Pick<User, 'email' | 'name'>> {
      // validation decorators and optional properties
    }

This keeps DTOs consistent with the underlying application types while ensuring that create and update operations expose only the fields appropriate for that operation.
