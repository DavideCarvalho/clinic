import React, { useState } from 'react'
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export type Column<T> = ColumnDef<T>

type ExpandableTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  renderSubComponent: (props: { row: T }) => React.ReactNode
  getRowCanExpand: (row: T) => boolean
}

export default function ExpandableTable<T extends object>({
  data,
  columns,
  renderSubComponent,
  getRowCanExpand,
}: ExpandableTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Record<string | number, boolean>>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const toggleRowExpanded = (rowId: string | number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            <TableHead className="w-[50px]"></TableHead>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          const canExpand = getRowCanExpand(row.original)
          const isExpanded = expandedRows[row.id]
          return (
            <React.Fragment key={row.id}>
              <TableRow>
                <TableCell>
                  {canExpand && (
                    <button onClick={() => toggleRowExpanded(row.id)} className="cursor-pointer">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.tr
                    key={`expanded-${row.id}`}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={{
                      expanded: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <TableCell colSpan={row.getVisibleCells().length + 1}>
                      <motion.div
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={{
                          expanded: { opacity: 1, height: 'auto' },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="bg-muted/20 overflow-hidden"
                      >
                        {renderSubComponent({ row: row.original })}
                      </motion.div>
                    </TableCell>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          )
        })}
      </TableBody>
    </Table>
  )
}
