export interface WooCommerceOrder {
  id: number
  parent_id: number
  number: string
  order_key: string
  created_via: string
  version: string
  status: WooCommerceOrderStatus
  currency: string
  date_created: string
  date_created_gmt: string
  date_modified: string
  date_modified_gmt: string
  discount_total: string
  discount_tax: string
  shipping_total: string
  shipping_tax: string
  cart_tax: string
  total: string
  total_tax: string
  prices_include_tax: boolean
  customer_id: number
  customer_ip_address: string
  customer_user_agent: string
  customer_note: string
  billing: Partial<WooCommerceBilling>
  shipping: WooCommerceShipping
  payment_method: string
  payment_method_title: string
  transaction_id: string
  date_paid: string
  date_paid_gmt: string
  date_completed: string
  date_completed_gmt: string
  cart_hash: string
  meta_data: Partial<WooCommerceMetaData>[]
  line_items: Partial<WooCommerceLineItem>[]
  tax_lines: Partial<WooCommerceTaxLine>[]
  shipping_lines: Partial<WooCommerceShippingLine>[]
  fee_lines: Partial<WooCommerceFeeLine>[]
  coupon_lines: Partial<WooCommerceCouponLine>[]
  refunds: Partial<WooCommerceRefund>[]
  set_paid: boolean
}

export enum WooCommerceOrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  ON_HOLD = 'on-hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  FAILED = 'failed',
  TRASH = 'trash',
  ANY = 'any'
}

export interface WooCommerceLineItem {
  id: number
  name: string
  product_id: number
  variation_id: number
  quantity: number
  tax_class: string
  subtotal: string
  subtotal_tax: string
  total: string
  total_tax: string
  taxes: WooCommerceTaxLine[]
  meta_data: WooCommerceMetaData
  sku: string
  price: number
}

export interface WooCommerceShippingLine {
  id: number
  method_title: string
  method_id: string
  total: string
  total_tax: string
  taxes: WooCommerceTaxLine[]
  meta_data: WooCommerceMetaData
}

export type WooCommerceShipping = {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
}

export type WooCommerceTaxLine = {
  id: number
  rate_code: string
  rate_id: number
  label: string
  compound: boolean
  tax_total: string
  shipping_tax_total: string
  meta_data: Partial<WooCommerceMetaData>
}

export type WooCommerceFeeLine = {
  id: number
  name: string
  tax_class: string
  tax_status: string
  total: string
  total_tax: string
  taxes: Partial<WooCommerceTax>[]
  meta_data: Partial<WooCommerceMetaData>
}

export type WooCommerceCouponLine = {
  id: number
  code: string
  discount: string
  discount_tax: string
  meta_data: Partial<WooCommerceMetaData>
}

export type WooCommerceRefund = {
  id: number
  reason: string
  total: string
}

export type WooCommerceMetaData = {
  id: number
  key: string
  value: string
}

export type WooCommerceTax = {
  id: number
  country: string
  state: string
  postcode: string
  city: string
  postcodes: string[]
  cities: string[]
  rate: string
  name: string
  priority: number
  compound: boolean
  shipping: boolean
  order: number
  class: string
}

export type WooCommerceBilling = {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email: string
  phone: string
}
