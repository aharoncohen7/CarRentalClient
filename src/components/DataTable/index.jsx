import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css';
import Pagination from '../Pagination';
import { useParams } from 'react-router-dom';

const DataTable = ({ }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  // const [isActive, setIsActive] = useState('all');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const [filters, setFilters] = useState({});
  const itemsPerPage = 10;
  const dir = sortOrder === 'asc' ? "🔽" : "🔼";
  const url = 'http://localhost:3355/api/';
  const totalPages = Math.ceil(totalLength / itemsPerPage);
  const {categoryName} = useParams()
  console.log("🚀 ~ DataTable ~ categoryName:", categoryName)

  // קבלת תבנית טבלה ריקה
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get(url + "tables/" + categoryName);
        if (response.status == 200) {
          console.log(response.data.columns);
          setColumns(response.data.columns);
          setTotalLength(0)
          setData([]);
        }
      } catch (err) {
        console.log("Error in fetching data");
        setColumns([])
        setData([]);
        setTotalLength(0)
        console.error(err);
      }
    }
    fetchColumns()
  }, []);

  // קבלת תוכן טבלה
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.post(url + categoryName, { search, sortKey, sortOrder, filters, currentPage });
        if (response.status == 200) {
          console.log(response.data.items);
          setData(response.data.items);
          setTotalLength(response.data.count)
        }

      } catch (err) {
        console.log("Error in fetching data");
        setData([]);
        setTotalLength(0)
        console.error(err);
      }
    };

    fetchTableData()
  }, [search, sortKey, sortOrder, currentPage, filters]);


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    setTotalLength(0);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
    setTotalLength(0);
  };

  const handleSortChange = (key) => {
    const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);
  };



  return (
   

    <>
      <div className={styles.main}>
        <div className={`${styles.flex} ${styles.mb_4}`}>
          <input
            type="text"
            className={`${styles.border} ${styles.input}`}
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
    
          {columns && columns.map((col) => {
            if (col.type === "boolean") {
              return (
                <select
                  key={col.key}
                  className={`${styles.border} ${styles.select}`}
                  value={filters[col.key] || 'all'}
                  onChange={(e) =>
                    handleFilterChange(col.key, e.target.value)
                  }
                >
                  <option value="all">All</option>
                  <option value="true">{col.key.slice(2, col.key.length)}</option>
                  <option value="false">Not {col.key.slice(2, col.key.length).toLowerCase()}</option>
                </select>
              );
            }
            return null;
          })}
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns && columns.map((col) => (
                <>
                  <th
                    key={col.key}
                    className={styles.th}
                    onClick={() => col.sortable && handleSortChange(col.key)}
                  >
                    {col.label}{sortKey === col.key ? <span>{dir}</span> : <span className={styles.sortSpan}>{`---`}</span>}
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length ? data.map((row) => (
              <tr key={row.id} className={styles.td}>
                {row && Object.entries(row).map(([key, value]) => (
                  <>
                    {key !== "__v" && <td
                      key={key}
                      className={`${styles.td} ${(value === true || value === false) ? (value ? styles.textGreen : styles.textRed) : ""}`}
                    >
                      {value !== true && value !== false ? value : (value ? 'Yes' : 'No')}
                    </td>}
                  </>
                ))}
              </tr>
            )) : null}
          </tbody>
        </table>
    
        {!data.length && <div className={styles.noDataContainer}>
          <h1 className={styles.noDataHeading}>No data found</h1>
          <button className={styles.refreshButton} onClick={() => handleSearchChange('')}>Refresh</button>
        </div>}
        <Pagination currentPage={currentPage} totalPages={totalPages} totalLength={totalLength} itemsPerPage={data.length} setCurrentPage={setCurrentPage} />
      </div>
    </>
    
  );
};

export default DataTable;
