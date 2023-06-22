import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Dribbble,
  ExternalLink,
  Facebook,
  File,
  FileText,
  Github,
  GripVertical,
  HelpCircle,
  Image,
  Instagram,
  Laptop,
  Link,
  Linkedin,
  Loader2,
  LucideProps,
  Mail,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  Share,
  Share2,
  SunMedium,
  Trash,
  Twitch,
  Twitter,
  User,
  X,
  Youtube,
} from "lucide-react"

export const Icons = {
  logoColor: ({ ...props }: LucideProps) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M91.4062 0C108.75 0 120 11.25 120 28.5938V91.4062C120 108.75 108.75 120 91.4062 120H28.5938C11.25 120 0 108.75 0 91.4062V28.5938C0 11.25 11.25 0 28.5938 0H91.4062Z"
        fill="#26E0EC"
      />
      <path
        d="M102 92.5C86.6667 92.5 48.4 91.5 18 87.5C18 90.3 22.6667 95.3333 25 97.5H98.5L102 92.5Z"
        fill="black"
        stroke="black"
      />
      <path
        d="M33 85.5C34 85.8333 47.1 87.3 91.5 90.5C67.5 74.9 61.8333 38.3333 62 22C43.6 39.6 35 71.6667 33 85.5Z"
        fill="black"
        stroke="black"
      />
    </svg>
  ),
  logo: ({ ...props }: LucideProps) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M120 28.5938C120 11.25 108.75 0 91.4062 0H28.5938C11.25 0 0 11.25 0 28.5938V91.4062C0 108.75 11.25 120 28.5938 120H91.4062C108.75 120 120 108.75 120 91.4062V28.5938ZM33 85.5C34 85.8333 47.1 87.3 91.5 90.5C67.5 74.9 61.8333 38.3333 62 22C43.6 39.6 35 71.6667 33 85.5ZM102 92.5C86.6667 92.5 48.4 91.5 18 87.5C18 90.3 22.6667 95.3333 25 97.5H98.5L102 92.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  close: X,
  grip: GripVertical,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  help: HelpCircle,
  pizza: Pizza,
  chainlink: Link,
  external: ExternalLink,
  bars: BarChart,
  share: Share,
  share2: Share2,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  check: Check,

  // Socials
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
  youtube: Youtube,
  twitch: Twitch,
  dribbble: Dribbble,
}
