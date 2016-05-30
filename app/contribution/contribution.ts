import { User } from '../user/user';

export class Contribution {
  id: number;
  title: string;
  user: User;
  canVote: boolean;
  contr_type: string;
  contr_subtype: string;
  content: string;
  user_id: any;
  user_name:string;
  url: string;
  parent_id: number;
  parent_name: string;
  upvote: number;
  created_at: string;
  updated_at: string;
  comments: Contribution[];
}
