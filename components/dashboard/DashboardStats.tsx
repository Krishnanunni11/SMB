"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingBag, TrendingUp } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"

interface StatItem {
  title: string
  value: string
  change: number
  icon: React.ElementType
  trend: 'up' | 'down'
}

const statsData: StatItem[] = [
  {
    title: "Total Revenue",
    value: "$12,456",
    change: 12.5,
    icon: DollarSign,
    trend: 'up'
  },
  {
    title: "Active Customers",
    value: "324",
    change: 8.2,
    icon: Users,
    trend: 'up'
  },
  {
    title: "Orders Today",
    value: "45",
    change: -3.1,
    icon: ShoppingBag,
    trend: 'down'
  },
  {
    title: "Avg. Order Value",
    value: "$87.50",
    change: 15.3,
    icon: TrendingUp,
    trend: 'up'
  }
]

export function DashboardStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {statsData.map((stat, index) => (
        <motion.div key={stat.title} variants={itemVariants}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={cn(
                "flex items-center text-xs",
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                <span>{Math.abs(stat.change)}% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}