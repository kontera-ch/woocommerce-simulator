import { config as dotEnvConfig } from 'dotenv'
import express from 'express'

import { Request, Response } from 'express'
import { WooCommerceOrder, WooCommerceOrderStatus, WooCommerceTax } from './models/WooCommerceOrder';

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

dotEnvConfig()

;(async () => {
  const app = express()

  app.use(express.json())

  app.get('/wp-json/wc/v3/taxes/:taxId', async (req: Request, res: Response) => {
    const taxId = Number(req.params.taxId)
    const foundTax = wooCommerceTaxes.find(tax => tax.id === taxId)

    if (foundTax) {
      return res.status(200).send(foundTax)
    }

    res.sendStatus(404)
  })

  app.get('/wp-json/wc/v3/orders', async (req: Request, res: Response) => {
    const page = Number(req.query.page)
    const per_page = Number(req.query.per_page)
    const include = req.query.include
    const status = String(req.query.status)

    res.header('x-wp-total', String(wooCommerceOrders.length))
    res.header('x-wp-totalpages', String(Math.round(wooCommerceOrders.length / per_page)))

    if (include && typeof include === 'string') {
      return res.status(200).send(wooCommerceOrders.filter(order => order.order_key === String(include)))
    }

    const skip = (page - 1) * per_page
    const until = page * per_page

    const filteredOrders = wooCommerceOrders.filter(order => order.status === status).slice(skip, until)

    res.status(200).send(filteredOrders)
  })

  app.get('/wp-json/wc/v3/orders/:orderId', async (req: Request, res: Response) => {
    const orderId = Number(req.params.orderId)

    const foundOrder = wooCommerceOrders.find(order => order.id === orderId)

    if (!foundOrder) {
      return res.sendStatus(404)
    }

    res.status(200).send(foundOrder)
  })

  app.listen(process.env.port || 4344)

  console.log(`started woocommerce-simulator on :4344`)
})()

const wooCommerceOrders: DeepPartial<WooCommerceOrder>[] = [
  {
    id: 10124,
    billing: {
      first_name: 'Peter',
      last_name: 'Test',
      email: 'pt@kontera.ch'
    },
    status: WooCommerceOrderStatus.COMPLETED,
    prices_include_tax: true,
    discount_total: '0',
    currency: 'CHF',
    date_created_gmt: '2023-01-01T07:00:00+00:00',
    payment_method: 'woocommerce_credit_card',
    payment_method_title: 'Kreditkarte',
    order_key: 'order-1',
    tax_lines: [
      {
        rate_id: 1
      }
    ],
    shipping_lines: [
      {
        method_title: 'Versand via A-Post',
        total: '7.90',
        total_tax: '0.60',
        taxes: [
          {
            id: 1
          }
        ]
      }
    ],
    line_items: [
      {
        name: 'Katzenspielzeug Federflausch',
        total: '18.37',
        total_tax: '1.53',
        taxes: [
          {
            id: 1
          }
        ]
      },
      {
        name: 'Katzenspielzeug Federflausch',
        total: '18.37',
        total_tax: '1.53',
        taxes: [
          {
            id: 1
          }
        ]
      },
      {
        name: 'Katzenspielzeug Federflausch',
        total: '18.37',
        total_tax: '1.53',
        taxes: [
          {
            id: 1
          }
        ]
      }
    ]
  },
  {
    id: 10125,
    billing: {
      first_name: 'Peter',
      last_name: 'Test',
      email: 'pt@kontera.ch'
    },
    status: WooCommerceOrderStatus.COMPLETED,
    prices_include_tax: true,
    discount_total: '0',
    currency: 'CHF',
    date_created_gmt: '2023-01-01T07:00:00+00:00',
    payment_method: 'woocommerce_credit_card',
    payment_method_title: 'Kreditkarte',
    order_key: 'order-1',
    tax_lines: [
      {
        rate_id: 1
      }
    ],
    shipping_lines: [
      {
        method_title: 'Versand via A-Post',
        total: '7.90',
        total_tax: '0.60',
        taxes: [
          {
            id: 1
          }
        ]
      }
    ],
    line_items: [
      {
        name: 'Katzenspielzeug Federflausch',
        total: '18.37',
        total_tax: '1.53',
        taxes: [
          {
            id: 1
          }
        ]
      }
    ]
  },
  {
    id: 10126,
    billing: {
      first_name: 'Peter',
      last_name: 'Test',
      email: 'pt@kontera.ch'
    },
    status: WooCommerceOrderStatus.COMPLETED,
    prices_include_tax: true,
    discount_total: '0',
    currency: 'CHF',
    date_created_gmt: '2023-01-01T07:00:00+00:00',
    payment_method: 'woocommerce_credit_card',
    payment_method_title: 'Kreditkarte',
    order_key: 'order-1',
    tax_lines: [
      {
        rate_id: 1
      }
    ],
    shipping_lines: [],
    line_items: [
      {
        name: 'Büsiblitz',
        total: '36',
        total_tax: '3',
        taxes: [
          {
            id: 1
          }
        ]
      }
    ]
  },
  {
    id: 10127,
    billing: {
      first_name: 'Peter',
      last_name: 'Test',
      email: 'pt@kontera.ch'
    },
    status: WooCommerceOrderStatus.COMPLETED,
    prices_include_tax: true,
    discount_total: '0',
    currency: 'CHF',
    date_created_gmt: '2023-01-01T07:00:00+00:00',
    payment_method: 'woocommerce_credit_card',
    payment_method_title: 'Kreditkarte',
    order_key: 'order-1',
    tax_lines: [
      {
        rate_id: 1
      }
    ],
    shipping_lines: [],
    line_items: [
      {
        name: 'Büsiblitz Sonderedition Schnurrli',
        total: '36',
        total_tax: '3',
        taxes: [
          {
            id: 1
          }
        ]
      }
    ]
  }
]

const wooCommerceTaxes: DeepPartial<WooCommerceTax>[] = [
  {
    id: 1,
    rate: '7.7'
  },
  {
    id: 2,
    rate: '2.5'
  }
]
