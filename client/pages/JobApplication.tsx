import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navigation } from "../components/ui/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Users,
  Star,
  Send,
} from "lucide-react";

// Mock job data - in a real app, this would come from an API
const jobData = {
  "1": {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    description:
      "Join our team to build cutting-edge web applications using React, TypeScript, and modern tools. We're looking for someone passionate about creating exceptional user experiences.",
    fullDescription: `We are seeking a Senior Frontend Developer to join our growing engineering team. You will be responsible for building and maintaining our web applications, working closely with our design and product teams to deliver exceptional user experiences.

Key Responsibilities:
• Develop and maintain React-based web applications
• Collaborate with designers to implement pixel-perfect UI/UX
• Write clean, maintainable, and testable code
• Optimize applications for maximum speed and scalability
• Mentor junior developers and contribute to code reviews
• Stay up-to-date with the latest frontend technologies and best practices

Requirements:
• 5+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript
• Experience with state management libraries (Redux, Zustand)
• Proficiency in CSS frameworks (TailwindCSS, Styled Components)
• Knowledge of build tools and testing frameworks
• Strong understanding of web performance optimization
• Experience with version control systems (Git)
• Excellent communication and collaboration skills

Benefits:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote work options
• Professional development budget
• Free meals and snacks
• State-of-the-art office in downtown San Francisco`,
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "GraphQL"],
    postedAt: "2 days ago",
    companyInfo: {
      employees: "500-1000",
      founded: "2015",
      industry: "Technology",
      rating: 4.5,
    },
  },
};

export default function JobApplication() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const job = jobData[jobId as keyof typeof jobData];

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Job Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for applying to {job.title} at {job.company}. We'll
              review your application and get back to you soon.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/jobs">Browse More Jobs</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">View My Applications</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/jobs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-gray-500">Apply for Position</span>
          </div>

          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" alt={job.company} />
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xl">
                {job.company.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-lg text-gray-600 font-medium mb-3">
                {job.company}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.postedAt}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <Badge>{job.type}</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <p className="text-gray-600">
                  Please fill out the form below to apply for this position.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Professional Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Professional Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                        <Input
                          id="linkedinUrl"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={formData.linkedinUrl}
                          onChange={(e) =>
                            handleInputChange("linkedinUrl", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolioUrl">Portfolio/Website</Label>
                        <Input
                          id="portfolioUrl"
                          placeholder="https://yourportfolio.com"
                          value={formData.portfolioUrl}
                          onChange={(e) =>
                            handleInputChange("portfolioUrl", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Resume Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Resume/CV *
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                        required
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        {formData.resume ? (
                          <div className="space-y-2">
                            <FileText className="w-8 h-8 text-orange-600 mx-auto" />
                            <p className="text-sm font-medium text-gray-900">
                              {formData.resume.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Click to change file
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-sm font-medium text-gray-900">
                              Upload your resume
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, or DOCX up to 10MB
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <Separator />

                  {/* Cover Letter */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cover Letter
                    </h3>
                    <div>
                      <Label htmlFor="coverLetter">
                        Why are you interested in this position?
                      </Label>
                      <Textarea
                        id="coverLetter"
                        rows={6}
                        placeholder="Tell us about your interest in this role and what makes you a great fit..."
                        value={formData.coverLetter}
                        onChange={(e) =>
                          handleInputChange("coverLetter", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <Button type="button" variant="outline" asChild>
                      <Link to="/jobs">Cancel</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Job Details Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type</span>
                  <Badge>{job.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-medium">{job.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium">{job.postedAt}</span>
                </div>
              </CardContent>
            </Card>

            {/* Required Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-orange-200 text-orange-700"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Employees</span>
                  </div>
                  <span className="text-sm font-medium">
                    {job.companyInfo.employees}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Founded</span>
                  </div>
                  <span className="text-sm font-medium">
                    {job.companyInfo.founded}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Rating</span>
                  </div>
                  <span className="text-sm font-medium">
                    {job.companyInfo.rating}/5.0
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm text-gray-600">
                  {job.fullDescription.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-3 text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
