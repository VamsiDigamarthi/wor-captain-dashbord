const TableItem = ({ columns, row }) => {
  return (
    <div className="text-base flex items-center px-3 gap-2 border-b border-b-gray-200 cursor-pointer relative py-2">
      {columns.map((column, index) => (
        <div key={index} style={{ width: column.width }}>
          {column.render ? column.render(row, index) : null}
        </div>
      ))}
    </div>
  );
};

export default TableItem;
