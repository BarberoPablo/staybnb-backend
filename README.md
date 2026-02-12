# CurrentUser Decorator Lifecycle and Request Flow

## Overview

The `@CurrentUser()` decorator does **not** perform authentication and does **not** parse or validate tokens.  
Its only responsibility is to **expose the already-resolved user context** from the HTTP request to controller methods.

This decorator works exclusively because authentication is handled **before** controllers run.

---

## Request Lifecycle

### 1. Incoming Request

Every HTTP request enters the application and is intercepted by the global `AuthGuard` before any controller logic executes.

---

### 2. Identity Resolution (AuthGuard)

The `AuthGuard` is responsible for resolving the user identity:

- Reads the `Authorization` header
- Validates the JWT
- Extracts the `supabaseId`
- Loads the associated profile from the database
- Attaches a normalized user object to the request

Example:

```
request.user = {
  id,
  supabaseId,
  role,
};
```

At this point, authentication and authorization context are fully resolved.

---

### 3. Controller Execution

Only after the `AuthGuard` succeeds does Nest invoke the controller method.

Controllers **must assume** that identity resolution has already occurred.

---

### 4. `@CurrentUser()` Execution

When a controller parameter is decorated with `@CurrentUser()`:

- The decorator receives the same `ExecutionContext`
- Accesses the underlying HTTP request
- Returns `request.user`

The decorator:

- does **not** read headers
- does **not** parse tokens
- does **not** perform validation

---

### 5. User Context Injection

The resolved user is injected directly into the controller method:

```
@Get('me')
getMe(@CurrentUser() user) {}
```

The controller receives a trusted, pre-validated user context.

---

## Responsibility Boundaries

- **AuthGuard**
  - Resolves identity
  - Validates tokens
  - Loads profile data
  - Populates `request.user`

- **@CurrentUser()**
  - Reads `request.user`
  - Exposes identity to controllers

- **Controllers**
  - Consume user context
  - Never read headers
  - Never parse or validate tokens

---

## Architectural Guarantees

- Authentication logic is centralized
- Controllers remain transport-agnostic
- Identity is resolved once per request
- Security rules are consistent and enforceable

If `AuthGuard` is removed or bypassed, `@CurrentUser()` becomes meaningless.

---

## Key Principle

> The `AuthGuard` creates the user context once, `@CurrentUser()` simply reads it, and controllers must never do more than that.
