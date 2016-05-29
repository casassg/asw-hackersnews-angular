import { User } from '../user/user';

export class Contribution {
  id: number;
  title: string;
  user: User;
  canVote: boolean;
  contr_subtype: string;
  content: string;
  user_id: number;
  url: string;
  parent_id: number;
  upvote: number;
  created_at: string;
  updated_at: string;
  comments: Contribution[];
}