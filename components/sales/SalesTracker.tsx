"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, DollarSign, Package, Clock } from "lucide-react"
import { formatCurrency, formatTime } from "@/lib/utils"

interface Sale {
  id: string
  amount: number
  items: number
  customer: string
  time: Date
  paymentMethod: string
}

const mockSales: Sale[] = [
  {
    id: '1',
    amount: 45.99,
    items: 3,
    customer: 'John Doe',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    paymentMethod: 'Card'
  },
  {
    id: '2',
    amount: 23.50,
    items: 1,
    customer: 'Sarah Wilson',
    time: new Date(Date.now() - 4 * 60 * 60 * 1000),
    paymentMethod: 'Cash'
  },
  {
    id: '3',
    amount: 78.25,
    items: 5,
    customer: 'Mike Johnson',
    time: new Date(Date.now() - 6 * 60 * 60 * 1000),
    paymentMethod: 'Card'
  }
]

export function SalesTracker() {
  const [sales, setSales] = React.useState<Sale[]>(mockSales)
  const [showForm, setShowForm] = React.useState(false)
  const [formData, setFormData] = React.useState({
    amount: '',
    items: '',
    customer: '',
    paymentMethod: 'Card'
  })

  const todayTotal = sales.reduce((sum, sale) => sum + sale.amount, 0)
  const todayItems = sales.reduce((sum, sale) => sum + sale.items, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newSale: Sale = {
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      items: parseInt(formData.items),
      customer: formData.customer || 'Walk-in Customer',
      time: new Date(),
      paymentMethod: formData.paymentMethod
    }

    setSales(prev => [newSale, ...prev])
    setFormData({ amount: '', items: '', customer: '', paymentMethod: 'Card' })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Daily Sales Tracker</h2>
          <p className="text-muted-foreground">
            Track and manage your daily sales
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sale
        </Button>
      </div>

      {/* Todays Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Todays Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(todayTotal)}</div>
            <p className="text-xs text-muted-foreground">
              {sales.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayItems}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {sales.length > 0 ? (todayItems / sales.length).toFixed(1) : 0} per sale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(sales.length > 0 ? todayTotal / sales.length : 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Target: $50.00
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add Sale Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Add New Sale</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Sale Amount ($)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Number of Items</label>
                    <Input
                      type="number"
                      value={formData.items}
                      onChange={(e) => setFormData(prev => ({ ...prev, items: e.target.value }))}
                      placeholder="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Customer Name (Optional)</label>
                    <Input
                      type="text"
                      value={formData.customer}
                      onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                      placeholder="Walk-in Customer"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Payment Method</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    >
                      <option value="Card">Card</option>
                      <option value="Cash">Cash</option>
                      <option value="Digital">Digital Wallet</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Add Sale</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Sales List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sales.map((sale, index) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{sale.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {sale.items} items • {formatTime(sale.time)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(sale.amount)}</p>
                  <Badge variant="outline" className="text-xs">
                    {sale.paymentMethod}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}