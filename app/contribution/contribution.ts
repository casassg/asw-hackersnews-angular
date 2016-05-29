export class Contribution {
  title: string;
  contr_subtype: string;
  content: string;
  user_id: integer;
  url: string;
  parent_id: integer;
  upvote: integer;
  created_at: string;
  updated_at: string;
  comments: Contribution[];
}