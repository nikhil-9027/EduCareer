"use client"

import { useState, useEffect } from "react"
import { JobCard } from "@/components/job-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Filter, Briefcase, MapPin, DollarSign, Users, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: string
  experience: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  applicationDeadline: string
  isRemote: boolean
  category: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resume: "",
  })
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const { user } = useAuth()

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [jobs, searchTerm, selectedCategory, selectedType, selectedExperience])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs")
      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...jobs]

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requirements.some((req) => req.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((job) => job.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((job) => job.type.toLowerCase() === selectedType.toLowerCase())
    }

    if (selectedExperience !== "all") {
      filtered = filtered.filter((job) => job.experience.toLowerCase() === selectedExperience.toLowerCase())
    }

    setFilteredJobs(filtered)
  }

  const handleApply = (jobId: number) => {
    if (!user) {
      alert("Please login to apply for jobs")
      return
    }

    const job = jobs.find((j) => j.id === jobId)
    if (job) {
      setSelectedJob(job)
      setShowApplicationModal(true)
    }
  }

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job)
    setShowJobDetails(true)
  }

  const submitApplication = async () => {
    if (!selectedJob || !user) return

    setApplicationStatus("submitting")
    try {
      const response = await fetch(`/api/jobs/${selectedJob.id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          coverLetter: applicationData.coverLetter,
          resume: applicationData.resume,
        }),
      })

      if (response.ok) {
        setApplicationStatus("success")
        setTimeout(() => {
          setShowApplicationModal(false)
          setApplicationData({ coverLetter: "", resume: "" })
          setApplicationStatus("idle")
        }, 2000)
      } else {
        const data = await response.json()
        alert(data.msg || "Application failed")
        setApplicationStatus("error")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      setApplicationStatus("error")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Job
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              Marketplace
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities that match your skills and career goals. From internships to senior positions.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, companies, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="fresher">Fresher</SelectItem>
                  <SelectItem value="entry level">Entry Level</SelectItem>
                  <SelectItem value="mid level">Mid Level</SelectItem>
                  <SelectItem value="senior level">Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </p>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters applied</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApply} onViewDetails={handleViewDetails} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="border-indigo-500/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Job Details Modal */}
        <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedJob.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{selectedJob.salary}</span>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                    <p className="text-muted-foreground">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowJobDetails(false)}>
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        setShowJobDetails(false)
                        handleApply(selectedJob.id)
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Application Modal */}
        <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            </DialogHeader>

            {applicationStatus === "success" ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground">We'll review your application and get back to you soon.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Tell us why you're interested in this position..."
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                    className="min-h-[120px] mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Resume/Portfolio Link</Label>
                  <Input
                    id="resume"
                    placeholder="https://your-portfolio.com or upload link"
                    value={applicationData.resume}
                    onChange={(e) => setApplicationData((prev) => ({ ...prev, resume: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowApplicationModal(false)}
                    disabled={applicationStatus === "submitting"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={submitApplication}
                    disabled={applicationStatus === "submitting"}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {applicationStatus === "submitting" ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
