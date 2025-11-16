export interface Icons {}

export const icons = {
  alertCircle: import('~base/icons/AlertCircleIcon.vue'),
  annotationCheck: import('~base/icons/AnnotationCheckIcon.vue'),
  arrowDown: import('~base/icons/ArrowDownIcon.vue'),
  arrowLeft: import('~base/icons/ArrowLeftIcon.vue'),
  arrowRight: import('~base/icons/ArrowRightIcon.vue'),
  arrowUp: import('~base/icons/ArrowUpIcon.vue'),
  arrowUpDown: import('~base/icons/ArrowUpDownIcon.vue'),
  bim: import('~base/icons/BimIcon.vue'),
  brush: import('~base/icons/BrushIcon.vue'),
  calendar: import('~base/icons/CalendarIcon.vue'),
  cart: import('~base/icons/CartIcon.vue'),
  checkmark: import('~base/icons/CheckmarkIcon.vue'),
  checkmarkCircle: import('~base/icons/CheckmarkCircleIcon.vue'),
  chevronDown: import('~base/icons/ChevronDownIcon.vue'),
  chevronLeft: import('~base/icons/ChevronLeftIcon.vue'),
  chevronRight: import('~base/icons/ChevronRightIcon.vue'),
  chevronUp: import('~base/icons/ChevronUpIcon.vue'),
  close: import('~base/icons/CloseIcon.vue'),
  download: import('~base/icons/DownloadIcon.vue'),
  downloadFolder: import('~base/icons/DownloadFolderIcon.vue'),
  eye: import('~base/icons/EyeIcon.vue'),
  eyeSlash: import('~base/icons/EyeSlashIcon.vue'),
  facebook: import('~base/icons/FacebookIcon.vue'),
  filterLines: import('~base/icons/FilterLinesIcon.vue'),
  heart: import('~base/icons/HeartIcon.vue'),

  heartFilled: import('~base/icons/HeartFilledIcon.vue'),
  image: import('~base/icons/ImageIcon.vue'),
  instagram: import('~base/icons/InstagramIcon.vue'),
  lightSchema: import('~base/icons/LightSchemaIcon.vue'),
  linkedIn: import('~base/icons/LinkedInIcon.vue'),
  manual: import('~base/icons/ManualIcon.vue'),
  menu: import('~base/icons/MenuIcon.vue'),
  minus: import('~base/icons/MinusIcon.vue'),
  pintrest: import('~base/icons/PintrestIcon.vue'),
  plus: import('~base/icons/PlusIcon.vue'),
  profile: import('~base/icons/ProfileIcon.vue'),
  search: import('~base/icons/SearchIcon.vue'),
  techSpecs: import('~base/icons/TechSpecsIcon.vue'),
  tiktok: import('~base/icons/TiktokIcon.vue'),
  trash: import('~base/icons/TrashIcon.vue'),
  twitter: import('~base/icons/TwitterIcon.vue'),
  warning: import('~base/icons/WarningIcon.vue'),
  youtube: import('~base/icons/YoutubeIcon.vue'),
} satisfies Record<string, Component>

type CustomIcons = {
  [K in keyof typeof icons]: Component
}

declare module '@wisemen/vue-core-components' {
  interface Icons extends CustomIcons {}
}
