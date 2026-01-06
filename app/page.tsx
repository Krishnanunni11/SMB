"use client"

import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Navigation } from '@/components/navigation/Navigation'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { OfferTemplates } from '@/components/offers/OfferTemplates'
import { SalesTracker } from '@/components/sales/SalesTracker'
import { InventoryManager } from '@/components/inventory/InventoryManager'
import { MarketingTips } from '@/components/marketing/MarketingTips'
import { motion } from 'framer-motion'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Console logging for iframe compatibility
  useEffect(() => {
    ["log", "warn", "error"].forEach((level) => {
      const original = console[level as keyof Console] as any;

      (console as any)[level] = (...args: any[]) => {
        // keep normal console output
        original.apply(console, args);

        // sanitize args for postMessage
        const safeArgs = args.map((a) => {
          if (a instanceof Error) {
            return {
              message: a.message,
              stack: a.stack,
              name: a.name,
            };
          }
          try {
            JSON.stringify(a);
            return a;
          } catch {
            return String(a);
          }
        });

        try {
          window.parent?.postMessage(
            { type: "iframe-console", level, args: safeArgs },
            "*"
          );
        } catch (e) {
          // use original, not the wrapped one (avoid recursion)
          original("Failed to postMessage:", e);
        }
      };
    });

    // Global error handler
    window.onerror = (msg, url, line, col, error) => {
      window.parent?.postMessage(
        {
          type: "iframe-console",
          level: "error",
          args: [
            msg,
            url,
            line,
            col,
            error ? { message: error.message, stack: error.stack } : null,
          ],
        },
        "*"
      );
    };

    // Unhandled promise rejections
    window.onunhandledrejection = (event) => {
      const reason =
        event.reason instanceof Error
          ? { message: event.reason.message, stack: event.reason.stack }
          : event.reason;

      window.parent?.postMessage(
        {
          type: "iframe-console",
          level: "error",
          args: ["Unhandled Promise Rejection:", reason],
        },
        "*"
      );
    };
  }, []);

  const renderContent = () => {
    const contentVariants = {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of your business performance and key metrics
              </p>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('sales')}
                    className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-left"
                  >
                    <h4 className="font-medium">Add Sale</h4>
                    <p className="text-sm text-muted-foreground">Record new transaction</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-left"
                  >
                    <h4 className="font-medium">Check Inventory</h4>
                    <p className="text-sm text-muted-foreground">View stock levels</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('offers')}
                    className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-left"
                  >
                    <h4 className="font-medium">Create Offer</h4>
                    <p className="text-sm text-muted-foreground">Generate promotions</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('marketing')}
                    className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-left"
                  >
                    <h4 className="font-medium">Marketing Tips</h4>
                    <p className="text-sm text-muted-foreground">Grow your business</p>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )
      case 'offers':
        return (
          <motion.div
            key="offers"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <OfferTemplates />
          </motion.div>
        )
      case 'sales':
        return (
          <motion.div
            key="sales"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <SalesTracker />
          </motion.div>
        )
      case 'inventory':
        return (
          <motion.div
            key="inventory"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <InventoryManager />
          </motion.div>
        )
      case 'marketing':
        return (
          <motion.div
            key="marketing"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <MarketingTips />
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="lg:pl-64 pb-16 lg:pb-0">
          <main className="p-4 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}