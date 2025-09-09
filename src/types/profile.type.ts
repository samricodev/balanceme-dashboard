interface Profile {
  id: string;
  name: string;
  email: string;
  password: string;
  enable2FA: boolean;
  enableNotifications: boolean;
  automaticLimits: boolean;
}

export type {
  Profile
}