"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, MapPin, Star, Users, ExternalLink, Lightbulb, Target } from "lucide-react"

interface MarketingTip {
  id: string
  title: string
  description: string
  platform: 'WhatsApp' | 'Google Business' | 'Social Media' | 'General'
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  timeToImplement: string
  expectedImpact: 'Low' | 'Medium' | 'High'
  icon: React.ElementType
  steps: string[]
  tools: string[]
}

const marketingTips: MarketingTip[] = [
  {
    id: '1',
    title: "WhatsApp Business Catalog",
    description: "Create a product catalog to showcase your offerings directly in WhatsApp",
    platform: 'WhatsApp',
    difficulty: 'Easy',
    timeToImplement: '30 mins',
    expectedImpact: 'High',
    icon: MessageSquare,
    steps: [
      "Download WhatsApp Business app",
      "Go to Settings > Business Tools > Catalog",
      "Add your products with photos and prices",
      "Share catalog link with customers",
      "Use catalog in status updates"
    ],
    tools: ["WhatsApp Business", "Phone camera", "Product photos"]
  },
  {
    id: '2',
    title: "Google Business Profile Optimization",
    description: "Optimize your Google Business Profile to attract local customers",
    platform: 'Google Business',
    difficulty: 'Medium',
    timeToImplement: '1 hour',
    expectedImpact: 'High',
    icon: MapPin,
    steps: [
      "Claim your Google Business Profile",
      "Add complete business information",
      "Upload high-quality photos",
      "Encourage customer reviews",
      "Post regular updates and offers"
    ],
    tools: ["Google Business", "Camera", "Customer review system"]
  },
  {
    id: '3',
    title: "Customer Review Strategy",
    description: "Build a system to collect and showcase positive customer reviews",
    platform: 'General',
    difficulty: 'Easy',
    timeToImplement: '45 mins',
    expectedImpact: 'Medium',
    icon: Star,
    steps: [
      "Ask satisfied customers for reviews",
      "Create QR codes linking to review pages",
      "Offer small incentives for reviews",
      "Respond to all reviews professionally",
      "Display positive reviews in store"
    ],
    tools: ["QR code generator", "Review management app", "Printed materials"]
  },
  {
    id: '4',
    title: "Local Community Engagement",
    description: "Connect with local community groups and events to build relationships",
    platform: 'Social Media',
    difficulty: 'Medium',
    timeToImplement: '2 hours',
    expectedImpact: 'High',
    icon: Users,
    steps: [
      "Join local Facebook groups",
      "Participate in community events",
      "Sponsor local sports teams or events",
      "Collaborate with nearby businesses",
      "Share community news and events"
    ],
    tools: ["Facebook", "Instagram", "Local event platforms", "Networking"]
  },
  {
    id: '5',
    title: "WhatsApp Status Marketing",
    description: "Use WhatsApp Status to share daily offers and behind-the-scenes content",
    platform: 'WhatsApp',
    difficulty: 'Easy',
    timeToImplement: '15 mins daily',
    expectedImpact: 'Medium',
    icon: Target,
    steps: [
      "Post daily offers in WhatsApp Status",
      "Share behind-the-scenes content",
      "Highlight customer testimonials",
      "Show new product arrivals",
      "Create urgency with limited-time offers"
    ],
    tools: ["WhatsApp Business", "Phone camera", "Graphic design app"]
  },
  {
    id: '6',
    title: "Google Posts for Visibility",
    description: "Use Google Posts to share updates directly in search results",
    platform: 'Google Business',
    difficulty: 'Easy',
    timeToImplement: '20 mins',
    expectedImpact: 'Medium',
    icon: Lightbulb,
    steps: [
      "Access Google Business Profile",
      "Create posts about offers or events",
      "Use high-quality images",
      "Include clear call-to-action",
      "Post regularly to stay visible"
    ],
    tools: ["Google Business", "Canva for graphics", "Scheduling tools"]
  }
]

export function MarketingTips() {
  const [selectedTip, setSelectedTip] = React.useState<MarketingTip | null>(null)

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'WhatsApp': return 'bg-green-500/10 text-green-700 border-green-200'
      case 'Google Business': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'Social Media': return 'bg-purple-500/10 text-purple-700 border-purple-200'
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'destructive'
      case 'Medium': return 'secondary'
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
        <h2 className="text-2xl font-bold mb-2">Local Marketing Tips</h2>
        <p className="text-muted-foreground">
          Actionable marketing strategies to grow your local business
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {marketingTips.map((tip) => (
          <motion.div key={tip.id} variants={itemVariants}>
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer h-full"
              onClick={() => setSelectedTip(tip)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <tip.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge className={getPlatformColor(tip.platform)}>
                    {tip.platform}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="font-medium">{tip.difficulty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{tip.timeToImplement}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Impact:</span>
                    <Badge variant={getImpactColor(tip.expectedImpact)} className="text-xs">
                      {tip.expectedImpact}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Detailed View Modal */}
      {selectedTip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTip(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <selectedTip.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedTip.title}</CardTitle>
                      <p className="text-muted-foreground">{selectedTip.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedTip(null)}>
                    ×
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className={getPlatformColor(selectedTip.platform)}>
                    {selectedTip.platform}
                  </Badge>
                  <Badge variant="outline">{selectedTip.difficulty}</Badge>
                  <Badge variant="outline">{selectedTip.timeToImplement}</Badge>
                  <Badge variant={getImpactColor(selectedTip.expectedImpact)}>
                    {selectedTip.expectedImpact} Impact
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Implementation Steps:</h4>
                  <ol className="space-y-2">
                    {selectedTip.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Tools Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTip.tools.map((tool, index) => (
                      <Badge key={index} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    Start Implementation
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}