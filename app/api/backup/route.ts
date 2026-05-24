import { NextResponse } from 'next/server';
import { addBackupEntry } from '@/lib/backup';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { entityType, action, entityName, dataBefore, dataAfter } = body;
        
        const entry = addBackupEntry(entityType, action, entityName, dataBefore, dataAfter);
        return NextResponse.json(entry, { status: 201 });
    } catch (error) {
        console.error('Backup log error:', error);
        return NextResponse.json({ error: 'Failed to log backup' }, { status: 500 });
    }
}
