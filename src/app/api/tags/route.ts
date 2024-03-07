import { requireAuth } from '@/lib/authActions';
import { postTag } from '@/models/tagModel';
import { MediaItemTag } from '@sharedTypes/DBTypes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  requireAuth();

  try {
    const tagData = (await request.json()) as {
      media_id: number;
      tag_name: string;
    };

    if (!tagData.media_id || !tagData.tag_name) {
      return new NextResponse('Media ID and Tag ID are required', {
        status: 400,
      });
    }

    const postResult = await postTag(tagData.tag_name, tagData.media_id);

    if (!postResult) {
      return new NextResponse('Error adding tag to database', { status: 500 });
    }

    return new NextResponse(JSON.stringify(postResult), { status: 200 });
  } catch (error) {}
}
