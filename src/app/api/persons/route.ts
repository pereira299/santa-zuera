import { NextRequest, NextResponse } from "next/server";
import contentful from "@/services/contentful";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const page = Number(search.get("page") || 1);
  const qtd = Number(search.get("qtd") || 20);
  const searchQuery = search.get("search");

  const data: {
    content_type: string;
    select: string[];
    limit: number;
    skip: number;
    "fields.name[match]"?: string;
  } = {
    content_type: "person",
    select: ["fields.name", "fields.photoUrl", "fields.instagramUrl", "sys.id"],
    limit: qtd,
    skip: (page - 1) * qtd,
  };

  if (searchQuery) {
    data["fields.name[match]"] = searchQuery;
  }
  const res = await contentful.getEntries(data);

  const persons = res.items.map((c) => ({
    id: c.sys.id,
    name: c.fields.name,
    photoUrl:
      c.fields.photoUrl ||
      `https://avatar.iran.liara.run/username?username=${(c.fields.name as string).trim()
        .split(" ")[0]}`,
    instagramUrl: c.fields.instagramUrl,
  }));

  return NextResponse.json({
    items: persons,
    total: res.total,
    skip: res.skip,
    limit: res.limit,
  });
}