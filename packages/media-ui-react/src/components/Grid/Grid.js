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

export function Grid<T>({
  items,
  renderItem,
  onLoadMore,
  hasMore,
  loading,
  getGridProps = () => ({}),
  getItemProps = () => ({}),
}: GridProps<T>) {
  const gridProps = getGridProps();

  return (
    <div {...gridProps}>
      {items.map((item, index) => (
        <div key={index} {...getItemProps(item, index)}>
          {renderItem(item, index)}
        </div>
      ))}
      {hasMore && onLoadMore && (
        <div>
          <button onClick={onLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}