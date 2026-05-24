import { NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, email, status, spend } = body;

        const sql = `
            UPDATE customers 
            SET name = COALESCE($1, name), 
                email = COALESCE($2, email), 
                status = COALESCE($3, status), 
                spend = COALESCE($4, spend)
            WHERE id = $5
            RETURNING *
        `;
        const { rows } = await query(sql, [name, email, status, spend, id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await query('DELETE FROM customers WHERE id = $1', [id]);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
    }
}
