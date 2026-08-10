"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(listener);
        // Return unsubscribe function
        return () => {
            this.off(event, listener);
        };
    }
    off(event, listener) {
        const listeners = this.listeners.get(event);
        if (listeners) {
            listeners.delete(listener);
        }
    }
    emit(event, data) {
        const listeners = this.listeners.get(event);
        if (listeners) {
            listeners.forEach((listener) => {
                try {
                    listener(data);
                }
                catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
    // Default logger listener
    enableDefaultLogger() {
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
    clear() {
        this.listeners.clear();
    }
}
exports.EventEmitter = EventEmitter;
