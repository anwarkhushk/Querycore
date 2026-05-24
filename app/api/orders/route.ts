import { NextResponse } from 'next/server';
import { query, getClient } from '@/lib/postgres';

export async function GET() {
    try {
        const sql = `
            SELECT o.*, 
                   COALESCE(
                       json_agg(
                           json_build_object('productName', oi.product_name, 'quantity', oi.quantity, 'price', oi.price)
                       ) FILTER (WHERE oi.id IS NOT NULL), '[]'
                   ) as items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `;
        const { rows } = await query(sql);
        
        // Map DB keys to match the expected frontend structure
        const formattedOrders = rows.map(row => ({
            ...row,
            customerName: row.customer_name,
            total: parseFloat(row.total)
        }));

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const client = await getClient();
    try {
        await client.query('BEGIN');
        
        const body = await request.json();
        const { customerName, total, items } = body;
        
        // 1. Insert Order
        const orderSql = `
            INSERT INTO orders (customer_name, total, status) 
            VALUES ($1, $2, 'Processing') 
            RETURNING *
        `;
        const orderRes = await client.query(orderSql, [customerName, total]);
        const newOrder = orderRes.rows[0];

        // 2. Insert Order Items
        if (items && items.length > 0) {
            const itemSql = `
                INSERT INTO order_items (order_id, product_name, quantity, price) 
                VALUES ($1, $2, $3, $4)
            `;
            for (const item of items) {
                await client.query(itemSql, [newOrder.id, item.productName, item.quantity, item.price]);
            }
        }
        
        await client.query('COMMIT');
        
        return NextResponse.json({
            ...newOrder,
            customerName: newOrder.customer_name,
            items: items || []
        }, { status: 201 });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction error:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    } finally {
        client.release();
    }
}
