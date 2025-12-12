import {  LogIn, Home, FolderOpen, Users, MessageSquare } from 'lucide-react'

export const onboardingSteps = [
  {
    id: 1,
    title: "Login & Signup",
    duration: "~2 min",
    icon: LogIn,
    color: "from-blue-500 to-blue-600",
    description: "Get started with your account",
    visual: "auth",
    substeps: [
      { text: "Sign up via Email + Password or Google OAuth", done: true },
      { text: "Receive & verify OTP for email signup", done: true },
      { text: "Account created → Redirect to login", done: true },
      { text: "Enter credentials → Validate → Home Page", done: true },
    ]
  },
  {
    id: 2,
    title: "Workspace",
    duration: "Instant",
    icon: Home,
    color: "from-green-500 to-green-600",
    description: "Your central command center",
    visual: "home",
    substeps: [
      { text: "View Document Repository section", done: true },
      { text: "View Workgroup section", done: true },
      { text: "Choose where to start", done: false },
    ]
  },
  {
    id: 3,
    title: "Document Repository",
    duration: "~3 min",
    icon: FolderOpen,
    color: "from-orange-500 to-orange-600",
    description: "Organize and upload your documents",
    visual: "docs",
    substeps: [
      { text: "Click 'Add Document Repo'", done: true },
      { text: "Enter Name and Description", done: true },
      { text: "Repository created", done: true },
      { text: "Open repo → Upload documents", done: false },
      { text: "View all uploaded documents", done: false },
    ]
  },
  {
    id: 4,
    title: "Workgroup Setup",
    duration: "~5 min",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    description: "Create collaborative workspaces",
    visual: "workgroup",
    substeps: [
      { text: "Click 'Workgroup' from Home", done: true },
      { text: "Click 'Add Workgroup'", done: true },
      { text: "Fill Name, Description", done: true },
      { text: "Select Users", done: false },
      { text: "Select Document Repositories", done: false },
      { text: "Workgroup created!", done: false },
    ]
  },
  {
    id: 5,
    title: "AI Workspace",
    duration: "Ongoing",
    icon: MessageSquare,
    color: "from-pink-500 to-pink-600",
    description: "AI-powered collaboration hub",
    visual: "workspace",
    substeps: [
      { text: "Left: Manage chats, repos, users", done: true },
      { text: "Middle: Chat with AI about your docs", done: true },
      { text: "Right: Dashboard stats", done: false },
      { text: "Right: Browse linked documents", done: false },
      { text: "Right: View AI reasoning graph", done: false },
    ]
  }
]