export const AVATARS = ['violet', 'pink', 'amber', 'teal', 'blue', 'lime'] as const;
export type Avatar = (typeof AVATARS)[number];

export interface Profile {
  id: string;
  name: string;
  avatar: Avatar;
  kids: boolean;
  myList: string[];
}

export type ProfileInput = Pick<Profile, 'name' | 'avatar' | 'kids'>;
