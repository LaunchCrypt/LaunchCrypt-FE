import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { copyToClipboard, formatAddressLong } from '../../utils';
import Swal from 'sweetalert2';

function UserStatsTable({ userTableData }: { userTableData: any }) {
    console.log("userTableData", userTableData)
    // Sample user data
    // const data = useMemo(
    //     () => [
    //         {
    //             id: '1',
    //             userName: 'alex.eth',
    //             totalTrades: 1234,
    //             tradeVolume: 456789,
    //             avgTradeSize: 370.17,
    //             successRate: 92.5,
    //             lastActive: '2024-12-09'
    //         },
    //         {
    //             id: '2',
    //             userName: 'trader.sol',
    //             totalTrades: 987,
    //             tradeVolume: 876543,
    //             avgTradeSize: 888.09,
    //             successRate: 88.3,
    //             lastActive: '2024-12-10'
    //         },
    //         {
    //             id: '3',
    //             userName: 'crypto_whale',
    //             totalTrades: 2345,
    //             tradeVolume: 1234567,
    //             avgTradeSize: 526.47,
    //             successRate: 94.1,
    //             lastActive: '2024-12-10'
    //         },
    //         {
    //             id: '4',
    //             userName: 'defi_master',
    //             totalTrades: 1567,
    //             tradeVolume: 678901,
    //             avgTradeSize: 433.25,
    //             successRate: 91.8,
    //             lastActive: '2024-12-08'
    //         },
    //         {
    //             id: '5',
    //             userName: 'web3_guru',
    //             totalTrades: 789,
    //             tradeVolume: 345678,
    //             avgTradeSize: 438.12,
    //             successRate: 89.7,
    //             lastActive: '2024-12-10'
    //         }
    //     ],
    //     []
    // );

    // Format numbers with appropriate suffixes and decimals
    const formatNumber = (value, type) => {
        if (type === 'volume') {
            if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
            if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
            return `$${value.toFixed(2)}`;
        }
        if (type === 'trades') return value.toLocaleString();
        if (type === 'avgSize') return `$${value.toFixed(2)}`;
        if (type === 'percentage') return `${value}%`;
        return value;
    };

    // Format date to relative time
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const columns = useMemo(
        () => [
            {
                Header: 'User',
                accessor: 'name',
                Cell: ({ value }) => <span className="text-emerald-400">{value}</span>
            },
            {
                Header: 'Address',
                accessor: 'address',
                Cell: ({ value }) => <span onClick={() => copyToClipboardSuccessfully(value)} className="cursor-pointer">{formatAddressLong(value, 6)}</span>
            },
            {
                Header: 'Total Trades',
                accessor: 'totalTrade',
                Cell: ({ value }) => formatNumber(value, 'trades')
            },
            {
                Header: 'Volume',
                accessor: 'totalTradeVolume',
                Cell: ({ value }) => formatNumber(value, 'volume')
            },
            {
                Header: 'Avg Trade Size',
                accessor: 'avgTradeSize',
                Cell: ({ value }) => formatNumber(value, 'avgSize')
            },
            {
                Header: 'Last Active',
                accessor: 'lastTrade',
                Cell: ({ value }) => formatDate(value)
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
        state,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        pageCount,
    } = useTable(
        {
            columns,
            data: userTableData,
            initialState: { pageSize: 5 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <div className="rounded-lg bg-gray-800/50 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl font-bold">User Statistics</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        onChange={e => setGlobalFilter(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-gray-700/50 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Search..."
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table {...getTableProps()} className="w-full text-gray-300">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-gray-700 text-center">
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="py-3 px-4 text-center"
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <ChevronDown className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronUp className="w-4 h-4" />
                                                    )
                                                ) : null}
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
                                <tr
                                    {...row.getRowProps()}
                                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                                >
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="py-4 px-4">
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
                        className="p-1 rounded-md hover:bg-gray-700/50 disabled:opacity-50"
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        className="p-1 rounded-md hover:bg-gray-700/50 disabled:opacity-50"
                        onClick={nextPage}
                        disabled={!canNextPage}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <span className="text-sm">
                        Page {state.pageIndex + 1} of {pageCount}
                    </span>
                </div>
                <select
                    value={state.pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className="bg-gray-800 text-gray-300 border border-gray-600 rounded-md px-3 py-1.5 text-sm 
                    focus:ring-2 focus:ring-emerald-500 cursor-pointer relative"
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option
                            key={pageSize}
                            value={pageSize}
                            className="bg-gray-800 text-gray-300"
                        >
                            show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

const copyToClipboardSuccessfully = (text: string) => {
    copyToClipboard(text);
    Swal.fire({
        icon: 'success',
        title: 'Copied',
        showConfirmButton: false,
        timer: 1000,
        iconColor: "#7b37c6",
        width: "16rem",
        background: "#28253e",
        customClass: {
            popup: 'rounded-[32px] bg-[#28253e] border border-[#35354b] shadow-lg',
            title: 'text-white font-semibold text-2xl',
        },
    });
}

export default UserStatsTable;