import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { PlusCircle, Eye, ExternalLink, Copy, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { axiosInstance, GET_API } from '../../apis/api';
import { useSelector } from 'react-redux';
import { base64toUrl, formatBalance } from '../../utils';

const CoinsHeldTab = () => {
  const [data, setData] = useState([]);
  const userAddress = useSelector((state: any) => state.user.address);
  const [isLoading, setIsLoading] = useState(false);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Coin',
        accessor: 'name',
        Cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <div className="flex items-center gap-2">
                <img src={base64toUrl((row.original.image as any).buffer)}
                  alt={row.original.symbol} className="w-8 h-8 rounded-full overflow-hidden" />
              </div>
            </div>
            <div>
              <p className="text-white font-medium">{row.original.name}</p>
              <p className="text-gray-500 text-sm text-left">{row.original.symbol}</p>
            </div>
          </div>
        )
      },
      {
        Header: 'Balance',
        accessor: 'balance',
        Cell: ({ value }) => (
          <span className="text-white text-left">{
            formatBalance(value.toLocaleString(), 12)
          }</span>
        )
      },
      {
        Header: 'Contract Address',
        accessor: 'contractAddress',
        Cell: ({ value }) => (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <code className="font-mono text-gray-400">
                {value.slice(0, 6)}...{value.slice(-4)}
              </code>
              <button
                onClick={() => copyToClipboard(value)}
                className="p-1.5 rounded-md hover:bg-[#1F2037] text-gray-500 hover:text-gray-300"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <a
              href={`https://testnet.snowtrace.io/address/${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#8A2BE2] hover:text-[#9D44F0]"
            >
              view
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    const getAllTokens = async () => {
      setIsLoading(true)
      const response = await axiosInstance.get(GET_API.GET_WALLET_TOKENS(userAddress, "43113"))
      return response
    }

    getAllTokens().then((res) => {
      setIsLoading(false)
      console.log("res", res.data)
      setData((res.data as any[]).filter(coin => coin.name !== "") as any);
    })
  }, [userAddress])

  const SkeletonRow = () => (
    <div className="animate-pulse flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
          <div className="h-3 w-16 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-20 bg-gray-700 rounded"></div>
        <div className="h-3 w-32 bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  return (
    isLoading
      ?
      <div className="rounded-lg overflow-hidden">
        {[...Array(5)].map((_, index) => (
          <SkeletonRow key={index} />
        ))}
      </div>
      :
      <div>
        {/* Action Buttons and Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              value={globalFilter || ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search coins..."
              className="pl-9 pr-4 py-2 bg-[#1A1B2A] border border-[#1F2037] rounded-lg text-white placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-[#1F2037]">
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 py-3 text-left text-gray-400 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? <ChevronDown className="w-4 h-4" />
                              : <ChevronUp className="w-4 h-4" />
                            : ''}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-b border-[#1F2037]/50 hover:bg-[#1A1B2A]">
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="px-4 py-4 text-left">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-gray-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="p-1 rounded-md hover:bg-[#1A1B2A] disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="p-1 rounded-md hover:bg-[#1A1B2A] disabled:opacity-50"
            >
              Next
            </button>
            <span className="text-sm">
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
          </div>
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className="bg-[#1A1B2A] border border-[#1F2037] rounded-md px-2 py-1 text-sm"
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
  );
};

export default CoinsHeldTab;