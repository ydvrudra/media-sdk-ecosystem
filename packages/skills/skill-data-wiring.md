# Skill: Wiring Data with Media-React

## Overview
This skill teaches how to use `media-react` to fetch data from Pexels API in a React application.

## Provider Setup
Wrap your app with `MediaProvider` and pass the API key:

```tsx
import { MediaProvider } from 'media-react';

function App() {
  return (
    <MediaProvider config={{ apiKey: 'TkQBPrnSHWLarAQ5tXOIY5eFtVur1novNBKt96zTluH1LvT1jAmOeVv1' }}>
      <YourComponent />
    </MediaProvider>
  );
}