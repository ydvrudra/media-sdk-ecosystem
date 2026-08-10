import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Grid({ items, renderItem, onLoadMore, hasMore, loading, getGridProps = () => ({}), getItemProps = () => ({}), }) {
    const gridProps = getGridProps();
    return (_jsxs("div", { ...gridProps, children: [items.map((item, index) => (_jsx("div", { ...getItemProps(item, index), children: renderItem(item, index) }, index))), hasMore && onLoadMore && (_jsx("div", { children: _jsx("button", { onClick: onLoadMore, disabled: loading, children: loading ? 'Loading...' : 'Load More' }) }))] }));
}
