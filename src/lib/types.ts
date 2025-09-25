export interface Database {
    public: {
        Tables: {
            companies: {
                Row: {
                    id: string
                    name: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    created_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    company_id: string
                    email: string
                    full_name: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    company_id: string
                    email: string
                    full_name?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    company_id?: string
                    email?: string
                    full_name?: string | null
                    created_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    company_id: string
                    name: string
                    product_code: string | null
                    description: string | null
                    intended_use: string
                    custom_fields: Record<string, any>
                    created_at: string
                }
                Insert: {
                    id?: string
                    company_id: string
                    name: string
                    product_code?: string | null
                    description?: string | null
                    intended_use: string
                    custom_fields?: Record<string, any>
                    created_at?: string
                }
                Update: {
                    id?: string
                    company_id?: string
                    name?: string
                    product_code?: string | null
                    description?: string | null
                    intended_use?: string
                    custom_fields?: Record<string, any>
                    created_at?: string
                }
            }
            company_field_configs: {
                Row: {
                    id: string
                    company_id: string
                    field_name: string
                    field_type: 'string' | 'number' | 'date'
                    is_required: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    company_id: string
                    field_name: string
                    field_type: 'string' | 'number' | 'date'
                    is_required?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    company_id?: string
                    field_name?: string
                    field_type?: 'string' | 'number' | 'date'
                    is_required?: boolean
                    created_at?: string
                }
            }
        }
    }
}

export type Company = Database['public']['Tables']['companies']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type FieldConfig = Database['public']['Tables']['company_field_configs']['Row']

export interface ProductWithCustomFields extends Omit<Product, 'custom_fields'> {
    custom_fields: Record<string, string | number | Date>
}
