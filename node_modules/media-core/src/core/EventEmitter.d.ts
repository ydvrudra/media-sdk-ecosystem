type EventMap = {
    view: {
        itemId: number;
        type: 'photo' | 'video';
    };
    download: {
        itemId: number;
        type: 'photo' | 'video';
    };
    error: {
        message: string;
    };
};
type EventListener<T extends keyof EventMap> = (data: EventMap[T]) => void;
export declare class EventEmitter {
    private listeners;
    on<T extends keyof EventMap>(event: T, listener: EventListener<T>): () => void;
    off<T extends keyof EventMap>(event: T, listener: EventListener<T>): void;
    emit<T extends keyof EventMap>(event: T, data: EventMap[T]): void;
    enableDefaultLogger(): () => void;
    clear(): void;
}
export {};
//# sourceMappingURL=EventEmitter.d.ts.map