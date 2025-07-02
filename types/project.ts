export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  status: string | null
  start_date: string | null
  end_date: string | null
  created_at: string
}
