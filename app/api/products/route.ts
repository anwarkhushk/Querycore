import { NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    try {
        let sql = 'SELECT * FROM products';
        const params: any[] = [];

        if (search) {
            sql += ' WHERE name ILIKE $1 OR sku ILIKE $1';
            params.push(`%${search}%`);
        }
        
        sql += ' ORDER BY created_at DESC';

        const { rows } = await query(sql, params);
        
        const formattedProducts = rows.map(row => ({
            ...row,
            price: parseFloat(row.price)
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sku, name, price, stock } = body;
        
        const sql = `
            INSERT INTO products (sku, name, price, stock) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        const { rows } = await query(sql, [sku, name, parseFloat(price), parseInt(stock)]);
        
        const newProduct = {
            ...rows[0],
            price: parseFloat(rows[0].price)
        };
        
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        console.error('Database error:', error);
        if (error.code === '23505') { // unique violation
            return NextResponse.json({ error: 'SKU already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
