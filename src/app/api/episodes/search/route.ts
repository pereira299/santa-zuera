import { NextRequest, NextResponse } from "next/server";
import contentful from "@/services/contentful";
import { Entry } from "contentful";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const page = Number(search.get("page") || 1);
  const qtd = Number(search.get("qtd") || 20);
  const title = search.get("title");
  const categories = search.get("category[]");
  const participantes = search.get("person[]");
  const dateStart = search.get("dateStart");
  const dateEnd = search.get("dateEnd");

  const data: {
    content_type: string;
    select: string[];
    limit: number;
    skip: number;
    "fields.title[match]"?: string;
    "fields.categories.sys.id[in]"?: string;
    "fields.participantes.sys.id[in]"?: string;
    "fields.publishDate[gte]"?: string;
    "fields.publishDate[lte]"?: string;
    order?: string[];
  } = {
    content_type: "episode",
    select: [
      "fields.title",
      "fields.thumbnail",
      "fields.publishDate",
      "fields.categories",
      "fields.participantes",
      "fields.countNumber",
    ],
    limit: qtd,
    skip: (page - 1) * qtd,
    order: ["-fields.publishDate"],
    "fields.categories.sys.id[in]": categories || undefined,
    "fields.participantes.sys.id[in]": participantes || undefined,
    "fields.publishDate[gte]": dateStart || undefined,
    "fields.publishDate[lte]": dateEnd || undefined,
    "fields.title[match]": title || undefined,
  };

  const res = await contentful.getEntries(data);

  const sanitized = res.items.map((item) => {
    const categories = (item.fields.categories as Array<Entry>)?.map(
      (c) => ({
        id: c.sys.id,
        name: c.fields.name,
      })
    );
  
    const participantes = (
      item.fields.participantes as Array<Entry>
    )?.map((p) => ({
      id: p.sys.id,
      name: p.fields.name,
      photoUrl:
          p.fields.photoUrl ||
          `https://avatar.iran.liara.run/username?username=${
            (p.fields.name as string).trim().split(" ")[0]
          }`,
    }));

    return {
      ...item.fields,
      id: item.sys.id,
      categories,
      participantes,
    };
  });
  return NextResponse.json({
    total: Math.floor(res.total/ res.limit),
    page,
    items: sanitized,
  });
}
