## Common Services

<hr>

### Installation 

`yarn add https://github.com/2110521-2564-1-SW-ARCH/Groupo-shared-services.git`

### Services

- Authentication Service

```typescript
import {generateAccessToken, generateRefreshToken, verifyToken} from "groupo-shared-services/services/authentication";

// generate access token for user (normally token will expire after 1h)
generateAccessToken: (email: string) => string;

// generate refresh token for user (this token will not expired)
generateRefreshToken: (email: string) => string;

// check if token is valid
verifyToken: (token: string) => Token;
```

### Error Handling

for using error handling in express, we have to wrap `"async" handler function` with `catcher` to catch error

for `"sync" handler function`, it don't need this catcher

```typescript
import {catcher} from "groupo-shared-services/apiutils/errors";

router.post("/some-endpoint", catcher(someHandler));
```

after we catch all error, we have to handle it properly with error middleware

```typescript
import {handler} from "groupo-shared-services/apiutils/errors";

app.use(handler);
```

- Internal Server Error (500)

```typescript
import {InternalServerError} from "groupo-shared-services/apiutils/errors";

// throw internal server error
throw new InternalServerError();
// or
throw new InternalServerError("custom message");
```

- Unauthorized Error (401)

```typescript
import {UnauthorizedError} from "groupo-shared-services/apiutils/errors";

// throw internal server error
throw new UnauthorizedError();
// or
throw new UnauthorizedError("custom message");
```

- Not Found Error (404)

```typescript
import {NotFoundError} from "groupo-shared-services/apiutils/errors";

// throw internal server error
throw new NotFoundError();
// or
throw new NotFoundError("custom message");
```
