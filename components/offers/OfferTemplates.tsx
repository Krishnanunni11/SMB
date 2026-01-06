"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Percent, Gift, Zap, Users, Copy, Share2 } from "lucide-react"

interface OfferTemplate {
  id: string
  title: string
  description: string
  discount: string
  type: 'percentage' | 'fixed' | 'bogo' | 'loyalty'
  category: string
  icon: React.ElementType
  template: string
}

const offerTemplates: OfferTemplate[] = [
  {
    id: '1',
    title: "New Customer Welcome",
    description: "First-time buyer incentive",
    discount: "20% OFF",
    type: 'percentage',
    category: 'New Customer',
    icon: Users,
    template: "Welcome to [Store Name]! Get 20% off your first purchase with code WELCOME20. Valid until [Date]."
  },
  {
    id: '2',
    title: "Weekend Flash Sale",
    description: "Limited time weekend offer",
    discount: "$10 OFF",
    type: 'fixed',
    category: 'Flash Sale',
    icon: Zap,
    template: "⚡ WEEKEND FLASH SALE! Get $10 off orders over $50. Use code WEEKEND10. Hurry, ends Sunday!"
  },
  {
    id: '3',
    title: "Buy One Get One",
    description: "Popular BOGO promotion",
    discount: "BOGO 50%",
    type: 'bogo',
    category: 'BOGO',
    icon: Gift,
    template: "🎁 Buy One, Get One 50% Off! Mix & match your favorites. No code needed. Limited time only!"
  },
  {
    id: '4',
    title: "Loyalty Reward",
    description: "Returning customer appreciation",
    discount: "15% OFF",
    type: 'loyalty',
    category: 'Loyalty',
    icon: Percent,
    template: "Thank you for being a valued customer! Enjoy 15% off your next purchase with code LOYAL15."
  }
]

export function OfferTemplates() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
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
        <h2 className="text-2xl font-bold mb-2">Customer Offer Templates</h2>
        <p className="text-muted-foreground">
          Ready-to-use promotional templates for your business
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {offerTemplates.map((offer) => (
          <motion.div key={offer.id} variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <offer.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{offer.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{offer.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{offer.discount}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">{offer.template}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(offer.template, offer.id)}
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copiedId === offer.id ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: offer.title,
                          text: offer.template
                        })
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4" />
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