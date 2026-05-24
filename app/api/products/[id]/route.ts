import { NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { sku, name, price, stock } = body;

        const sql = `
            UPDATE products 
            SET sku = COALESCE($1, sku), 
                name = COALESCE($2, name), 
                price = COALESCE($3, price), 
                stock = COALESCE($4, stock)
            WHERE id = $5
            RETURNING *
        `;
        
        const priceParam = price ? parseFloat(price) : null;
        const stockParam = stock ? parseInt(stock) : null;

        const { rows } = await query(sql, [sku, name, priceParam, stockParam, id]);

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await query('DELETE FROM products WHERE id = $1', [id]);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
