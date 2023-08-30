export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]


  export interface Database {
    public: {
      Tables: {
        Comments: {
          Row: {
            comment: string | null
            created_at: string
            draftid: number | null
            endOffset: number | null
            endXpath: string | null
            id: number
            selectedText: string | null
            startOffset: number | null
            startXpath: string | null
            usericon: string | null
            userid: number | null
            username: string | null
          }
          Insert: {
            comment?: string | null
            created_at?: string
            draftid?: number | null
            endOffset?: number | null
            endXpath?: string | null
            id?: number
            selectedText?: string | null
            startOffset?: number | null
            startXpath?: string | null
            usericon?: string | null
            userid?: number | null
            username?: string | null
          }
          Update: {
            comment?: string | null
            created_at?: string
            draftid?: number | null
            endOffset?: number | null
            endXpath?: string | null
            id?: number
            selectedText?: string | null
            startOffset?: number | null
            startXpath?: string | null
            usericon?: string | null
            userid?: number | null
            username?: string | null
          }
          Relationships: [
            {
              foreignKeyName: 'Comments_draftid_fkey'
              columns: ['draftid']
              referencedRelation: 'Drafts'
              referencedColumns: ['id']
            },
            {
              foreignKeyName: 'Comments_userid_fkey'
              columns: ['userid']
              referencedRelation: 'Users'
              referencedColumns: ['id']
            }
          ]
        }
        Drafts: {
          Row: {
            content: string | null
            created_at: string
            id: number
            textContent: string | null
            title: string | null
            user: number | null
          }
          Insert: {
            content?: string | null
            created_at?: string
            id?: number
            textContent?: string | null
            title?: string | null
            user?: number | null
          }
          Update: {
            content?: string | null
            created_at?: string
            id?: number
            textContent?: string | null
            title?: string | null
            user?: number | null
          }
          Relationships: [
            {
              foreignKeyName: 'Drafts_user_fkey'
              columns: ['user']
              referencedRelation: 'Users'
              referencedColumns: ['id']
            }
          ]
        }
        Users: {
          Row: {
            created_at: string
            Icon: string | null
            id: number
            Name: string | null
          }
          Insert: {
            created_at?: string
            Icon?: string | null
            id?: number
            Name?: string | null
          }
          Update: {
            created_at?: string
            Icon?: string | null
            id?: number
            Name?: string | null
          }
          Relationships: []
        }
      }
      Views: {
        [_ in never]: never
      }
      Functions: {
        [_ in never]: never
      }
      Enums: {
        [_ in never]: never
      }
      CompositeTypes: {
        [_ in never]: never
      }
    }
  }

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];