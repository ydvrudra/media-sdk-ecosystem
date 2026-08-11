
---

## 📁 **File 2: `media-sdk-ecosystem/skills/skill-ui-components.md`**

**Create new file** — Copy paste:

```markdown
# Skill: Using Media-UI-React Components

## Grid
```tsx
import { Grid } from 'media-ui-react';

<Grid
  items={photos}
  renderItem={(item) => <img src={item.src.medium} />}
  onLoadMore={loadMore}
  getGridProps={() => ({ className: 'my-grid' })}
/>