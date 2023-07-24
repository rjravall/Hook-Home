import {
  CopyRightIcon,
  FAQIcon,
  HeadphoneIcon,
  ReportIcon,
  ShareIcon,
  StarIcon,
  LogoutIcon,
} from '@/assets';
export const en = {
  common: {
    loading: 'Loading',
    connectionError: 'Connection error',
    email: 'Email',
    password: 'Password',
    cnf_password: 'Confirm Password',
    forgot_password: 'Forgot Password?',
    google: 'Google',
    apple: 'Apple',
    account_conformation: "If you don't have an account?",
    or_txt: 'OR',
    next_button: 'Next',
  },

  landing: {
    login: 'LOGIN',
    logout: 'SIGNUP',
  },

  login: {
    title: 'Login',
    subtitle: 'Login your account and continue with us',

    button: 'Login',
    password: 'Password',
    passwordHint: 'Enter your password',
    invalidCredentials: 'Invalid credentials',
  },
  signup: {
    title: 'Signup',
    subtitle: 'Signup your account and continue with us',
  },
  information_screen: {
    button: 'Next',
    skip: 'skip',
  },
  personal_information_signup: {
    title: 'Personal information',
    first_name: 'First Name',
    last_name: 'Last Name',
    Preferred_name: 'Preferred Name (Optional)',
    date_of_birth: 'Date of Birth',
    height: 'Height',
    weight: 'Weight',
  },
  select_dating_mode: {
    title: 'Choose a mode to get started?',
  },
  set_your_location: {
    title: 'Set your location',
    subtitle:
      'We use your location to show you potential matches in your area.',
    button: 'Set location',
    placeholder: 'location',
    edit_location: 'Serch Location...',
    skip: 'skip',
  },
  homescreen_dating: {
    title: 'Choose dating mode',
  },
  detail_screen: {
    basic_info: 'Basic Info',
    additional_info: 'Additional Info',
    spicy: 'Spicy',

    about_me: 'About Me',
    private_album: 'Private Album',
    away: 'Away',
    social_media_link: 'Social Media Links',
    gaming_account: 'Gaming accounts',
    unmatch: 'Unmatch',
    report: 'Report',
  },
  homescreen_container: {
    search: 'Search',
    away: 'Away',
    Ftile: 'Tile',
    grid: 'Grid',
    card: 'Card',
  },
  job_work_screen: {
    job_title: 'What is your job title?',
    profile_visibilty: 'visible on Profile',
    jobtitle_placeholder: 'Ex. Product Manager',
    workplace_title: 'Where do you work?',
    workplace_placeholder: 'Company name',
    study_title: 'Where do you study?',
    study_placeholder: 'College or school name',
  },
  add_photos: {
    title: 'Add Photos',
    subtitle: 'Add at least 2 photos to continue',
  },
  email_verification: {
    title: 'Email verification',
    subtitle: 'Enter 6 digit OTP to verify your Email',
    resend_code_text: 'Resend code in ',
    button: 'Verify',
    sendotp: 'Resend OTP'
  },
  data_filter_Screen: {
    title: 'Data Filter',
    maximum_distance: 'Maximum distance',
    miter: 'mi',
    age_range: 'Age range',
    has_photo: 'Has Photo?',
    photo_verified: 'Photo Verified',
    intrest: 'Interest',
    apply: 'Apply',
    clear: 'Clear',
    search: 'Search',
  },
  delete_slider: {
    title: 'Would you like to \n access your photos',
    subtitle: 'Allow photo access to add',
    cancle_button_text: 'Cancle',
    delete_button_text: 'Delete Account',
  },
  chat_screen: {
    title: 'Matches',
    new_matches: 'New Matches',
    chat: 'Chats',
    inactive_chats: 'Inactive Chats',
  },
  explore_screen: {
    title: 'Explore',
    search: 'Search',
  },
  notification_screen: {
    title: 'Notification',
  },
  profile_screen: {
    person_name: 'Eric Gomez',
    profile_compeleted: '80% completed',
    ProfileOptions: [
      { key: 'Feedback & Support', icon: HeadphoneIcon },
      { key: 'Share the app', icon: ShareIcon },
      { key: 'FAQS', icon: FAQIcon },
      { key: 'Rate the app', icon: StarIcon },
      { key: 'Report App', icon: ReportIcon },
      { key: 'App Version and copyright', icon: CopyRightIcon },
      { key: 'Logout', icon: LogoutIcon },
    ],
  },
  rating_slider: {
    title: 'How do you rate our app',
    subtitle: 'Tap the number of stars to rate it on it the App Store',
    not_now: ' Not Now',
  },
  faq_screen: {
    title: 'FAQS',
    FAQData: [
      {
        title: 'Signing Up and Getting Started',
        options: [
          { name: 'Create a Tinder Account', link: 'https://google.com' },
          { name: 'How do I edit my profile?' },
          { name: 'How to disable an ad blocker' },
          { name: 'How do I change my language settings on Tinder?' },
          { name: 'What happens if I’ve been age-restricted on Tinder? ' },
        ],
      },
      {
        title: 'Matching and Messaging',
        options: [
          { name: 'Messaging a Match' },
          { name: 'Can I delete a message?' },
          { name: 'Unmatching and reporting' },
          { name: 'I accidentally unmatched someone' },
        ],
      },
      {
        title: 'Profile and Account Settings',
        options: [
          { name: 'Editing your profile' },
          { name: 'Lifestyle' },
          { name: 'Interests' },
        ],
      },
    ],
  },
  report_Slider: {
    title: 'Report',
    report_options: [
      'This user sent me a suspicious link',
      'This user asked me for money',
      'These photos belong to someone else',
      'This user is advertising',
      'This user isn’t responding to me',
      'Other',
    ],
    button: 'Cancel',
  },
  report_screen: {
    title: 'Report',
    select_options_title: 'Please use this page to report a serious incident',
    placeholder_type: 'Report type',
    placeholder_msg: 'Message',
    search: 'Search',
    button: 'Send Message',
  },
  edit_profile_screen: {
    title: 'Edit Profile',
    my_photo_vid_title: 'My Photos & Videos',
    public_album: 'Public album',
    about_me: 'About Me',
    personal_info: 'Personal Info',
    preview_button: 'Preview',
    save_button: 'Save',
  },
  editinfo_screen: {
    title: 'Edit Info',
    profile_visibilty_text: 'Visible on Profile',
    button: 'Save',
  },
  setting_screen: {
    title: 'Setting',
    settingScreen_options: [
      {
        type: ['account_setting'],
        title: 'Account Setting',
        account_setting: [
          { title: 'Phone Number', value: '+91 84523 68965' },
          { title: 'Email', value: 'ericgomez@gmail.com' },
          { title: 'Change Password' },
          { title: 'Change Location' },
          { title: 'Disable Profile', switch_flag: true },
          { title: 'Blocked User' },
          { title: 'Delete Profile' },
        ],
      },
      {
        type: ['account_security'],
        title: 'Account Security',
        account_security: [
          { title: 'Pin', value: 'Not Set' },
          { title: 'Face ID value', value: 'Not Set' },
          { title: 'Two Factor Authentication', value: 'Not Set' },
        ],
      },
      {
        type: ['notifications_preferance'],
        title: 'Notifications preferance',
        notifications_preferance: [
          { title: 'Push Notification', switch_flag: true },
          { title: 'Sound Effect', switch_flag: true },
          { title: 'Vibrate', switch_flag: true },
          { title: 'Show Preview' },
        ],
      },
      {
        type: ['privacy'],
        title: 'Privacy',
        privacy: [
          { title: 'Download My Data' },
          { title: 'Privacy Policy' },
          { title: 'Terms of Use' },
        ],
      },
    ],
  },
  delete_account_slider: {
    title: 'Delete Account',
    subtitle:
      'Are you sure you want to delete your account? If you delete your account, you will permanently lose your profile, messages, and photos.',
    cancel_button: 'Cancel',
    delete_button: 'Delete Account',
  },
  change_password_screen: {
    title: 'Change Password',
    old_pw: 'Old Password',
    new_pw: 'New Password',
    confirm_pw: 'Confirm Password',
    button: 'Update',
  },
  blocked_user_screen: {
    title: 'Blocked User',
    search: 'Search',
    unblocked: 'Unblock',
  },
  create_pin_screen: {
    title: 'Create 4 digit pin',
    subtitle: 'You can use this pin to open HOOK app',
    button: 'Create',
  },
  face_id_setup_complete_screen: {
    title: 'Face ID is Set Up',
    subtitle:
      'Your face ID is successfully set up, you can use it for security',
    button_title: 'Done',
  },
  face_id_value_screen: {
    title: 'Enable face Id',
    subtitle: 'Scan you face to verify identity',
    button_title: 'Scan my face',
  },
  two_factor_screen: {
    title: 'Two-step verification',
    subtitle:
      'To make HOOK app secure, your chats and calls are autoatically end to end encrypted.',
    button_title: 'Enable',
  },
  two_step_verification: {
    title: 'Email 2 step verification',
    subtitle: 'Enter your email address to set \n 2 step verification',
    email: 'Email',
    button: 'Send',
  },
  two_step_verification_complete_screen: {
    title: '2 Step verification',
    subtitle:
      'Your 2 step email verification is successfully set up \n you can use it for security',
    button_title: 'Done',
  },
  privacy_policy_screen: {
    title: 'Privacy Policy',
    welcome_text:
      'Welcome to the Hook Privacy Policy (“Policy”)! This explains how we collect, store, protect, and share your information, and with whom we share it. We suggest you read this in conjunction with our',
    highlight_text: ' Terms and Conditions of Use.',
    whilst_text:
      'Whilst you’re enjoying the Hook mobile application (including the desktop version) (“App”), our websites and microsites (such as Hook.com) or using our digital products and services (such as our competitions or surveys) (together, referred to in this Privacy Policy as our “Sites”), we collect some information about you. In addition, you may choose to use the App or Sites to share information with other users, including your friends and contacts (“Users”). We may also need to share your information sometimes. \n\n The App and Sites are global, and your information will be sent to and used in the United States and the UK regardless of the country you reside in. This Policy explains how we protect your personal data when we transfer it overseas, so please read very carefully!',

    filter: 'Data Filter',
    filter_data:
      'The App and Sites are operated by the “Hook Group” (also referred to in this policy as “we” or “us”) which includes Hook Holding Limited, Badoo Trading Limited and Hook Trading LLC, all of which are controllers of personal information collected and processed through the Hook App and Sites. \n\n The Hook Group has designated a Data Protection Officer and they can be reached by emailing DPO@team.Hook.com or by post at the following address: The Broadgate Tower Third Floor, 20 Primrose Street, London, United Kingdom, EC2A 2RS.',
  },
  tems_condtion_screen: {
    title: 'Terms & Conditions',
    welcome_text:
      'Welcome to Bumble’s Terms and Conditions of Use (these “Terms”). This is a contract between you and the Bumble Group (as defined further below) and we want you to know yours and our rights before you use the Bumble website or application (“Bumble” or the “App”). Please take a few moments to read these Terms before enjoying the App, because once you access, view or use the App, you are going to be legally bound by these Terms (so probably best to read them first!). \n\n Please be aware that if you subscribe to services for a term (the “Initial Term”), then the terms of your subscription will be automatically renewed for additional periods of the same duration as the Initial Term at Bumble’s then-current fee for such services, unless you cancel your subscription in accordance with Section 5 below.',
    hook_rule: '1. Hook rules',
    hook_rule_text:
      'Before you can use the App, you will need to register for an account (“Account”). In order to create an Account you must: \n\n1. be at least 18 years old or the age of majority to legally enter into a contract under the laws of your home country; and \n2. be legally permitted to use the App by the laws of your home country. \n\nYou can create an Account via manual registration, or by using your Facebook login details. If you create an Account using your Facebook login details, you authorise us to access, display and use certain information from your Facebook account (e.g. profile pictures, relationship status, location and information about Facebook friends). For more information about what information we use and how we use it, please check out our Privacy Policy.',
  },
  notification_item: {
    like: 'likes you!',
    nudge: 'Nudged you!',
    match: 'matched with you! ',
  },
  toast_success_message: {
    enter_email: "Please enter email address",
    enter_valid_email: "Please enter valid email address",
    enter_password: "Please enter password address",
    enter_valid_password: "Please enter valid password address",
    enter_eight_digit: "Please enter 8 digit code",
    enter_confirmPassword: "Please enter confirm password address",
    enter_passwordmishmatch: "Password and ConfirmPassword mismatch",
    enter_six_digit_code: "Please enter 8 digit code",
    enter_fName: "Please enter firstname",
    enter_LName: "Please enter lastname",
    enter_dob: "Please enter DOB",
    enter_height: "Please enter height",
    enter_weight: "Please enter weight",
    select_modes: "Please select modes",
    select_photo: "Please select at list 2 photo",

  },
  prefrenceData: {
    fName: "fName",
    lName: "lName",
    prefreName: "prefreName",
    DOB: "DOB",
    height: "height",
    weight: "weight",
    token: "token",
    userEmail: "userEmail",
    userPassword: "userPassword"

  }
};
