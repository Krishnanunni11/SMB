"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Package, Plus, Minus, ShoppingCart } from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  price: number
  lastRestocked: Date
  supplier: string
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Coffee Beans - Premium Blend',
    category: 'Beverages',
    currentStock: 8,
    minStock: 10,
    maxStock: 50,
    price: 24.99,
    lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    supplier: 'Local Coffee Co.'
  },
  {
    id: '2',
    name: 'Organic Milk',
    category: 'Dairy',
    currentStock: 15,
    minStock: 12,
    maxStock: 30,
    price: 4.50,
    lastRestocked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    supplier: 'Fresh Farms'
  },
  {
    id: '3',
    name: 'Croissants - Pack of 6',
    category: 'Bakery',
    currentStock: 3,
    minStock: 5,
    maxStock: 20,
    price: 8.99,
    lastRestocked: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    supplier: 'Morning Bakery'
  },
  {
    id: '4',
    name: 'Energy Bars - Mixed Pack',
    category: 'Snacks',
    currentStock: 25,
    minStock: 15,
    maxStock: 40,
    price: 12.99,
    lastRestocked: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    supplier: 'Healthy Snacks Ltd'
  }
]

export function InventoryManager() {
  const [inventory, setInventory] = React.useState<InventoryItem[]>(mockInventory)
  
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock)
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0)

  const updateStock = (id: string, change: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id 
        ? { ...item, currentStock: Math.max(0, item.currentStock + change) }
        : item
    ))
  }

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= item.minStock) return 'low'
    if (item.currentStock >= item.maxStock * 0.8) return 'high'
    return 'normal'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'destructive'
      case 'high': return 'secondary'
      default: return 'outline'
    }
  }

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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Inventory Management</h2>
        <p className="text-muted-foreground">
          Track stock levels and get restocking alerts
        </p>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">
              Active products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Need restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Current stock value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Restocking Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-destructive/10 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Only {item.currentStock} left (Min: {item.minStock})
                    </p>
                  </div>
                  <Button size="sm" variant="destructive">
                    Reorder
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {inventory.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <Badge variant={getStatusColor(getStockStatus(item))}>
                    {getStockStatus(item) === 'low' ? 'Low Stock' : 
                     getStockStatus(item) === 'high' ? 'Well Stocked' : 'Normal'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current Stock</p>
                    <p className="font-medium">{item.currentStock} units</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Unit Price</p>
                    <p className="font-medium">${item.price}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Stock</p>
                    <p className="font-medium">{item.minStock} units</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Supplier</p>
                    <p className="font-medium">{item.supplier}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStock(item.id, -1)}
                      disabled={item.currentStock === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-medium px-2">{item.currentStock}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStock(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    Reorder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}