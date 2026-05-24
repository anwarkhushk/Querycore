import { NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

export async function GET() {
    try {
        const revSql = 'SELECT SUM(total) as "totalRevenue" FROM orders WHERE status = \'Completed\'';
        const custSql = 'SELECT COUNT(id) as "totalCustomers" FROM customers';
        const ordersSql = 'SELECT COUNT(id) as "ordersThisMonth" FROM orders WHERE date >= date_trunc(\'month\', CURRENT_DATE)';

        const [revRes, custRes, ordersRes] = await Promise.all([
            query(revSql),
            query(custSql),
            query(ordersSql)
        ]);

        const totalRevenue = parseFloat(revRes.rows[0]?.totalRevenue) || 0;
        const totalCustomers = parseInt(custRes.rows[0]?.totalCustomers) || 0;
        const ordersThisMonth = parseInt(ordersRes.rows[0]?.ordersThisMonth) || 0;

        return NextResponse.json({
            totalRevenue,
            totalCustomers,
            ordersThisMonth,
            growth: {
                revenue: 12, // Keeping growth mock for now unless we do complex time-series queries
                customers: 8,
                orders: 24
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
