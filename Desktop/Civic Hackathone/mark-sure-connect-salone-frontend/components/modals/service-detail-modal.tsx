"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, MapPin, Clock, DollarSign, FileText, Phone, Mail, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Service type compatible with both old and new data structures
type ServiceForModal = {
  id: string
  name: string
  nameKr: string
  ministry: string
  ministryKr: string
  description: string
  descriptionKr: string
  requirements: string[]
  requirementsKr: string[]
  processingTime: string
  processingTimeKr: string
  fee: string
  feeKr: string
  location: string
  locationKr: string
  contactPhone?: string
  contactEmail?: string
}

interface ServiceDetailModalProps {
  service: ServiceForModal
  onClose: () => void
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { language, t } = useLanguage()
  const [showReportForm, setShowReportForm] = useState(false)
  const [reportData, setReportData] = useState({ name: "", email: "", message: "" })

  const handleReportSubmit = () => {
    // Save to localStorage
    const reports = JSON.parse(localStorage.getItem("wrongInfoReports") || "[]")
    reports.push({
      serviceId: service.id,
      serviceName: service.name,
      ...reportData,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("wrongInfoReports", JSON.stringify(reports))

    // Reset and close
    setReportData({ name: "", email: "", message: "" })
    setShowReportForm(false)
    alert("Thank you for your report. We will review it shortly.")
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-xl sm:rounded-xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-balance">{language === "en" ? service.name : service.nameKr}</h2>
            <p className="text-sm text-primary">{language === "en" ? service.ministry : service.ministryKr}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Description */}
          <div>
            <p className="text-foreground leading-relaxed">
              {language === "en" ? service.description : service.descriptionKr}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Requirements</h3>
            </div>
            <ul className="space-y-2">
              {(language === "en" ? service.requirements : service.requirementsKr).map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Processing Time */}
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Processing Time</h3>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? service.processingTime : service.processingTimeKr}
              </p>
            </div>
          </div>

          {/* Fee */}
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Fee</h3>
              <p className="text-sm text-muted-foreground">{language === "en" ? service.fee : service.feeKr}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "en" ? service.location : service.locationKr}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          {(service.contactPhone || service.contactEmail) && (
            <div>
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                {service.contactPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${service.contactPhone}`} className="text-primary hover:underline">
                      {service.contactPhone}
                    </a>
                  </div>
                )}
                {service.contactEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${service.contactEmail}`} className="text-primary hover:underline">
                      {service.contactEmail}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Report Wrong Info */}
          {!showReportForm ? (
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowReportForm(true)}>
              <AlertCircle className="h-4 w-4 mr-2" />
              {t.common.reportWrongInfo}
            </Button>
          ) : (
            <Card className="p-4 border-muted">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Report Incorrect Information
              </h3>
              <div className="space-y-3">
                <Input
                  placeholder="Your Name"
                  value={reportData.name}
                  onChange={(e) => setReportData({ ...reportData, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={reportData.email}
                  onChange={(e) => setReportData({ ...reportData, email: e.target.value })}
                />
                <Textarea
                  placeholder="What information is incorrect?"
                  value={reportData.message}
                  onChange={(e) => setReportData({ ...reportData, message: e.target.value })}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={handleReportSubmit} className="flex-1">
                    {t.common.submit}
                  </Button>
                  <Button variant="outline" onClick={() => setShowReportForm(false)} className="flex-1">
                    {t.common.cancel}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  )
}
