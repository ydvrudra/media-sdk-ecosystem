// Client
export { PexelsClient } from './client/PexelsClient';
export type { PexelsClientConfig } from './client/PexelsClient';

// Types
export * from './client/types';

// Core
export { EventEmitter } from './core/EventEmitter';
export { Cache } from './core/Cache';

// Default export for convenience
import { PexelsClient } from './client/PexelsClient';
export default PexelsClient;