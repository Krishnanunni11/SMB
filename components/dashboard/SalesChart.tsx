"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const salesData = [
  { day: 'Mon', sales: 4200 },
  { day: 'Tue', sales: 3800 },
  { day: 'Wed', sales: 5100 },
  { day: 'Thu', sales: 4600 },
  { day: 'Fri', sales: 6200 },
  { day: 'Sat', sales: 5800 },
  { day: 'Sun', sales: 4900 }
]

export function SalesChart() {
  const maxSales = Math.max(...salesData.map(d => d.sales))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weekly Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {salesData.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 text-sm font-medium text-muted-foreground">
                {item.day}
              </div>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.sales / maxSales) * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                />
              </div>
              <div className="text-sm font-medium w-16 text-right">
                ${(item.sales / 1000).toFixed(1)}k
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}