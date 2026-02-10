import React from 'react'

function Paginition({ current = 1, total = 1, onPageChange = () => { } }) {
  if (!total || total <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, current - 2);
      let end = Math.min(total - 1, current + 2);
      if (start > 2) pages.push('start-ellipsis');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total - 1) pages.push('end-ellipsis');
      pages.push(total);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center space-x-2 text-white bg-gray-900 p-2 rounded">
      <button
        className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50"
        onClick={() => onPageChange(Math.max(1, current - 1))}
        disabled={current <= 1}
      >
        Prev
      </button>

      {pages.map((p, idx) => {
        if (p === 'start-ellipsis' || p === 'end-ellipsis') {
          return (
            <span key={p + idx} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded ${p === current ? 'bg-indigo-600' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {p}
          </button>
        );
      })}

      <button
        className="px-3 py-1 bg-gray-800 rounded disabled:opacity-50"
        onClick={() => onPageChange(Math.min(total, current + 1))}
        disabled={current >= total}
      >
        Next
      </button>
    </div>
  );
}

export default Paginition
