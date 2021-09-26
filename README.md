## Common Services

<hr>

### Installation 

`yarn add https://github.com/2110521-2564-1-SW-ARCH/Groupo-shared-services.git`

### Logging (backend)

logger can log with 4 levels (info, debug, warn, error)

```typescript
import {ApplicationLogger} from "groupo-shared-services/logging/logger";

const logger = new ApplicationLogger();

// log with info level
logger.info("message");

// log with debug level
logger.debug("message");

// log with warn level
logger.warn("message");

// log with error level
logger.error("message");
```

use custom fields for logger
```typescript
// this will display `message   key=value` on the console
logger.field("key", "value").info("message")

// this will display `message   key1=value1   key2=value2 on the console
logger.field("key1", "value1").field("key2", "value2").info("message")
```

### Services (backend)

- Authentication Service

```typescript
import {generateAccessToken, generateRefreshToken, verifyToken} from "groupo-shared-services/services/authentication";

// only user service will use this function
// generate access token with specific email (normally token will expire after 1h)
const accessToken = generateAccessToken("me@wongtawan.dev");

// only user service will use this function
// generate refresh token with specific email (this token will not expired)
const refreshToken = generateRefreshToken("me@wongtawan.dev");

// this function will throw UnauthorizedError if it's not valid
verifyToken: (token: string) => Token;
```

### Error Handling (backend)

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

#### These errors are available to throw

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

### Response Messages (frontend, backend)

backend "must" return `APIResponse` as a response to frontend. so frontend can use these to parse the response (or not).

```typescript
export interface APIResponse<T> {
    status: number;
    body: T;
}

// to import, use this line
import {APIResponse, json} from "groupo-shared-services/apiutils/messages";

// to send message to frontend use `json` function (for convenient)
// this function will automatically set `res.status` from `response.status`
json(res: express.Response, response: APIResponse)
```

we can replace generic `T` with these type of message

- LoginResponse

    ```typescript
    export interface LoginResponse {
        accessToken: string;
        refreshToken: string;
    }
  
    // to import, use this line
    import {LoginRequest} from "groupo-shared-services/apiutils/messages";
    ```
  
    used by `/user/login`, `/user/refresh`
  
### Request Messages (frontend, backend)

frontend should use this message (or not) to send as a request body, (backend will parse the request body to these message format)

- `GET /user/login`

    ```typescript
    export interface LoginRequest {
        email: string;
        password: string;
    }

    // to import, use this line
    import {LoginRequest} from "groupo-shared-services/apiutils/messages";
    ```

- `GET /user/register`

    ```typescript
    export interface RegisterRequest {
        displayName: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }

    // to import, use this line
    import {RegisterRequest} from "groupo-shared-services/apiutils/messages";
    ```