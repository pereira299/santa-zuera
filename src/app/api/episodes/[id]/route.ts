import contentful from "@/services/contentful";
import { Entry } from "contentful";
import { NextRequest, NextResponse } from "next/server";

interface RichText {
  nodeType: string;
  content: Array<{
    nodeType: string;
    content: Array<{
      nodeType: string;
      value: string;
    }>;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const res = await contentful.getEntries({
    content_type: "episode",
    "fields.countNumber": id,
  });

  if (res.items.length === 0)
    return NextResponse.json({ message: "Episode not found" }, { status: 404 });

  const categories = (res.items[0].fields.categories as Array<Entry>)?.map(
    (c) => ({
      id: c.sys.id,
      name: c.fields.name,
    })
  );

  const participantes = (
    res.items[0].fields.participantes as Array<Entry>
  )?.map((p) => ({
    id: p.sys.id,
    name: p.fields.name,
  }));

  const description = (res.items[0].fields.description as RichText)?.content[0]
    .content[0].value;

  return NextResponse.json({
    ...res.items[0].fields,
    id: res.items[0].sys.id,
    categories,
    participantes,
    description,
  });
}
