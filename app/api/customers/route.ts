import { NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    try {
        let sql = 'SELECT * FROM customers';
        const params: any[] = [];

        if (search) {
            sql += ' WHERE name ILIKE $1 OR email ILIKE $1';
            params.push(`%${search}%`);
        }
        
        sql += ' ORDER BY created_at DESC';

        const { rows } = await query(sql, params);
        
        const formattedCustomers = rows.map(row => ({
            ...row,
            spend: parseFloat(row.spend)
        }));

        return NextResponse.json(formattedCustomers);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email } = body;
        
        const sql = `
            INSERT INTO customers (name, email) 
            VALUES ($1, $2) 
            RETURNING *
        `;
        const { rows } = await query(sql, [name, email]);
        
        const newCustomer = {
            ...rows[0],
            spend: parseFloat(rows[0].spend)
        };
        
        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error: any) {
        console.error('Database error:', error);
        if (error.code === '23505') { // unique violation
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }
}
