# UI Components

This package contains shared UI components that can be used across different applications in the monorepo.

## Usage

Import components directly from the package:

```tsx
import { Button } from "@repo/ui/button";
import { Card, CardHeader, CardContent } from "@repo/ui/card";
import { cn } from "@repo/ui/utils";
```

## Available Components

- Button
- Card (with CardHeader, CardTitle, CardDescription, CardContent, CardFooter)

## Adding New Components

When adding new components:

1. Create a new file in the `src` directory
2. Export the component
3. Add the export path to `package.json`
