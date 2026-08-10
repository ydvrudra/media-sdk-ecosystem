import React from 'react';
export interface GridProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    onLoadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
    getGridProps?: () => React.HTMLAttributes<HTMLDivElement>;
    getItemProps?: (item: T, index: number) => React.HTMLAttributes<HTMLDivElement>;
}
export declare function Grid<T>({ items, renderItem, onLoadMore, hasMore, loading, getGridProps, getItemProps, }: GridProps<T>): React.JSX.Element;
//# sourceMappingURL=Grid.d.ts.map