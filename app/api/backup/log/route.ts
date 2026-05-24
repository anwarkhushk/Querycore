import { NextResponse } from 'next/server';
import { getBackupLog } from '@/lib/backup';

export async function GET() {
    try {
        const logs = getBackupLog();
        // Return logs sorted by timestamp descending (newest first)
        const sortedLogs = logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return NextResponse.json(sortedLogs);
    } catch (error) {
        console.error('Failed to fetch backup logs:', error);
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}
