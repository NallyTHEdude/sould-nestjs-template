# _Creating the project_.

1. Install the nestjs cli globally using: `npm i -g @nestjs/cli`.
2. Create a NestJs app using `nest new {app_name}`.
3. Run the project using scripts from `package.json`.

---

# _Understanding nest folder structure_.

1. NestJs works on modules.
2. Every NestJs module has:
   - `{module_name}.controller.ts` : handles requests and is generated using : `nest g controller {module_name}`
   - `{module_name}.service.ts` : handles business logic is generated using : `nest g service {module_name}`.
   - `{module_name}.module.ts` : wires controller and service together and is generated using : `nest g module {module_name}`.

---

# _General Request Flow_

`req -> middleware -> guard -> interceptor(beofre) -> pipes ->  -> controller/route handler -> service -> interceptor(after) -> exception filters -> response`

---

# _Controllers_

1. Decorators are `@Get()`, `@Post()`, `@Put()`, `@Delete()`. Each perform their named http requests
2. Can add dynamic routes by using `:{variable}` eg: `@Get(':id')`, this works for all decorators
3. Static routes **should** come before all dynamic routes

## _Parameter Decorators_

1. `@Query("{value}" {value}: {typescript_type})`: can access value from url queries ('?')
2. `@Param("{value}" {value}: {typescript_type})`: can access value from url parameters (':{value}')
3. `@Body("{value}" {value}: {prefdefined_DTO})`: can access value from url body, and can only be used in post or put requests.

### _Data Transfer Objects (DTO)_:

- Typescript interfaces are erased at compiletime, classes are not
- This is the reason NestJS uses classes to define object types instead of interfaces

---

# _Dependency Injection_

1. Can be achieved using the `@Injectable()` annotaion before declaring classes
2. The `@Injectable` class can be used by sending it as a `private readonly {@Injectable_class name}` in the parameter of the calling class's constructor and use its methods in the class.

---

# _Exception Handling_

1. NestJS provides http exception handling by default, we can simply do `throw new {Exception_name_from_nestjs_docs}`
2. Read more about http exceptions and its types here: [Exceptions](https://docs.nestjs.com/exception-filters)
3. These are used to handle error responses.

---

# _Interceptors_

1. Interceptors run before and after entering controllers, they shape how the response should be depending on the application
   2.Interceptors are used for success responses.
2. Install interceptors using: `nest g utils/{interceptor_work}/{interceptor_name} --flat`
3. Add the interceptor in `src/main.ts` via importing it and then `app.useGlobalInterceptors(new TransformInterceptor());`

---

# _Pipes_

1. Pipes run before the controller, and are used to transform / validate the request before reaching the controller.
2. install class-validator and class-transformer via: `npm i class-validator class-transformer`

---

# _Middlewares_

1. Middlewares run before request reaches route handler.
2. Useful for logging and global processing
3. Create a middleware using `nest g middleware middleware/{middleware_name} --flat`
4. Set the middleware in the `app.module.ts` by:

```
  export class AppModule implements NestModule {
     configure(consumer: MiddlewareConsumer){
        consumer.apply(<middleware_name>).forRoutes(<controller_of_this_middleware>)
     }
  }
```

---

# _Guards_

1. Guards run after middleware and before route handler
2. Create guards using `nest g guard guards/{guard_name} --flat`
3. Guards are used to determine if the request should go to controller or throw an error (return boolean value)
4. Can guards globally using `app.useGlobalGuards(<guard_name>)` in app.module.ts
5. Can also use guards for specific routes by adding `@UseGuards(<guard_name>)` just before the route in controller.
6. Can also use guards on the entire controller by adding `@UseGuards(<guard_name>)` on the top before any routes in the controller class.
