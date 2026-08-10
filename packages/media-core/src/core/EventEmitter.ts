type EventMap = {
    view: { itemId: number; type: 'photo' | 'video' };
    download: { itemId: number; type: 'photo' | 'video' };
    error: { message: string };
  };
  
  type EventListener<T extends keyof EventMap> = (data: EventMap[T]) => void;
  
  export class EventEmitter {
    private listeners: Map<keyof EventMap, Set<EventListener<keyof EventMap>>> = new Map();
  
    on<T extends keyof EventMap>(event: T, listener: EventListener<T>): () => void {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, new Set());
      }
      this.listeners.get(event)!.add(listener as EventListener<keyof EventMap>);
  
      // Return unsubscribe function
      return () => {
        this.off(event, listener);
      };
    }
  
    off<T extends keyof EventMap>(event: T, listener: EventListener<T>): void {
      const listeners = this.listeners.get(event);
      if (listeners) {
        listeners.delete(listener as EventListener<keyof EventMap>);
      }
    }
  
    emit<T extends keyof EventMap>(event: T, data: EventMap[T]): void {
      const listeners = this.listeners.get(event);
      if (listeners) {
        listeners.forEach((listener) => {
          try {
            listener(data);
          } catch (error) {
            console.error(`Error in event listener for ${event}:`, error);
          }
        });
      }
    }
  
    // Default logger listener
    enableDefaultLogger(): () => void {
      const unsubscribeView = this.on('view', (data) => {
        console.log(`[SDK] View: Item ${data.itemId} (${data.type})`);
      });
  
      const unsubscribeDownload = this.on('download', (data) => {
        console.log(`[SDK] Download: Item ${data.itemId} (${data.type})`);
      });
  
      const unsubscribeError = this.on('error', (data) => {
        console.error(`[SDK] Error: ${data.message}`);
      });
  
      return () => {
        unsubscribeView();
        unsubscribeDownload();
        unsubscribeError();
      };
    }
  
    // Clear all listeners
    clear(): void {
      this.listeners.clear();
    }
  }